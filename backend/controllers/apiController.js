const asyncHandler = require('express-async-handler');
const Api = require('../models/Api');

const getApis = asyncHandler(async (req, res) => {
    const apis = await Api.find({ user: req.user.id });

    res.status(200).json(apis);
});

const createApi = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.endpoint) {
        res.status(400);
        throw new Error('Please add name and endpoint');
    }

    const api = await Api.create({
        name: req.body.name,
        endpoint: req.body.endpoint,
        method: req.body.method,
        user: req.user.id,
    });

    res.status(201).json(api);
});

const updateApi = asyncHandler(async (req, res) => {
    const api = await Api.findById(req.params.id);

    if (!api) {
        res.status(404);
        throw new Error('API not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (api.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedApi = await Api.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedApi);
});

const deleteApi = asyncHandler(async (req, res) => {
    const api = await Api.findById(req.params.id);

    if (!api) {
        res.status(404);
        throw new Error('API not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (api.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await api.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getApis,
    createApi,
    updateApi,
    deleteApi,
};
