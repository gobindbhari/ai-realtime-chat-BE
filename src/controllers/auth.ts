import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { type Request, type Response } from "express";


export const authSessionMe = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
  return 
}