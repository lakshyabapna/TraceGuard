const cron = require('node-cron');
const axios = require('axios');
const Api = require('../models/Api');
const Log = require('../models/Log');

const startMonitoring = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Running monitoring task...');

        try {
            const apis = await Api.find({});

            apis.forEach(async (api) => {
                const start = Date.now();
                let status = 'Down';
                let statusCode = 0;
                let responseTime = 0;

                try {
                    const response = await axios({
                        method: api.method,
                        url: api.endpoint,
                        timeout: 5000,
                    });

                    const end = Date.now();
                    responseTime = end - start;
                    statusCode = response.status;

                    if (statusCode >= 200 && statusCode < 300) {
                        status = 'Up';
                    }
                } catch (error) {
                    const end = Date.now();
                    responseTime = end - start;

                    if (error.response) {
                        statusCode = error.response.status;
                    } else if (error.request) {
                        statusCode = 500; 
                    } else {
                        statusCode = 500;
                    }
                    status = 'Down';
                }

                await Log.create({
                    api: api._id,
                    status,
                    statusCode,
                    responseTime,
                });

                await Api.findByIdAndUpdate(api._id, {
                    status,
                    lastChecked: Date.now(),
                });

                console.log(`Checked ${api.name}: ${status} (${statusCode}) - ${responseTime}ms`);
            });
        } catch (error) {
            console.error('Monitoring Error:', error);
        }
    });
};

module.exports = startMonitoring;
