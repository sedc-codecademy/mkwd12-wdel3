import "dotenv/config";
import "./const/firebase";
import express from "express";
import mongoose from "mongoose";
import { globalRouter } from "./const/router.const";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import helmet from "helmet";

const PORT = (process.env.PORT || 3000) as number;
const HOST = process.env.HOST || "0.0.0.0";

const { DB_USER, DB_PASS, DB_CLUSTER, DB_NAME } = process.env;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(helmet());
//Whitelist all the domains and ports for the frontend which will be our dev client: localhost:4200 and our prod client: unknown
app.use(cors());
app.use(express.json());

app.use("/api", globalRouter);

app.use(errorHandler);

app.listen(PORT, HOST, async () => {
  console.log(`Server is up at port ${PORT}`);

  await mongoose.connect(MONGO_URI);

  console.log("Connected to MongoDB");
});
