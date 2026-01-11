const mongoose = require('mongoose');

const apiSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add an API name'],
        },
        endpoint: {
            type: String,
            required: [true, 'Please add an endpoint URL'],
        },
        method: {
            type: String,
            enum: ['GET', 'POST', 'PUT', 'DELETE'],
            default: 'GET',
        },
        status: {
            type: String,
            default: 'Pending', 
        },
        lastChecked: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Api', apiSchema);
