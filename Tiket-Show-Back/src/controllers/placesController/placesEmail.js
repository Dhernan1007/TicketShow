const {Place} = require('../../db');

const placeControl = async (email)=>{

    const searchEmail = await Place.findOne({
        where:{
            email:email
        }
    })
    return searchEmail;
}

module.exports = placeControl;