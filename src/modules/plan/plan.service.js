import Plan from "./plan.model.js";
import ApiError from "../../utils/ApiError.js";

export const createPlan = async (payload) => {
    const existingPlan = await Plan.findOne({
        name: payload.name,
        is_deleted: false,
        is_active: true
    });

    if (existingPlan) {
        throw new ApiError(409, "Plan already exists");
    }

    const plan = await Plan.create(payload);

    return plan;
};

export const getPlans = async (queryParams) => {
    const {
        page = 1,
        limit = 10,
        search,
        sortBy = "createdAt",
        order = "desc",
    } = queryParams;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // filter
    const filter = {
        is_deleted: false,
    };

    // Search by plan name
    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    const plansPromise = Plan.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber);

    const totalPromise = Plan.countDocuments(filter);

    const [plans, total] = await Promise.all([
        plansPromise,
        totalPromise,
    ]);

    return {
        data: plans,
        meta: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        },
    };
};

export const getPlanDetails = async (planId) => {
    const plan = await Plan.findOne({
        _id: planId,
        is_deleted: false,
    });

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return plan;
};

export const updatePlan = async (id, payload) => {
    const plan = await Plan.findOne({
        _id: id,
        is_deleted: false,
    });

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    Object.assign(plan, payload);

    await plan.save();

    return plan;
};

export const deletePlan = async (id) => {
    const plan = await Plan.findOne({
        _id: id,
        is_deleted: false,
    });

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    plan.is_deleted = true;
    plan.is_active = false;

    await plan.save();

    return { message: "Plan deleted successfully" };
};