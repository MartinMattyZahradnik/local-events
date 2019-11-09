import { Response, NextFunction } from "express";

import { countries } from "../models/countries";

export const getCountriesController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "success",
    result: countries
  });
};
