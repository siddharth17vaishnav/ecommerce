import { User } from "../Entity/UserEntity";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as process from "process";
export const users = async (req: express.Request, res: express.Response) => {
  try {
    const get = await User.find();
    res.status(200).send({ data: get });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
let refreshTokens: any = [];
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOneBy({ email: email });
    if (findUser) {
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (
        comparePassword &&
        process.env.ACCESS_SECRET &&
        process.env.REFRESH_SECRET
      ) {
        const generateAccessToken = jwt.sign(
          {
            userId: findUser.id,
            email: findUser.email,
          },
          process.env.ACCESS_SECRET,
          { expiresIn: "30d" }
        );
        const generateRefreshToken = jwt.sign(
          {
            userId: findUser.id,
            email: findUser.email,
          },
          process.env.REFRESH_SECRET,
          { expiresIn: "30d" }
        );
        res.status(200).send({
          user: { email: findUser.email, profile: findUser.profile },
          accessToken: generateAccessToken,
          refreshToken: generateRefreshToken,
        });
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
    const { name, email, password } = req.body;
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
        })
        .returning("*")
        .execute();
      if (process.env.ACCESS_SECRET && process.env.REFRESH_SECRET) {
        const generateAccessToken = jwt.sign(
          {
            userId: addUser.raw.id,
            email: addUser.raw.email,
          },
          process.env.ACCESS_SECRET,
          { expiresIn: "30d" }
        );
        const generateRefreshToken = jwt.sign(
          {
            userId: addUser.raw.id,
            email: addUser.raw.email,
          },
          process.env.REFRESH_SECRET,
          { expiresIn: "30d" }
        );
        refreshTokens.push(generateRefreshToken);
        res.status(200).send({
          user: { email: addUser.raw.email, profile: addUser.raw.profile },
          accessToken: generateAccessToken,
          refreshToken: generateRefreshToken,
        });
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const refreshToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken == null)
      res.status(400).send({
        message: "No refresh token available to generate access token",
      });
    if (!refreshToken.includes(refreshToken)) {
      res.status(401).send({ message: "Unauthenticated request" });
    } else if (process.env.REFRESH_SECRET && process.env.ACCESS_SECRET) {
      const validRefreshToken: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );
      const newAccessToken = jwt.sign(
        { userId: validRefreshToken.userId, email: validRefreshToken.email },
        process.env.ACCESS_SECRET
      );
      const newRefreshToken = jwt.sign(
        { userId: validRefreshToken.userId, email: validRefreshToken.email },
        process.env.REFRESH_SECRET
      );
      res.status(200).send({ newAccessToken, newRefreshToken });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { users, register, login, refreshToken };
