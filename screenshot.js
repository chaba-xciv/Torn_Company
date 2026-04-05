const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        // Output console logs from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

        await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle2' });

        // Wait for data to load
        await page.waitForSelector('#compName', { timeout: 10000 });

        // Take screenshot
        await page.screenshot({ path: 'dashboard.png', fullPage: true });
        console.log('Screenshot saved to dashboard.png');

        await browser.close();
    } catch (e) {
        console.error('Error:', e);
    }
})();