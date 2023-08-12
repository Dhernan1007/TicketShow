const {City} = require('../../db');

const theCity = async ()=>{
    const search = await City.findAll();
    return search;
}

module.exports = theCity