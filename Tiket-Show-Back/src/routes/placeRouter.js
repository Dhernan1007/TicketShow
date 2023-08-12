const {Router} = require('express');
const placeEmail = require('../controllers/placesController/placesEmail');

const placeRouter = Router();

placeRouter.get('/:email', placeEmail);

module.exports = placeRouter