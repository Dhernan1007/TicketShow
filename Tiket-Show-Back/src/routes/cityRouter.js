const {Router} = require('express');
const findCity = require('../handlers/cityHandler/city');
const allCity = require('../handlers/cityHandler/allCity');


const cityRouter = Router();

cityRouter.get('/allCity', allCity);
//cityRouter.get('/:name', findCity);

module.exports = cityRouter