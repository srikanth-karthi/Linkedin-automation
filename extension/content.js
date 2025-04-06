(async function autoSendMessages() {
    console.log("🔁 LinkedIn Auto Sender: Running...");
  
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const processed = new Set();
  
    while (true) {
      const spans = Array.from(document.querySelectorAll('span._1s9oaxgp'))
        .filter((el) => el.textContent.includes("…") && !processed.has(el.textContent.trim()));
  
      if (spans.length === 0) {
        console.log("✅ Done — no more messages to process.");
        break;
      }
  
      for (const span of spans) {
        try {
          const text = span.textContent.trim();
          if (processed.has(text)) continue;
  
          span.scrollIntoView({ behavior: "smooth", block: "center" });
          await sleep(1000);
          span.click();
          console.log(`🎯 Clicked: "${text}"`);
  
          await sleep(2000);
  
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
  
      // Optional: Scroll down to load more
      window.scrollBy(0, 500);
      await sleep(3000);
    }
  
    console.log("🏁 Script complete.");
  })();
  