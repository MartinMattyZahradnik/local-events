import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

// Models
import User from "../models/user";
import Event from "../models/event";

export const createUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: `Users with email: ${email} already exist. please use another email`
      });
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const userData = {
      ...req.body,
      password: hashedPw
    };

    const user = await User.create(userData);

    return res.status(201).send({
      message: "User has been created successfully.",
      userId: user._id
    });
  } catch (err) {
    return res.status(500).send();
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const users = await User.find().limit(limit);

    return res.status(200).send({
      message: "Users has fetched successfully.",
      users
    });
  } catch (err) {
    return res.status(500).send();
  }
};

export const getUserController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({
        message: `Unable to find user with id ${id}`
      });
    }

    return res.status(200).send({
      message: "User has been fetched successfully.",
      user
    });
  } catch (err) {
    if (err.name === "CastError" || err.kind === "ObjectId") {
      return res.status(400).send({
        message: `There is a problem with request. Probably it's not possible to cast object id ${err.value}`
      });
    }

    return res.status(500).send();
  }
};

export const updateUserController = async (req: any, res: Response) => {
  try {
    const {
      params: { id },
      token: { _id, userRole },
      body
    } = req;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: `Unable to find user with id ${id}`
      });
    }

    if (_id !== id && userRole !== "admin") {
      return res
        .status(403)
        .send({ message: "You don't have access to update this user profile" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true
    });

    return res.status(200).send({
      message: "User has been updated successfully.",
      user: updatedUser
    });
  } catch (err) {
    if (err.name === "CastError" || err.kind === "ObjectId") {
      return res.status(400).send({
        message: `There is a problem with request. Probably it's not possible to cast object id ${err.value}`
      });
    }

    return res.status(500).send();
  }
};

export const deleteUserController = async (req: any, res: Response) => {
  const {
    params: { id },
    token: { _id, userRole }
  } = req;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `Unable to find user with id ${id}`
      });
    }

    if (_id !== id && userRole !== "admin") {
      return res
        .status(403)
        .send({ message: "You don't have access to update this user profile" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User has been deleted successfully.",
      user
    });
  } catch (err) {
    if (err.name === "CastError" || err.kind === "ObjectId") {
      return res.status(400).send({
        message: `There is a problem with request. Probably it's not possible to cast object id ${err.value}`
      });
    }

    return res.status(500).send();
  }
};

export const getUserEventsController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    token: { _id, userRole }
  } = req;

  if (id !== _id && userRole !== "admin") {
    res.status(403).json({
      message: `Don't have access to user events`
    });
  }

  try {
    const events = await Event.find({
      owner: id
    });

    if (!events) {
      res.status(404).json({
        message: `Unable to events for user`
      });
    }

    res.status(201).json({
      message: "",
      events
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
