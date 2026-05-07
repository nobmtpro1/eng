// @ts-nocheck
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

// lưu interval global
let webhookInterval: NodeJS.Timeout | null = null;

app.get("/", async (req: Request, res: Response) => {
  // nếu chưa có interval thì tạo
  if (!webhookInterval) {
    webhookInterval = setInterval(async () => {
      try {
        const response = await fetch(
          "https://webhook.site/48d00bbd-aa87-4189-8be6-542e914f01e7",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              time: new Date().toISOString(),
              message: "Ping from Express server",
            }),
          }
        );

        console.log("Webhook called:", response.status);
      } catch (error) {
        console.error("Webhook error:", error);
      }
    }, 30 * 1000);

    console.log("✅ Interval started");
  } else {
    console.log("⚠️ Interval already exists");
  }

  return res.send({
    x: 123,
    intervalRunning: !!webhookInterval,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
