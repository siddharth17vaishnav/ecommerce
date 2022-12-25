import { User } from "../Entity/UserEntity";
import express from "express";
import bcrypt from "bcrypt";
export const users = async (req: express.Request, res: express.Response) => {
  try {
    const get = await User.find();
    res.status(200).send({ data: get });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, profile } = req.body;
    const existingUser = await User.findOneBy({ email: email });
    if (existingUser) {
      res.status(401).send({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const addUser = await User.createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: name,
          email: email,
          password: hashPassword,
          profile: profile,
        })
        .returning("*")
        .execute();
      res.send({ data: addUser.raw });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { users, register };
