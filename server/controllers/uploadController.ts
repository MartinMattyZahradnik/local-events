import { Request, Response } from "express";
import { fileUpload } from "../app";

export const uploadFileController = async (req: Request, res: Response) => {
  fileUpload(req, res, err => {
    if (err) {
      console.log(err, "????");
      return res.send(400);
    }

    if (Array.isArray(req.files)) {
      const normalizedResponse = req.files.map((file: any) => ({
        ...file,
        path: file.path.substring(7) // remove "public/" from path
      }));
      return res.status(201).send({ files: normalizedResponse });
    }

    return res.status(300).send({ nototo: req.files });
  });
};
