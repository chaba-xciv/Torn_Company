# Torn Company Dashboard

A comprehensive, zero-budget serverless dashboard for managing your company in Torn City. This tool retrieves your company data directly from the Torn API to provide insightful analytics, employee tracking, and stock management.

**Developed by jules AI**
**Project Owner: vibe code**

---

## Overview

The Torn Company Dashboard offers an all-in-one view of your company's performance. Since this project is entirely frontend-driven (with serverless Vercel endpoints strictly for static game data), your Torn API key is kept completely secure in your browser's local storage and is never sent to any external backend database.

## Features and Usage

### 1. Finances Card
This section breaks down your company's financials into three columns:
- **Expenses**: Tracks your daily advertising budget, total employee wages, and the estimated daily stock cost (Cost of Goods Sold).
- **Daily**: Shows your daily customer count, gross income, and net profit after all expenses.
- **Weekly**: Provides a 7-day projection of your customers, income, and profit based on current daily metrics and potential stock costs.

### 2. Inventory Stock Financials
Provides an in-depth look at your current inventory. It shows how much stock you have, order quantities, individual item costs, recommended retail prices (RRP), and your set selling prices. Crucially, it calculates your profit per item, the amount sold, and the total worth of the stock sold, making it easy to identify your most profitable items.

### 3. Historical Performance Graphs
The dashboard visualizes your company's daily gross income and customer count over up to the last 14 days. Since historical data isn't directly available via a simple API endpoint, this chart is intelligently built by parsing the company news log.

**Note on Data Retention**: To ensure your graphs don't reset when closing the page or changing CEOs, historical data is safely cached in your browser's local storage.

### 4. Company Events (News Timeline)
A feed of recent events in your company, from daily reports to vault deposits and upgrades, conveniently stripped of raw HTML for a cleaner reading experience.

### 5. Detailed Employee Status
A comprehensive table sorting and analyzing your workforce. Key features include:
- **Effectiveness & Merits**: Clearly highlights employee effectiveness. If an employee has an addiction penalty, a red pill icon and the negative percentage are displayed.
- **Train Tracking**: A visual tracking system using a dumbbell icon that slowly fades to indicate when an employee was last trained relative to others.
- **Stats Comparison**: Compares the employee's current Manual/Intelligence/Endurance stats against the recommended stats for their specific role. The relevant stat for their position is highlighted.
- **Inactivity Warning**: Employee last action times are colored red if they are offline for more than a day.

### 6. Actionable Alerts
Smart, dismissible banners that appear at the top of the dashboard when immediate attention is required:
- **Trains Available**: Reminds you when you have unused training slots.
- **Inactive Staff**: Flags employees who haven't logged in recently.
- **Low Effectiveness**: Alerts you when an employee's effectiveness drops below 80%.
- **Low Stock**: Notifies you when an item's stock falls below 100 units.

---

## Setup and Installation

As a user, you simply need to visit the hosted version of the application, input a valid Torn API Key with at least "Limited Access," and you are ready to go. The key is stored locally in your browser.

For developers:
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the local development server: `npm run dev` (If using Vite) or deploy to Vercel.

## Disclaimer
This project is an independent tool and is not officially affiliated with Torn.
