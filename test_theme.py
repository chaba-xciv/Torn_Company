from playwright.sync_api import sync_playwright
import os

def run_test():
    os.makedirs("screenshots", exist_ok=True)
    os.makedirs("videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="videos")
        page = context.new_page()

        # Load the page
        page.goto("http://localhost:8000")
        page.wait_for_timeout(2000)

        # Check localStorage to see what theme was applied
        theme_pref = page.evaluate("localStorage.getItem('themePreference')")
        print(f"Initial theme preference: {theme_pref}")

        # Take a screenshot of the initial load
        page.screenshot(path="screenshots/initial.png")

        # Click the Dark Theme button
        page.click("#themeBtn-dark")
        page.wait_for_timeout(1000)

        # Check localStorage again
        theme_pref_after_dark = page.evaluate("localStorage.getItem('themePreference')")
        print(f"Theme preference after clicking Dark Theme: {theme_pref_after_dark}")

        # Take a screenshot after Dark Theme
        page.screenshot(path="screenshots/dark.png")

        # Reload the page
        page.reload()
        page.wait_for_timeout(2000)

        # Check localStorage and active theme after reload
        theme_pref_after_reload = page.evaluate("localStorage.getItem('themePreference')")
        print(f"Theme preference after reload: {theme_pref_after_reload}")

        page.screenshot(path="screenshots/reloaded.png")

        context.close()
        browser.close()

if __name__ == "__main__":
    run_test()
