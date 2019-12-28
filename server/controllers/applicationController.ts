import { Response, Request } from "express";

import { countries } from "../models/countries";

export const getCountriesController = (req: Request, res: Response) => {
  return res.status(200).send({
    message: "success",
    result: countries
  });
};
