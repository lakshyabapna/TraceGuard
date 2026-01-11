const express = require('express');
const router = express.Router();
const {
    getApis,
    createApi,
    updateApi,
    deleteApi,
} = require('../controllers/apiController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getApis).post(protect, createApi);
router.route('/:id').delete(protect, deleteApi).put(protect, updateApi);

module.exports = router;
