import { Request, Response, NextFunction } from "express";

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || req.files.length < 1) {
    return res.status(400).send({ message: "files array is required! " });
  }

  if (Array.isArray(req.files)) {
    const normalizedResponse = req.files.map((file: any) => ({
      ...file,
      path: file.path.substring(7) // remove "public/" from path
    }));
    return res.status(201).send({ files: normalizedResponse });
  }

  return res.status(500).send();
};
