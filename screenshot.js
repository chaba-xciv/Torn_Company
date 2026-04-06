const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 2
    });

    // Mock the API response
    await page.route('https://api.torn.com/company/*', async route => {
        const json = {
            company: {
                name: "The Rose",
                company_type: 3, // Flower Shop -> mint theme
                rating: 6,
                daily_income: 1500000,
                daily_customers: 200,
                weekly_income: 10500000,
                weekly_customers: 1400,
                customers_served: 50,
                customer_capacity: 100,
                popularity: 15,
                days_old: 150
            },
            company_detailed: {
                trains_available: 5,
                advertising_budget: 20000
            },
            company_employees: {
                "123": { name: "Alice", position: "Manager", wage: 50000, days_in_company: 100, manual_labor: 5000, intelligence: 10000, endurance: 8000, effectiveness: { total: 100, merits: 10 }, last_action: { relative: "0 mins ago" }, status: { state: "Okay" } }
            },
            company_stock: {
                "Red Rose": { in_stock: 500, on_order: 100, cost: 500, rrp: 1500, price: 1400, sold_amount: 200, sold_worth: 280000 }
            },
            news: {
                "1": { timestamp: 1672531200, news: "Monday report: We had a total of 200 customers and made a gross income of $1,500,000." }
            }
        };
        await route.fulfill({ json });
    });

    await page.route('https://api.torn.com/user/*', async route => {
        const json = {
            name: "CEO_Bob",
            manual_labor: 50000,
            intelligence: 100000,
            endurance: 80000,
            last_action: { relative: "0 mins ago" },
            status: { state: "Okay" }
        };
        await route.fulfill({ json });
    });

    await page.goto('http://localhost:8000/index.html');
    await page.waitForTimeout(2000); // Wait for fetch and render

    // Screenshot default (company theme)
    await page.screenshot({ path: 'theme_company.png' });

    // Switch to Dark theme
    await page.click('#themeBtn-dark');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'theme_dark.png' });

    // Switch to Light theme
    await page.click('#themeBtn-light');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'theme_light.png' });

    await browser.close();
})();
