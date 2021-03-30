import User from "../entities/user";

export const getAllUsers = async () => {
  return User.find();
};
