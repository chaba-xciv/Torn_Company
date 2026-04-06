from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 800}, device_scale_factor=2)

    def mock_company(route):
        route.fulfill(json={
            "company": {
                "name": "The Rose",
                "company_type": 3,
                "rating": 6,
                "daily_income": 1500000,
                "daily_customers": 200,
                "weekly_income": 10500000,
                "weekly_customers": 1400,
                "customers_served": 50,
                "customer_capacity": 100,
                "popularity": 15,
                "days_old": 150
            },
            "company_detailed": {
                "trains_available": 5,
                "advertising_budget": 20000
            },
            "company_employees": {
                "123": { "name": "Alice", "position": "Manager", "wage": 50000, "days_in_company": 100, "manual_labor": 5000, "intelligence": 10000, "endurance": 8000, "effectiveness": { "total": 100, "merits": 10 }, "last_action": { "relative": "0 mins ago" }, "status": { "state": "Okay" } }
            },
            "company_stock": {
                "Red Rose": { "in_stock": 500, "on_order": 100, "cost": 500, "rrp": 1500, "price": 1400, "sold_amount": 200, "sold_worth": 280000 }
            },
            "news": {
                "1": { "timestamp": 1672531200, "news": "Monday report: We had a total of 200 customers and made a gross income of $1,500,000." }
            }
        })

    def mock_user(route):
        route.fulfill(json={
            "name": "CEO_Bob",
            "manual_labor": 50000,
            "intelligence": 100000,
            "endurance": 80000,
            "last_action": { "relative": "0 mins ago" },
            "status": { "state": "Okay" }
        })

    page.route("https://api.torn.com/company/*", mock_company)
    page.route("https://api.torn.com/user/*", mock_user)

    page.goto('http://localhost:8000/index.html')
    page.wait_for_timeout(3000)

    page.screenshot(path='theme_company.png')

    page.click('#themeBtn-dark')
    page.wait_for_timeout(1000)
    page.screenshot(path='theme_dark.png')

    page.click('#themeBtn-light')
    page.wait_for_timeout(1000)
    page.screenshot(path='theme_light.png')

    browser.close()
