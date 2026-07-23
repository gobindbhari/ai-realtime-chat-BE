import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MONGO_URI } from "../config/db.js";
import dotenv from "dotenv"


dotenv.config();


const client = new MongoClient(MONGO_URI);

const db = client.db();

export const FRONTEND_URL = process.env.FRONTEND_URL!

console.log("FRONTEND_URL :>", FRONTEND_URL)

console.log("isProduction : ",  process.env.NODE_ENV === "production")


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
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
    },
    useSecureCookies: process.env.NODE_ENV === "production" ? true : false ,
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false ,
    },
  },
  trustedOrigins: [
    FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:5000",
  ],
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      display: "popup",
      redirectURI: `${FRONTEND_URL}/api/auth/callback/google` // on this Error 400: redirect_uri_mismatch if we use different domains
    },
  },
});