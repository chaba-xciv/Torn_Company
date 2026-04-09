from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # กรอก API Key เพื่อเข้าสู่ระบบ (ใช้ key ทดสอบ qUOaTvLAaCx3IamF)
    page.get_by_placeholder("Enter 16-character API Key").fill("qUOaTvLAaCx3IamF")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Connect").click()

    # รอให้หน้าโหลดเสร็จ (API Status Badge จะขึ้นมา)
    page.wait_for_timeout(6000)

    # เลื่อนลงมาให้เห็น Timer Section ชัดเจน
    page.evaluate("window.scrollBy(0, 100)")
    page.wait_for_timeout(500)

    # ถ่ายสกรีนช็อต
    page.screenshot(path="verification_timer.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification_videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
