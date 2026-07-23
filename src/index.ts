import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { registerChatSocket } from "./lib/server.js";
import Message from "./models/message.js";
import { ai, groq } from "./lib/gemini.js";
import { razorpay } from "./lib/razorpay.js";
import Payment from "./models/payment.js";
import { type Request, type Response } from "express";
import { aiSummary } from "./controllers/ai.js";
import { createOrder, verifyPayment } from "./controllers/payment.js";
import { requireAuth } from "./middleware/auth.js";
import { initSocket } from "./lib/socket.js";



dotenv.config();

await connectDB()

const app = express();


app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});


initSocket(io);

registerChatSocket(io)


// ------- better-auth -------
app.all("/api/auth/*path", toNodeHandler(auth));

app.get( "/api/me", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
  return 
});

// ------- ends better-auth -------




// --------- ai integration --------- 
app.get("/api/ai/summary", requireAuth, aiSummary);


// ---------------- payemnt 
app.post("/api/payment/create-order", requireAuth, createOrder);
app.post("/api/payment/verify-payment", requireAuth, verifyPayment);

// app.post("/api/create-order",  async (req, res) => {
//   const user = req.user;

//   const order = await razorpay.orders.create({
//     amount: 19900,
//     currency: "INR",
//     receipt: `user_${user.id}_${Date.now()}`,
//     notes: {
//       userId: user.id,
//       name: user.name,
//       email: user.email,
//     },
//   });

//   await Payment.create({
//     user: user.id,
//     orderId: order.id,
//     amount: order.amount as number,
//     currency: order.currency,
//     status: "created",
//   });

//   res.json(order);
// });




server.listen(process.env.PORT, () => {
  console.log(`Server running on \n \t\t http://localhost:${process.env.PORT} \n`);
}); 