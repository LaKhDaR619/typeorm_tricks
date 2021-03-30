import * as express from "express";
import { getAllUsers } from "./users.service";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await getAllUsers();
  return res.json(result);
});

export default router;
