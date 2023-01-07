import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import config from "./config/ormConfig";
import express from "express";
import cors from "cors";
import { UserRouter } from "./Routes/User";
import { CategoryRouter } from "./Routes/Category";

const app = express();
const PORT = process.env.PORT;

const main = async () => {
  // @ts-ignore
  const connection = new DataSource(config);

  connection
    .initialize()
    .then(() => {
      console.log(`DATABASE CONNECTED`);
      app.use(express.json());
      app.use(cors());
      app.use(UserRouter);
      app.use(CategoryRouter)
      app.listen(PORT, () => {
        console.log(`SERVER STARTED ON ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(`DATABASE DOES NOT CONNECTED `, err);
    });
};

main().then();
