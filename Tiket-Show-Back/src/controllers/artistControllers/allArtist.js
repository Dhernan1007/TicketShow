const {Artist} = require('../../db.js');

const artist = async ()=>{
    try {
        const theArtist = await Artist.findAll();
        return theArtist
    } catch (error) {
        throw new Error(error.message);        
    }

}

module.exports = artist