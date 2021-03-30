import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

import userRoutes from "./users/users.controller";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/users", userRoutes);

createConnection()
  .then(async (connection) => {
    console.log("connected to db");
  })
  .catch(console.log);

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
