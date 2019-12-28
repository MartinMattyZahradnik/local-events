import { Request, Response } from "express";

export const uploadFileController = async (req: Request, res: Response) => {
  if (!req.files || req.files.length < 1) {
    return res.status(400).send({ message: "files array is required! " });
  }

  console.log(req.files, "????");

  if (Array.isArray(req.files)) {
    const normalizedResponse = req.files.map((file: any) => ({
      ...file,
      path: file.path.substring(7) // remove "public/" from path
    }));
    return res.status(201).send({ files: normalizedResponse });
  }

  console.log(Array.isArray(req.files), "???");

  return res.status(401).send();
};
