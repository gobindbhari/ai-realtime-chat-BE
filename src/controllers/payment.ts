// import { razorpay } from "../lib/razorpay.js";
import Payment from "../models/payment.js";
import { type Request, type Response } from "express";
import User from "../models/user.js";
import crypto from "crypto";
import { getIO } from "../lib/socket.js";
import Razorpay from "razorpay";


export const createOrder = async (
    req: Request,
    res: Response
) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    console.log("RAZORPAY_KEY_ID :==> ", process.env.RAZORPAY_KEY_ID);
    console.log("RAZORPAY_SECRET :==> ", process.env.RAZORPAY_SECRET);
    
    
    try {
        const user = req.user;

        const order = await razorpay.orders.create({
            amount: 19900,
            currency: "INR",
            // receipt: `user_${user.id}_${Date.now()}`,
            // notes: {
            //     userId: user.id,
            //     name: user.name,
            //     email: user.email
            // }
        });

        await Payment.create({
            user: user.id,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

        return res.json(order);

    } catch (error: any) {

        console.error(error);
        if (error.error) {
            console.error(error.error);
        }

        return res.status(500).json({
            success: false,
            message: "Unable to create order"
        });

    }
};


export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment data"
            });
        }

        const generated = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET!)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generated !== razorpay_signature) {
            return res.status(400).json({
                success: false,
            });
        }

        const payment = await Payment.findOne({
            orderId: razorpay_order_id,
            user: req.user.id,
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (payment.status === "paid") {
            return res.json({
                success: true,
                message: "Already verified"
            });
        }

        payment.paymentId = razorpay_payment_id;
        payment.signature = razorpay_signature;
        payment.status = "paid";
        payment.set("paidAt", new Date());


        await payment.save();

        // await User.findByIdAndUpdate(payment.user, {
        //     isPremium: true,
        // });
        await User.updateOne(
            { _id: payment.user },
            {
                isPremium: true,
            }
        );

        const io = getIO();

        io.to(payment.user.toString()).emit("premium-unlocked");

        return res.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
}