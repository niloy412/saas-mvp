import Subscription from "./subscription.model.js";
import Plan from "../plan/plan.model.js";
import ApiError from "../../utils/ApiError.js";

export const createSubscription = async (userId, planId) => {
    const plan = await Plan.findById(planId);

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    const startDate = new Date();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration_days);

    const subscription = await Subscription.create({
        user: userId,
        plan: planId,
        start_date: startDate,
        end_date: endDate,
        payment_status: "pending",
    });

    return subscription;
};

export const getUserSubscription = async (userId) => {
    return Subscription.findOne({
        user: userId,
        is_deleted: false,
    }).populate("plan");
};

export const getSubscriptionById = async (id) => {
    const subscription = await Subscription.findOne({
        _id: id,
        is_deleted: false,
    })
        .populate("user")
        .populate("plan");

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    return subscription;
};

export const upgradeSubscription = async (id, newPlanId) => {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    const plan = await Plan.findById(newPlanId);

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    subscription.plan = newPlanId;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration_days);

    subscription.end_date = endDate;

    await subscription.save();

    return subscription;
};

export const downgradeSubscription = async (id, newPlanId) => {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    const plan = await Plan.findById(newPlanId);

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    subscription.plan = newPlanId;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration_days);

    subscription.end_date = endDate;

    await subscription.save();

    return subscription;
};

export const cancelSubscription = async (id) => {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    subscription.status = "cancelled";

    await subscription.save();

    return subscription;
};

export const getActiveSubscriptionsService = async () => {

    const subscriptions = await Subscription
        .find({ status: "active" })
        .populate("user")
        .populate("plan");

    return subscriptions;
};