import { TORN_COMPANIES, thmColorMap, DEFAULT_COMPANY } from './_data/company_data.js';
import { TORN_COMPANY_POSITIONS } from './_data/company_positions.js';
import { TORN_COMPANY_SPECIALS } from './_data/company_specials.js';
import { TORN_COMPANY_STOCK } from './_data/company_stock.js';
import { TORN_COMPANY_UPGRADES } from './_data/company_upgrades.js';

export default function handler(req, res) {
    try {
        res.status(200).json({
            TORN_COMPANIES,
            thmColorMap,
            DEFAULT_COMPANY,
            TORN_COMPANY_POSITIONS,
            TORN_COMPANY_SPECIALS,
            TORN_COMPANY_STOCK,
            TORN_COMPANY_UPGRADES
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
