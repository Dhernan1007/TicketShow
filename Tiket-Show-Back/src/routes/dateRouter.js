const {Router} = require('express');
const allDate = require('../handlers/dateHandler/allDateHandler');


const dateRouter = Router();

dateRouter.get('/allDate', allDate);


module.exports = dateRouter