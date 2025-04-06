from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
import time

# ✅ Chrome profile setup
options = Options()
options.add_argument("--start-maximized")
options.add_argument("--user-data-dir=/Users/srikanth/Library/Application Support/Google/Chrome")
options.add_argument("--profile-directory=Default")

driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 10)

# ✅ Step 1: Wait for login
driver.get("https://www.linkedin.com/")
print("🔐 Waiting for you to log in...")

while True:
    try:
        profile_name = driver.find_element(By.CLASS_NAME, "profile-card-name")
        print(f"✅ Logged in as: {profile_name.text}")
        break
    except NoSuchElementException:
        print("⏳ Still waiting...")
        time.sleep(2)

# ✅ Step 2: Go to Catch-Up
driver.get("https://www.linkedin.com/mynetwork/catch-up/all/")
time.sleep(5)

# ✅ Step 3: Loop through and click messages one by one
processed = set()
index = 0

while True:
    try:
        # Re-fetch all spans each loop to avoid stale elements
        all_spans = driver.find_elements(By.XPATH, '//span[contains(@class, "_1s9oaxgp") and contains(text(), "…")]')

        if index >= len(all_spans):
            print("✅ Done — no more new messages to process.")
            break

        msg = all_spans[index]
        msg_text = msg.text.strip()

        if msg_text in processed:
            index += 1
            continue

        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", msg)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", msg)
        print(f"🎯 Clicked message: '{msg_text}'")
        time.sleep(2)

        # 🟢 Wait and click "Send"
        send_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, '//span[contains(@class, "_1s9oaxgp") and text()="Send"]'))
        )
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", send_btn)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", send_btn)
        print("📤 Clicked 'Send' button")
        time.sleep(2)

        processed.add(msg_text)
        index += 1

    except (StaleElementReferenceException, TimeoutException):
        print(f"⚠️ Skipping index {index} due to stale element or timeout")
        index += 1
        continue
    except Exception as e:
        print(f"⚠️ Unexpected error at index {index}: {e}")
        index += 1
        continue
