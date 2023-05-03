import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use("/", routes);

app.listen(PORT, async () => {
  console.log(`🚀 Http server listening at http://localhost:${PORT}`);
  // const db = new MongoDB(process.env.MONGO_URL || "");
  // await db.connect();
});
