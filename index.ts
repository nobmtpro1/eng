// @ts-nocheck
import express, { Request, Response } from "express";

const app = express();
const port = 3000;
app.use(express.json());
app.get("/", async (req: Request, res: Response) => {
  return res.send({ x: 123 });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
