const theCity = require('../../controllers/cityController/citysControl');


const allCity = async (req, res)=>{
    try {
        const city = await theCity();
        res.status(200).json(city)
    } catch (error) {
        res.status(400).json({msg: error.message})
        
    }
    
}

module.exports = allCity