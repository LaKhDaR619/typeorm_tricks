import { NewLineKind } from "typescript";
import Tag from "../entities/tag.model";
import User from "../entities/user.model";

export const getAllUsers = async () => {
  return User.find({ relations: ["tags"] });
};

export const addUser = async (user: User) => {
  const newUser = new User();
  newUser.name = user.name;
  newUser.age = user.age;

  // tags
  const n = Math.floor(Math.random() * 4);
  newUser.tags = (await Tag.find())
    .sort(() => Math.random() - Math.random())
    .slice(0, n);

  const { id } = await newUser.save();

  return id;
};

export const deleteUser = async (id: string) => {
  const fetchedUser = await User.findOne({ id });
  if (!fetchedUser) return Promise.reject(new Error("no user with this id"));

  await fetchedUser.remove();

  return id;
};
