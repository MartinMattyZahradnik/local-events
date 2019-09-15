import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User has been created successfully.",
      user
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

export const loginController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "email and password are required params for auth"
      });
    }

    const user = await User.findOne({
      email
    });
    console.log(user, "user");

    if (!user) {
      res.status(404).json({
        message: `Unable to find user with email ${email}`
      });
    }

    if (user.password !== password) {
      res.status(403).json({
        message: `Invalid combination of username and password, please try again`
      });
    }

    res.status(200).json({
      message: "Login success",
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
