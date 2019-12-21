import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    token?: any;
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get auth header
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    return res.status(403).send("Missing Authorization header");
  }

  try {
    const token = bearerHeader.split(" ")[1];
    const tokenData = await jwt.verify(token, process.env.API_TOKEN_SECRET);
    req.token = tokenData;
    next();
  } catch (error) {
    return res.status(403).send("Forbidden: invalid credentials");
  }
};
