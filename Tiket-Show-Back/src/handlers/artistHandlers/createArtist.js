const newArtist = require('../../controllers/artistControllers/createArtist')

 const createArtistData = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            nameBand,
            yearCreation,
            nameArtist,
            nickname,
            email,
            password,
            phone,
            description,
            twitter,
            instagram,
            spotify,
            image,
            google,
            state,
            profileImageURL,
            confirmed
        } = req.body;


 

        const nuevaInstanciaArtista  = await newArtist({
            firstName,
            lastName,
            nameBand,
            yearCreation,
            nameArtist,
            nickname,
            email,
            password,
            phone,
            description,
            twitter,
            instagram,
            spotify,
            image,
            google,
            state,
            profileImageURL,
            confirmed
        });
        res.status(201).json(nuevaInstanciaArtista )
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = createArtistData