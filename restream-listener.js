const WebSocket = require("ws");

const WS_URL =
  "wss://backend.chat.restream.io/ws/embed?token=54eceb28-9f1a-4117-bcfd-a84876a526d5";

function connect() {
  const ws = new WebSocket(WS_URL, {
    headers: {
      Origin: "https://chat.restream.io",
    },
  });

  ws.on("open", () => {
    console.log("[connected] Restream Chat WebSocket");
  });

  ws.on("message", (data) => {
    const raw = data.toString();
    try {
      const parsed = JSON.parse(raw);
      console.log(
        `[${new Date().toISOString()}]`,
        JSON.stringify(parsed, null, 2)
      );
    } catch {
      console.log(`[${new Date().toISOString()}] RAW:`, raw);
    }
  });

  ws.on("close", (code, reason) => {
    console.log(`[disconnected] code=${code} reason=${reason}`);
    console.log("[reconnecting] in 3s...");
    setTimeout(connect, 3000);
  });

  ws.on("error", (err) => {
    console.error("[error]", err.message);
  });
}

connect();
