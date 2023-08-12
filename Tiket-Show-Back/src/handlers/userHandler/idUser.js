//const idUser = require("../../controllers/userControllers/idUsers");
const { User, Artist } = require("../../db");
module.exports = async(req, res)=>{

    const idUsers = await User.findAll();
    const idArtist = await Artist.findAll();

    //console.log(idArtist)
        if(!idUsers){
            alert("No existe un Usuario con este id");
        }else{
            //alert('Usuario encontrado con éxito');
            await res.status(200).json(idUsers.concat(idArtist));
           
        }
    // console.log(idUser, " user del back")
    // try {
    //     //const getUsersById = await idUser(userId);
    //    await res.status(200).json(idUser);
    // } catch (error) {
    //     res.status(400).json({msg: error.message});
    // }
}
