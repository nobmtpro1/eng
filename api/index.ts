import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await fetch("https://webhook.site/48d00bbd-aa87-4189-8be6-542e914f01e7", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: new Date().toISOString(),
      }),
    });

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      error: String(e),
    });
  }
}
