import { type Request, type Response, type NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("in middleware session run")
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log("in middleware session: =>>", session)

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};