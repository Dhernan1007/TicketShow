const createUser = require('../../controllers/userControllers/createUser');

const createUserData = async (req, res) => {

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            birthdate,
            phone,
            dni,
            isAdmin,
            google,
            image,
            state,
            confirmed
        } = req.body;
       


        const newUser = await createUser({
            firstName,
            lastName,
            email,
            password,
            birthdate,
            phone,
            dni,
            isAdmin,
            google,
            image,
            state,
            confirmed
        });
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: error.message })
    }
}
module.exports= createUserData