import Event from "../models/event";
import User from "../models/user";
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

    return res.status(200).json({
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
    return res.status(200).json(body);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    await Event.findByIdAndUpdate(body._id, body);
    return res.status(200).json(body);
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

export const getEventDetailController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId).populate("owner");

    if (!event) {
      const error: ErrorWithStatusCode = new Error("Could not find Event.");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({ event, message: "Fetch event successful" });
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
  const {
    params: { eventId },
    token: { email }
  } = req;

  try {
    const event: any = await Event.findById(eventId).populate("owner");
    if (!event) {
      return res.send(404).send(`Could not find Event ${eventId}`);
    }

    const user = await User.findOne({ email });
    if (!user || !user._id.equals(event.owner._id)) {
      return res.send(403).send("Forbidden");
    }

    await Event.findByIdAndRemove(eventId);
    return res.status(200).json({ message: "Deleted post." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getSimilarEventsController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const limit = req.query.limit || 4;
  const { eventId } = req.params;

  try {
    const event: any = await Event.findById(eventId);

    if (!event) {
      const error: ErrorWithStatusCode = new Error("Could not find Event.");
      error.statusCode = 404;
      throw error;
    }

    const similarEvents = await Event.find({
      category: { $in: event.category },
      country: event.country
    }).limit(parseInt(limit));

    return res
      .status(200)
      .json({ similarEvents, message: "Fetch similar events successfull" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
