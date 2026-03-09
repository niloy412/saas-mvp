import * as planService from "./plan.service.js";

export const createPlan = async (req, res, next) => {
    try {
        const plan = await planService.createPlan(req.body);

        res.status(201).json({
            success: true,
            data: plan,
        });
    } catch (error) {
        next(error);
    }
};

export const getPlans = async (req, res, next) => {
    try {
        const result = await planService.getPlans(req.query);

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

export const getPlanDetails = async (req, res, next) => {
    try {
        const plan = await planService.getPlanDetails(req.params.id);

        res.status(200).json({
            success: true,
            data: plan,
        });
    } catch (error) {
        next(error);
    }
};

export const updatePlan = async (req, res, next) => {
    try {
        const plan = await planService.updatePlan(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: plan,
        });
    } catch (error) {
        next(error);
    }
};

export const deletePlan = async (req, res, next) => {
    try {
        const result = await planService.deletePlan(req.params.id);

        res.json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};