const button = document.getElementById("runScript");
let isRunning = false;

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!isRunning) {
    // Inject the script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    isRunning = true;
    button.textContent = "⏹️ Stop";
    button.classList.add("running");
  } else {
    isRunning = false;
    button.textContent = "▶️ Run";
    button.classList.remove("running");
  }
});
