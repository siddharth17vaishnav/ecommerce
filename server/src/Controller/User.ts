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

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOneBy({ email: email });
    if (findUser) {
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (comparePassword) {
        res.status(200).send({ data: findUser });
      } else {
        res.status(201).send({ message: "invalid email or password!" });
      }
    } else {
      res.status(201).send({ message: "User does not exists!" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, profile } = req.body;
    const existingUser = await User.findOneBy({ email: email });
    if (existingUser) {
      res.status(201).send({ message: "User already exists" });
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
      res.status(200).send({ data: addUser.raw });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { users, register, login };
