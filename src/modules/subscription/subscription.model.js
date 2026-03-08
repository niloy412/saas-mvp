import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);