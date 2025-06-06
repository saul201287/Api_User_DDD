import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "../config/cors";

dotenv.config();

export const app = express();

app.use(helmet.hidePoweredBy());
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("API is running");
});
