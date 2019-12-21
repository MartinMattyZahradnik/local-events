import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { AvailableUserRoles } from "../models/user";
import usersMocks from "./usersMock";

export const getToken = (userRole: AvailableUserRoles = "user"): string => {
  let email = "";
  let userId = "";

  switch (userRole) {
    case "admin":
      email = usersMocks[0].email;
      userId = usersMocks[0]._id.toString();

    case "user":
      email = usersMocks[1].email;
      userId = usersMocks[1]._id.toString();
      break;
    case "visitor":
      email = usersMocks[2].email;
      userId = usersMocks[2]._id.toString();
      break;
    default:
      email = usersMocks[2].email;
      userId = usersMocks[2]._id.toString();
  }

  const token = jwt.sign(
    {
      email,
      _id: userId,
      userRole
    },
    process.env.API_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return `Bearer ${token}`;
};
