import email
from bs4 import BeautifulSoup
import json
import re

def parse_cost(cost_str):
    if cost_str.lower() == 'passive':
        return 0, True

    # Remove $, commas and other non-digit characters except negative sign
    cost_clean = re.sub(r'[^\d-]', '', cost_str)
    if cost_clean:
        try:
            return int(cost_clean), False
        except:
            return 0, False
    return 0, False

def parse_stats(stats_str):
    # Extracts MAN, INT, END from strings like "1,500 MAN / 750 END"
    stats = {'MAN': 0, 'INT': 0, 'END': 0}
    if stats_str.lower() == 'none' or not stats_str:
        return stats

    parts = stats_str.split('/')
    for part in parts:
        part = part.strip()
        val_match = re.search(r'([\d,]+)\s*(MAN|INT|END)', part)
        if val_match:
            val_str = val_match.group(1).replace(',', '')
            stat_type = val_match.group(2)
            try:
                stats[stat_type] = int(val_str)
            except:
                pass
    return stats

def main():
    with open('Company_List_wiki.mhtml', 'r', encoding='utf-8') as f:
        msg = email.message_from_file(f)

    html_content = ''
    for part in msg.walk():
        if part.get_content_type() == 'text/html':
            html_content = part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8', errors='ignore')
            break

    if not html_content:
        print("Could not extract HTML content from mhtml file")
        return

    soup = BeautifulSoup(html_content, 'html.parser')

    # Mapping of company ID to name from company_data.js
    company_map = {
        1: "Hair Salon", 2: "Law Firm", 3: "Flower Shop", 4: "Car Dealership",
        5: "Clothing Store", 6: "Gun Shop", 7: "Game Shop", 8: "Candle Shop",
        9: "Toy Shop", 10: "Adult Novelties", 11: "Cyber Cafe", 12: "Grocery Store",
        13: "Theater", 14: "Sweet Shop", 15: "Cruise Line", 16: "Television Network",
        17: "Zoo", 18: "Amusement Park", 19: "Furniture Store", 20: "Gas Station",
        21: "Music Store", 22: "Nightclub", 23: "Pub", 24: "Restaurant",
        25: "Software Corporation", 26: "Mechanic Shop", 27: "Fitness Center",
        28: "Lingerie Store", 29: "Farm", 30: "Mining Corporation", 31: "Oil Rig",
        32: "Property Broker", 33: "Private Security Firm", 34: "Detective Agency",
        35: "Firework Stand", 36: "Tattoo Parlor", 37: "Meat Warehouse",
        38: "Logistics Management", 39: "Private Care Facility", 40: "Gents Strip Club"
    }

    # Reverse mapping: name to ID
    name_to_id = {v: k for k, v in company_map.items()}

    all_positions = {}
    all_specials = {}
    all_stock = {}
    all_upgrades = {}

    # Look for each company
    for company_name in company_map.values():

        # ID in wiki is usually the name with spaces replaced by underscores
        wiki_id = company_name.replace(' ', '_')
        element = soup.find(id=wiki_id)

        # Try finding partial match for special cases
        if not element:
            for h in soup.find_all(['h2', 'h3']):
                span = h.find('span', class_='mw-headline')
                if span and span.get('id'):
                    text = span.text.strip()
                    # Fuzzy match fallback
                    if (company_name == 'Tattoo Parlor' and 'Tattoo' in text) or \
                       (company_name == 'Private Care Facility' and 'Private' in text and 'Care' in text) or \
                       (company_name == 'Private Security Firm' and 'Security' in text):
                        element = span
                        break

        if not element:
            print(f"Warning: Could not find {company_name} in the document.")
            continue

        parent = element.parent
        current = parent.find_next_sibling()

        company_positions = []
        company_specials = []
        company_stock = []
        company_size_upgrades = []
        staff_room_upgrades = []

        while current and current.name not in ['h2', 'h3']:
            if current.name == 'table':
                headers = [th.text.strip() for th in current.find_all('th')]
                if not headers:
                    current = current.find_next_sibling()
                    continue

                table_type = headers[0]

                rows = current.find_all('tr')
                for row in rows[1:]:
                    cells = [td.text.strip().replace('\n', ' ') for td in row.find_all(['td', 'th'])]
                    if not cells or len(cells) == 0:
                        continue

                    # Skip sub-headers inside rows
                    if cells[0] in ['Stars', 'Rank', 'Name', 'Size']:
                        continue

                    if table_type == 'Job Specials' and len(cells) >= 4:
                        stars = cells[0]
                        name = cells[1]
                        cost_str = cells[2]
                        effect = cells[3]

                        cost_val, is_passive = parse_cost(cost_str)

                        try:
                            stars_val = int(stars)
                        except:
                            stars_val = 0

                        company_specials.append({
                            'stars': stars_val,
                            'name': name,
                            'cost': cost_val,
                            'is_passive': is_passive,
                            'effect': effect
                        })

                    elif table_type == 'Job Positions' and len(cells) >= 4:
                        rank = cells[0]
                        rec_stats_str = cells[1]
                        stat_gains_str = cells[2]
                        special = cells[3] if len(cells) >= 4 else "None"

                        rec_stats = parse_stats(rec_stats_str)
                        stat_gains = parse_stats(stat_gains_str)

                        company_positions.append({
                            'rank': rank,
                            'recommended_stats': rec_stats,
                            'stat_gains': stat_gains,
                            'special': special
                        })

                    elif table_type == 'Stock' and len(cells) >= 2:
                        name = cells[0]
                        cost_str = cells[1]

                        # Sometimes there is no RRP or it's in the next cell
                        rrp = 0
                        if len(cells) >= 3:
                            rrp_val, _ = parse_cost(cells[2])
                            rrp = rrp_val

                        # If Cost cell says "Cannot be ordered", parse_cost returns 0, which is fine
                        cost_val, _ = parse_cost(cost_str)
                        if 'Cannot be ordered' in cost_str:
                            cost_val = -1 # Special marker for not orderable

                        company_stock.append({
                            'name': name,
                            'cost': cost_val,
                            'rrp': rrp
                        })

                    elif table_type == 'Company Size Upgrades' and len(cells) >= 2:
                        size = cells[0]
                        cost_str = cells[1]

                        if size.lower() == 'total':
                            continue

                        cost_val, _ = parse_cost(cost_str)

                        company_size_upgrades.append({
                            'size': size,
                            'cost': cost_val
                        })

                    elif table_type == 'Staff Room Upgrades' and len(cells) >= 2:
                        size = cells[0]
                        cost_str = cells[1]

                        if size.lower() == 'total':
                            continue

                        cost_val, _ = parse_cost(cost_str)

                        staff_room_upgrades.append({
                            'size': size,
                            'cost': cost_val
                        })

            current = current.find_next_sibling()

        all_positions[company_name] = company_positions
        all_specials[company_name] = company_specials
        all_stock[company_name] = company_stock
        all_upgrades[company_name] = {
            'company_size': company_size_upgrades,
            'staff_room': staff_room_upgrades
        }

    # Write out the JS files
    with open('company_positions.js', 'w', encoding='utf-8') as f:
        f.write("const TORN_COMPANY_POSITIONS = ")
        json.dump(all_positions, f, indent=4)
        f.write(";\n")

    with open('company_specials.js', 'w', encoding='utf-8') as f:
        f.write("const TORN_COMPANY_SPECIALS = ")
        json.dump(all_specials, f, indent=4)
        f.write(";\n")

    with open('company_stock.js', 'w', encoding='utf-8') as f:
        f.write("const TORN_COMPANY_STOCK = ")
        json.dump(all_stock, f, indent=4)
        f.write(";\n")

    with open('company_upgrades.js', 'w', encoding='utf-8') as f:
        f.write("const TORN_COMPANY_UPGRADES = ")
        json.dump(all_upgrades, f, indent=4)
        f.write(";\n")

    print("Successfully generated data files!")

if __name__ == "__main__":
    main()
