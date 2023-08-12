const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

const { searchAllData } = require('../controllers/searchController');

router.get(
    '/search/:search',
    [
        check('search', 'El search es obligatorio').not().isEmpty(),
        validateFields,
    ],
    searchAllData
);

module.exports = router;