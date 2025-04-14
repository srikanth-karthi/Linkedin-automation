const button = document.getElementById("runScript");
let isRunning = false;

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!isRunning) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });

    chrome.tabs.sendMessage(tab.id, { action: "start" });

    isRunning = true;
    button.textContent = "⏹️ Stop";
    button.classList.add("running");
  } else {
    chrome.tabs.sendMessage(tab.id, { action: "stop" });

    isRunning = false;
    button.textContent = "▶️ Run";
    button.classList.remove("running");
  }
});
