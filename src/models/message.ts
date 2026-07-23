import { Schema, model, type InferSchemaType } from "mongoose";

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },

        userId: {
            type: String,
            required: true,
        },

        userName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export type MessageDocument = InferSchemaType<typeof messageSchema>;

const Message = model("Message", messageSchema);
export default Message; 