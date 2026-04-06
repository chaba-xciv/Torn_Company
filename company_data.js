const TORN_COMPANIES = {
    "Adult Novelties": { cost: 1750000, size: 4 },
    "Amusement Park": { cost: 100000000, size: 8 },
    "Candle Shop": { cost: 500000, size: 4 },
    "Car Dealership": { cost: 6000000, size: 4 },
    "Clothing Store": { cost: 1000000, size: 5 },
    "Cruise Line": { cost: 300000000, size: 6 },
    "Cyber Cafe": { cost: 3000000, size: 4 },
    "Detective Agency": { cost: 12000000, size: 4 },
    "Farm": { cost: 5250000, size: 5 },
    "Firework Stand": { cost: 500000, size: 4 },
    "Fitness Center": { cost: 17000000, size: 8 },
    "Flower Shop": { cost: 500000, size: 4 },
    "Furniture Store": { cost: 2500000, size: 4 },
    "Game Shop": { cost: 1250000, size: 4 },
    "Gas Station": { cost: 25000000, size: 4 },
    "Gents Strip Club": { cost: 5000000, size: 4 },
    "Grocery Store": { cost: 2000000, size: 5 },
    "Gun Shop": { cost: 2500000, size: 4 },
    "Hair Salon": { cost: 750000, size: 4 },
    "Ladies Strip Club": { cost: 5000000, size: 4 },
    "Law Firm": { cost: 4000000, size: 4 },
    "Lingerie Store": { cost: 1750000, size: 4 },
    "Logistics Management": { cost: 1800000000, size: 6 },
    "Meat Warehouse": { cost: 4000000, size: 5 },
    "Mechanic Shop": { cost: 3000000, size: 4 },
    "Mining Corporation": { cost: 4500000000, size: 8 },
    "Music Store": { cost: 1500000, size: 4 },
    "Nightclub": { cost: 7500000, size: 5 },
    "Oil Rig": { cost: 10500000000, size: 12 },
    "Private Security Firm": { cost: 950000000, size: 6 },
    "Property Broker": { cost: 750000, size: 4 },
    "Pub": { cost: 1250000, size: 4 },
    "Restaurant": { cost: 1000000, size: 4 },
    "Software Corporation": { cost: 6000000, size: 5 },
    "Sweet Shop": { cost: 1000000, size: 4 },
    "Television Network": { cost: 8000000000, size: 8 },
    "Theater": { cost: 50000000, size: 6 },
    "Toy Shop": { cost: 2000000, size: 5 },
    "Zoo": { cost: 300000000, size: 6 }
};

const UPGRADE_DATA = {
    size: {
        maxLevel: 6,
        costMultipliers: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6], // +10% each level
        sizeMultipliers: [1, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5] // Starts at 100%, +25% each level
    },
    staffRoom: {
        levels: [
            "No staff room",
            "Small staff room",
            "Standard staff room",
            "Large staff room",
            "Very large staff room",
            "Huge staff room",
            "Colossal staff room"
        ],
        costMultipliers: [0, 0.025, 0.05, 0.075, 0.1, 0.125, 0.15] // +2.5% each level
    },
    storage: {
        levels: [
            "Small room",
            "Standard room",
            "Large room",
            "Huge room",
            "Warehouse",
            "Large warehouse",
            "Huge warehouse"
        ],
        costMultipliers: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30] // +5% each level
    }
};
