
# 🚀 LinkedIn Auto Sender Extension

[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![MIT License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Yes-green?style=flat-square&logo=google-chrome)](https://chrome.google.com/webstore/devconsole)

A lightweight browser extension that **automatically sends personalized messages** (like "Congrats on your new role") on [LinkedIn Catch-Up](https://www.linkedin.com/mynetwork/catch-up/all/).

> Built with JavaScript — styled with love 💙

---

## ✨ Features

✅ Automatically finds and clicks relevant message buttons  
✅ Sends "Send" actions with a single click  
✅ Scrolls the page to load more entries  
✅ Beautiful animated popup UI  
✅ Toggle ▶️ Run and ⏹ Stop anytime

---

## 📁 Folder Structure

```
linkedin-automation/
├── extension/
│   ├── icons/
│   │   └── icon128.png         # Extension icon
│   ├── content.js              # Core logic for automation
│   ├── manifest.json           # Chrome extension manifest
│   ├── popup.html              # UI HTML
│   └── popup.js                # UI logic
├── venv/                       # (ignored Python virtual environment)
└── index.py                    # Optional Selenium-based version
```

---

## 🧪 How to Use (Locally)

### 👉 For Chrome / Edge:

1. Go to `chrome://extensions` or `edge://extensions`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `extension/` folder
5. Visit [LinkedIn Catch-Up](https://www.linkedin.com/mynetwork/catch-up/all/)
6. Click the extension icon in your browser toolbar
7. Hit ▶️ **Run**

> 💡 Use the DevTools Console (`F12`) to monitor activity.

---

## 🐍 Optional: Run the Python (Selenium) Version

If you prefer scripting instead of using the browser extension:

1. Install dependencies:
   ```bash
   pip install selenium webdriver-manager
   ```
2. Run the script:
   ```bash
   python index.py
   ```

> 🔒 Make sure you are **logged into LinkedIn** before running the script.



## 🤝 Contributing

Pull requests, ideas, and improvements are welcome!  
Fork the repo, improve the tool, and share back 🙌

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and share with credit 💫

