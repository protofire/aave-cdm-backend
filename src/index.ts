import express, { Express } from "express";
import dotenv from "dotenv";
import MongoDB from "./db/connection";
import { getUserLoanRequest } from "./services/atomica";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`🚀 Http server listening at http://localhost:${PORT}`);
  // const db = new MongoDB(process.env.MONGO_URL || "");
  // await db.connect();
  console.log(
    await getUserLoanRequest("0x31c2cb2cd72a0a35bf1839a2e0d383566bf904b0")
  );
});
