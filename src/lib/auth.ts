import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MONGO_URI } from "../config/db.js";

const client = new MongoClient(MONGO_URI);

const db = client.db();

export const FRONTEND_URL = process.env.FRONTEND_URL!

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    user: {
    additionalFields: {
      isPremium: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:5000",
         FRONTEND_URL
    ],
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: `${FRONTEND_URL}` || "http://localhost:3000"
            // callbackURL: `${FRONTEND_URL}/login/verify` || "http://localhost:3000/login/verify"
        },
    },
});