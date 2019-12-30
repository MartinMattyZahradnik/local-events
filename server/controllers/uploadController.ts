import { Request, Response } from "express";
import { fileUpload } from "../app";

export const uploadFileController = async (req: Request, res: Response) => {
  fileUpload.array("image", 10)(req, res, (err: any) => {
    if (err) {
      if (err.statusCode === 403) {
        return res.status(403).send(err.message);
      }
      return res.send(400);
    }

    if (Array.isArray(req.files)) {
      const normalizedResponse = req.files.map((file: any) => {
        return {
          ...file,
          path: file.location
        };
      });
      return res.status(201).send({ files: normalizedResponse });
    }
  });
};
