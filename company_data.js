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

// Helper to get hex colors for Tailwind classes dynamically without precompiling
const thmColorMap = {
    'mint': { primary: '#1e8449', light: '#d5f5e3', dark: '#145a32' },
    'pink': { primary: '#db2777', light: '#fce7f3', dark: '#9d174d' },
    'gray': { primary: '#4b5563', light: '#f3f4f6', dark: '#1f2937' },
    'blue': { primary: '#2563eb', light: '#dbeafe', dark: '#1e3a8a' },
    'indigo': { primary: '#4f46e5', light: '#e0e7ff', dark: '#312e81' },
    'red': { primary: '#dc2626', light: '#fee2e2', dark: '#7f1d1d' },
    'purple': { primary: '#9333ea', light: '#f3e8ff', dark: '#581c87' },
    'orange': { primary: '#ea580c', light: '#ffedd5', dark: '#7c2d12' },
    'yellow': { primary: '#ca8a04', light: '#fef9c3', dark: '#713f12' },
    'rose': { primary: '#e11d48', light: '#ffe4e6', dark: '#881337' },
    'cyan': { primary: '#0891b2', light: '#cffafe', dark: '#164e63' },
    'emerald': { primary: '#059669', light: '#d1fae5', dark: '#064e3b' },
    'fuchsia': { primary: '#c026d3', light: '#fae8ff', dark: '#701a75' },
    'sky': { primary: '#0284c7', light: '#e0f2fe', dark: '#0c4a6e' },
    'slate': { primary: '#475569', light: '#f1f5f9', dark: '#0f172a' },
    'lime': { primary: '#65a30d', light: '#ecfccb', dark: '#3f6212' },
    'amber': { primary: '#d97706', light: '#fef3c7', dark: '#78350f' },
    'zinc': { primary: '#52525b', light: '#f4f4f5', dark: '#18181b' },
    'violet': { primary: '#7c3aed', light: '#ede9fe', dark: '#4c1d95' },
    'stone': { primary: '#57534e', light: '#f5f5f4', dark: '#1c1917' },
    'neutral': { primary: '#525252', light: '#f5f5f5', dark: '#171717' },
    'teal': { primary: '#0f766e', light: '#ccfbf1', dark: '#134e4a' },
    'green': { primary: '#16a34a', light: '#dcfce3', dark: '#14532d' }
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
