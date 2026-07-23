import { Server } from "socket.io";
import Message from "../models/message.js";

export const registerChatSocket = (io: Server) => {

    io.on("connection", async (socket) => {
        console.log(socket.id);

        socket.join("global-room");

        socket.on("join-user-room", (userId: string) => {
            socket.join(userId);
            console.log(`${userId} joined private room`);
        });
        // socket.join(userId)

        // Load last 50 messages
        const history = await Message.find()
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();

        socket.emit("chat-history", history.reverse());

        socket.on(
            "send-message",
            async ({
                message,
                userId,
                userName,
            }: {
                message: string;
                userId: string;
                userName: string;
            }) => {
                const newMessage = await Message.create({
                    message,
                    userId,
                    userName,
                });

                io.to("global-room").emit(
                    "receive-message",
                    newMessage
                );
            }
        );

        socket.on("disconnect", () => {
            console.log("Disconnected:", socket.id);
        });

    });


};