import mongoose, { Schema } from "mongoose";

const signalSchema = new Schema(
    {
        ticker: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            index: true,
        },
        mentions: {
            type: Number,
            required: true,
            default: 0,
        },
        engagement: {
            type: Number,
            required: true,
            default: 0,
        },
        sentimentSummary: [
            {
                type: String, // Storing excerpts or titles of the top engaged posts for Amazon Nova to process easily
            }
        ],
        date: {
            // Processing date (e.g. YYYY-MM-DD)
            type: String,
            required: true,
            index: true,
        },
        source: {
            type: String,
            required: true,
            default: "reddit"
        }
    },
    {
        timestamps: true,
    }
);

export const Signal = mongoose.model("Signal", signalSchema);
