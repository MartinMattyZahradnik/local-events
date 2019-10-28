import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({
        message: `Users with email: ${email} already exist. please use another email`
      });
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const userData = {
      ...req.body,
      password: hashedPw
    };

    const user = await User.create(userData);

    res.status(201).json({
      message: "User has been created successfully.",
      userId: user._id
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// ///////////////////////////////////
export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.body.limit || 20;
    const users = await User.find().limit(limit);

    res.status(200).json({
      message: "Users has fetched successfully.",
      users
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getUserController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Missing user Id."
      });
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: `Unable to find user with id ${id}`
      });
    }

    res.status(201).json({
      message: "User has been fetched successfully.",
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateUserController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Missing user Id."
      });
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      res.status(404).json({
        message: `Unable to find user with id ${id}`
      });
    }

    res.status(201).json({
      message: "User has been updated successfully.",
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteUserController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      res.status(404).json({
        message: `Unable to find user with id ${id}`
      });
    }

    res.status(201).json({
      message: "User has been deleted successfully.",
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
