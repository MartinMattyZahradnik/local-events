import User from "../models/user";
import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { getAppBaseUrl } from "../utils/utils";

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

    const user: any = await User.findOne({
      email
    });

    if (!user) {
      res.status(404).json({
        message: `Unable to find user with email ${email}`
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(403).json({
        message: `Invalid combination of username and password`
      });
    }

    const token = jwt.sign(
      {
        email,
        _id: user._id,
        userRole: user.userRole
      },
      process.env.API_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const {
      address,
      userRole,
      _id,
      firstName,
      lastName,
      userName,
      birthDate,
      phone,
      image,
      gender,
      createdAt
    } = user;
    res.status(200).json({
      message: "Login success",
      user: {
        address,
        userRole,
        _id,
        firstName,
        lastName,
        userName,
        birthDate,
        phone,
        image,
        email,
        gender,
        createdAt
      },
      token: `Bearer ${token}`
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const passwordResetController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const buffer = await crypto.randomBytes(32);
    const token = buffer.toString("hex");
    const user = await User.findOne({
      email
    });

    if (!user) {
      res
        .status(404)
        .send({ message: `Unable to find user with email ${email}` });
    }

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    const link = `${getAppBaseUrl()}/set-new-password?token=${token}`;
    await user.save();
    await sgMail.send({
      to: email,
      from: "support@localevents.com",
      subject: "Local Events - password reset",
      html: `<p>Please use this link to reset the password. </p><a href="${link}">${link}</a>`
    });
    res.status(200).send({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
};

export const setNewPasswordController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { token, password } = req.body;
  if (!token || !password) {
    res.status(400).send({ message: "Password and token are required params" });
  }

  try {
    const user = await User.findOne({
      resetToken: token
    });

    if (!user) {
      res.status(404).send({ message: "Unable to find user with given token" });
    }

    if (user.resetTokenExpiration < Date.now()) {
      res.status(403).send({ message: "Token expired" });
    }

    const hashedPw = await bcrypt.hash(password, 12);
    await user.update({
      password: hashedPw,
      resetToken: null,
      resetTokenExpiration: null
    });

    res.status(200).send({ message: "User password has been reset" });
  } catch (err) {
    console.error(err);
  }
};
