import * as subscriptionService from "./subscription.service.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.createSubscription(
      req.user._id,
      req.body.planId
    );

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getMySubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getUserSubscription(
      req.user._id
    );

    res.json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const data = await subscriptionService.getSubscriptionById(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const upgradeSubscription = async (req, res, next) => {
  try {
    const data = await subscriptionService.upgradeSubscription(
      req.params.id,
      req.body.planId
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const downgradeSubscription = async (req, res, next) => {
  try {
    const data = await subscriptionService.downgradeSubscription(
      req.params.id,
      req.body.planId
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.cancelSubscription(
      req.params.id
    );

    res.json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};