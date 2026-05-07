// @ts-nocheck
import express, { Request, Response } from "express";
import { data } from "./data";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try {
    // const response = await fetch(
    //   "https://webhook.site/48d00bbd-aa87-4189-8be6-542e914f01e7",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       time: new Date().toISOString(),
    //       message: "Ping from Express server",
    //     }),
    //   },
    // );
    const randomItem = data[Math.floor(Math.random() * data.length)];
    const myHeaders = new Headers();
    myHeaders.append("X-Title", randomItem.a);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: `${randomItem.b} - ${randomItem.c}`,
      redirect: "follow",
    };

    const response = await fetch("https://ntfy.sh/Vocabulary", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    console.log("Webhook called:", response.status);
  } catch (error) {
    console.error("Webhook error:", error);
  }

  return res.send({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
