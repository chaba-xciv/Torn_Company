const TORN_COMPANIES = {
    1: { name: "Hair Salon", icon: "fa-solid fa-scissors", theme: "pink" },
    2: { name: "Law Firm", icon: "fa-solid fa-scale-balanced", theme: "gray" },
    3: { name: "Flower Shop", icon: "fa-solid fa-seedling", theme: "mint" },
    4: { name: "Car Dealership", icon: "fa-solid fa-car", theme: "blue" },
    5: { name: "Clothing Store", icon: "fa-solid fa-shirt", theme: "indigo" },
    6: { name: "Gun Shop", icon: "fa-solid fa-gun", theme: "red" },
    7: { name: "Game Shop", icon: "fa-solid fa-gamepad", theme: "purple" },
    8: { name: "Candle Shop", icon: "fa-solid fa-fire", theme: "orange" },
    9: { name: "Toy Shop", icon: "fa-solid fa-robot", theme: "yellow" },
    10: { name: "Adult Novelties", icon: "fa-solid fa-heart", theme: "rose" },
    11: { name: "Cyber Cafe", icon: "fa-solid fa-computer", theme: "cyan" },
    12: { name: "Grocery Store", icon: "fa-solid fa-basket-shopping", theme: "emerald" },
    13: { name: "Theater", icon: "fa-solid fa-masks-theater", theme: "fuchsia" },
    14: { name: "Sweet Shop", icon: "fa-solid fa-candy-cane", theme: "pink" },
    15: { name: "Cruise Line", icon: "fa-solid fa-ship", theme: "sky" },
    16: { name: "Television Network", icon: "fa-solid fa-tv", theme: "slate" },
    17: { name: "Zoo", icon: "fa-solid fa-hippo", theme: "lime" },
    18: { name: "Amusement Park", icon: "fa-solid fa-roller-coaster", theme: "red" },
    19: { name: "Furniture Store", icon: "fa-solid fa-couch", theme: "amber" },
    20: { name: "Gas Station", icon: "fa-solid fa-gas-pump", theme: "zinc" },
    21: { name: "Music Store", icon: "fa-solid fa-music", theme: "violet" },
    22: { name: "Nightclub", icon: "fa-solid fa-martini-glass", theme: "fuchsia" },
    23: { name: "Pub", icon: "fa-solid fa-beer-mug-empty", theme: "amber" },
    24: { name: "Restaurant", icon: "fa-solid fa-utensils", theme: "orange" },
    25: { name: "Software Corporation", icon: "fa-solid fa-code", theme: "blue" },
    26: { name: "Mechanic Shop", icon: "fa-solid fa-wrench", theme: "stone" },
    27: { name: "Fitness Center", icon: "fa-solid fa-dumbbell", theme: "cyan" },
    28: { name: "Lingerie Store", icon: "fa-solid fa-person-dress", theme: "rose" },
    29: { name: "Farm", icon: "fa-solid fa-tractor", theme: "green" },
    30: { name: "Mining Corporation", icon: "fa-solid fa-pickaxe", theme: "stone" },
    31: { name: "Oil Rig", icon: "fa-solid fa-oil-well", theme: "neutral" },
    32: { name: "Property Broker", icon: "fa-solid fa-house", theme: "blue" },
    33: { name: "Security Firm", icon: "fa-solid fa-shield-halved", theme: "slate" },
    34: { name: "Detective Agency", icon: "fa-solid fa-magnifying-glass", theme: "gray" },
    35: { name: "Firework Stand", icon: "fa-solid fa-bomb", theme: "red" },
    36: { name: "Tattoo Parlor", icon: "fa-solid fa-pen-nib", theme: "zinc" },
    37: { name: "Meat Warehouse", icon: "fa-solid fa-drumstick-bite", theme: "red" },
    38: { name: "Logistics Management", icon: "fa-solid fa-truck-fast", theme: "blue" },
    39: { name: "Private Care Facility", icon: "fa-solid fa-user-nurse", theme: "teal" },
    40: { name: "Gents Strip Club", icon: "fa-solid fa-person", theme: "violet" }
};

// Fallback if company type is not found
const DEFAULT_COMPANY = {
    name: "Company",
    icon: "fa-solid fa-building",
    theme: "blue"
};

function getCompanyData(companyType) {
    return TORN_COMPANIES[companyType] || DEFAULT_COMPANY;
}
