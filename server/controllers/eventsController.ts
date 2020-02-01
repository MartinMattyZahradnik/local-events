import Event from "../models/event";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export const getEventsController = async (req: Request, res: Response) => {
  const { offset, limit, city, searchTerm } = req.query;

  const searchConditions: {
    "address.city"?: string;
    name?: { $regex: string; $options: "i" };
  } = {};
  if (city !== "all") {
    searchConditions["address.city"] = city;
  }

  if (searchTerm) {
    searchConditions.name = { $regex: searchTerm, $options: "i" };
  }

  try {
    const totalItems = await Event.find(searchConditions).countDocuments();
    const events = await Event.find(searchConditions)
      .sort({ date: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .populate("owner");

    return res.status(200).json({
      message: "Fetched events successfully.",
      events: events,
      totalItems: totalItems
    });
  } catch (err) {
    return res.status(500).send({});
  }
};

export const createEventController = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Event.create(body);
    return res.status(200).json(body);
  } catch (err) {
    return res.status(500).send({ message: "Unable to create an event" });
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body,
    token: { _id, userRole },
    params: { eventId }
  } = req;

  try {
    const event: any = await Event.findById(eventId)
      .populate("owner")
      .exec();

    if (!event) {
      return res
        .status(404)
        .send({ message: `Unable to find event with id: ${eventId}` });
    }

    if (_id !== event.owner._id.toString() && userRole !== "admin") {
      return res
        .status(403)
        .send({ message: "You don't have access rights to update this event" });
    }

    await Event.findByIdAndUpdate(eventId, {
      ...body,
      price: { ...event.price, price: body.price }
    });
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId).populate("owner");
    if (!event) {
      return res.status(404).send({ message: "Unable to find event" });
    }

    return res.status(200).json({ event, message: "Fetch event successful" });
  } catch (err) {
    if (err.kind && err.kind === "ObjectId") {
      return res.status(404).send({ message: "Unable to find event" });
    }

    next(err);
  }
};

export const deleteEventController = async (
  req: Request,
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
      return res
        .status(404)
        .json({ message: `Could not find Event ${eventId}` });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      (!user._id.equals(event.owner._id) && user.userRole !== "admin")
    ) {
      return res.status(403).send("Forbidden");
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
  req: Request,
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
      .json({ similarEvents, message: "Fetch similar events successful" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
