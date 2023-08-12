const searchCity = require('../../controllers/cityController/getCity');

const findCity = async (req, res)=>{
    const {name} = req.params;
    try {
        const cityOk = await searchCity(name);
        res.status(200).json(cityOk);
    } catch (error) {
        res.status(400).json({msg:error.message});
        
    }
}

module.exports = findCity