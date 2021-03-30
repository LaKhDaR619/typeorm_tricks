import * as express from "express";
import {
  getAllUsers,
  addUser,
  deleteUser,
  getAllUsersByTag,
  getUsersByTag,
  getUsersByTagProblem,
} from "./users.service";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await getAllUsers();
  return res.json(result);
});

router.post("/", async (req, res) => {
  const user = req.body;
  const result = await addUser(user);
  return res.json(result);
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const result = await deleteUser(id);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/ordered-by-tag", async (req, res) => {
  const result = await getAllUsersByTag();
  return res.json(result);
});

router.get("/tag-problem/:tag", async (req, res) => {
  const { tag } = req.params;

  const result = await getUsersByTagProblem(tag.toUpperCase());
  return res.json(result);
});

router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;]

  const result = await getUsersByTag(tag.toUpperCase());
  return res.json(result);
});

export default router;
