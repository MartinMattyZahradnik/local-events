import Event from "../models/event";
import { Request, Response, NextFunction } from "express";

export const getEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { offset, limit } = req.query;

  try {
    const totalItems = await Event.find().countDocuments();
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.status(200).json({
      message: "Fetched events successfully.",
      events: events,
      totalItems: totalItems
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const newEvent = new Event(body);

  try {
    await newEvent.save();
    res.status(200).json(body);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

export const getEventController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      const error: ErrorWithStatusCode = new Error("Could not find Event.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ event, message: "Fetch event successfull" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteEventController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      const error: ErrorWithStatusCode = new Error("Could not find Event.");
      error.statusCode = 404;
      throw error;
    }

    await Event.findByIdAndRemove(eventId);
    res.status(200).json({ message: "Deleted post." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
