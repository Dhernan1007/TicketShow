const theDate = require('../../controllers/dateControllers/datesController');


const allDate = async (req, res)=>{
    try {
        const date = await theDate();
        res.status(200).json(date)
    } catch (error) {
        res.status(400).json({msg: error.message})
        
    }
    
}

module.exports = allDate