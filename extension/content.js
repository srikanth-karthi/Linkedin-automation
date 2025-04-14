let shouldStop = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "stop") {
    console.log("🛑 Stop signal received.");
    shouldStop = true;
  }
  if (message.action === "start") {
    if (!window.autoSenderRunning) {
      autoSendMessages();
    }
  }
});

async function autoSendMessages() {
  if (window.autoSenderRunning) return;
  window.autoSenderRunning = true;
  console.log("🔁 LinkedIn Auto Sender: Running...");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const processed = new Set();

  while (!shouldStop) {
    const spans = document.querySelectorAll('span._1s9oaxgp._12p2gmq9._12p2gmq2._12p2gmqk._29kmc3a._29kmc3b._29kmc3g._29kmc3l._1lu65cq2._1lu65cq1._1xoe5hd4a._1s9oaxgo._1ptbkx68w._1s9oaxg6._139m7k1io._1s9oaxgn.yyosfl1i');

    if (spans.length === 0) {
      console.log("✅ Done — no more messages to process.");
      break;
    }

    for (const span of spans) {
      if (shouldStop) break;

      try {
        const text = span.textContent.trim();
        console.log(`🔍 Found message: "${text}"`);
        if (
          (
            text.toLowerCase().includes("belated")
          )
        ) {
          console.log(`❌ Skipped: "${text}"`);
          continue;
        }
        

        span.scrollIntoView({ behavior: "smooth", block: "center" });
        await sleep(1000);
        span.click();
        console.log(`🎯 Clicked: "${text}"`);

        const sendBtn = Array.from(document.querySelectorAll('span._1s9oaxgp'))
          .find((el) => el.textContent.trim() === "Send");

        if (sendBtn) {
          sendBtn.scrollIntoView({ behavior: "smooth", block: "center" });
          await sleep(1000);
          sendBtn.click();
          console.log("📤 Clicked 'Send' button");
          await sleep(2000);
        }

        processed.add(text);
      } catch (err) {
        console.warn("⚠️ Error while processing:", err);
        continue;
      }
    }

    window.scrollBy(0, 500);
    await sleep(3000);
  }

  console.log("🏁 Script complete.");
  window.autoSenderRunning = false;
  shouldStop = false; // Reset for next run
}
