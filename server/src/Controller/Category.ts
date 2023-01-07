import { Category } from "../Entity/CategoryEntity";
import express from "express";

export const categories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const get = await Category.find();
    res.status(200).send({ data: get });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    const addCategory = await Category.createQueryBuilder()
      .insert()
      .into(Category)
      .values({name})
      .returning("*")
      .execute();
    if (addCategory.raw) res.status(200).send({ data: addCategory.raw });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.module = { categories, addCategory };
