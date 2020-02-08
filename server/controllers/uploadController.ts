import { Request, Response } from "express";
import { fileUpload } from "../app";

interface ResponseError extends Error {
  statusCode?: number;
}

export const uploadFileController = async (req: Request, res: Response) => {
  fileUpload.array("image", 10)(req, res, (err: ResponseError) => {
    if (err) {
      if (err.statusCode === 403) {
        return res.status(403).send(err.message);
      }
      console.log(err, "error log");
      return res.send(400);
    }

    if (Array.isArray(req.files)) {
      const normalizedResponse = req.files.map((file: Express.Multer.File) => {
        return {
          ...file,
          path: file.location
        };
      });
      return res.status(201).send({ files: normalizedResponse });
    }
  });
};
