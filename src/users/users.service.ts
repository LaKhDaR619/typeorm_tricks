import { NewLineKind } from "typescript";
import Tag from "../entities/tag.model";
import User from "../entities/user.model";

export const getAllUsers = async () => {
  const result = await User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "tags")
    .getMany();

  return result;
};

export const addUser = async (user: User) => {
  const newUser = new User();
  newUser.name = user.name;
  newUser.age = user.age;

  // tags
  const n = Math.round(Math.random() * 5);
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

export const getAllUsersByTag = async () => {
  const result = await User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "searchTags")
    .leftJoinAndSelect("user.tags", "tags")
    .where(`searchTags.name = 'DEVELOPER'`)
    .orderBy("tags.index")
    .getMany();

  return result;
};

export const getUsersByTagProblem = async (tag: string) => {
  const result = await User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "tags")
    .where(`tags.name = :tag`, {
      tag,
    })
    .orderBy("tags.index")
    .getMany();

  return result;
};

export const getUsersByTag = async (tag: string) => {
  const result = await User.createQueryBuilder("user")
    .leftJoinAndSelect("user.tags", "searchTags")
    .leftJoinAndSelect("user.tags", "tags")
    .where(`searchTags.name = :tag`, {
      tag,
    })
    .orderBy("tags.index")
    .getMany();

  return result;
};
