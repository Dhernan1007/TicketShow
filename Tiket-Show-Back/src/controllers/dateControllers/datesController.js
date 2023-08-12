const {Date} = require('../../db.js');

const theDate = async ()=>{
    try{
    const allDates = await Date.findAll();
    return allDates;
  } catch(error){
        throw new Error(error.message);  
  }
}

module.exports = theDate