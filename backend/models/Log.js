const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
    {
        api: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Api',
        },
        status: {
            type: String,
            required: true,
        },
        statusCode: {
            type: Number,
            required: true,
        },
        responseTime: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Log', logSchema);
