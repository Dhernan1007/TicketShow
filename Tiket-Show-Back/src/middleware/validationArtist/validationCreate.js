const validationCreate = (req, res, next)=>{
    const {
        firstName,
        lastName,
        nickname,
        email,
        password,
        phone,
        decription,
        twitter,
        instagram,
        spotify,
        image,
        google,
        state,
        confirmed
    }  = req.body;

    if(![firstName, lastName, nickname, email, 
        password, phone, decription, twitter, 
        instagram, spotify, image, google, 
        state, confirmed].every(Boolean)){

        res.status(400).send("Faltan datos por ingresar")
    }else{
        next()
    }
}

module.exports = validationCreate;