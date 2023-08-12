const { User, Artist } = require("../../db");



module.exports = async ()=>{
    const idUsers = await User.findAll();
    const idArtista = await Artist.findAll();
console.log(idArtista, " esto necesito saber de la tabla artista" )
    if(!idUsers){
        alert("No existe un Usuario con este id");
    }else{
        alert('Usuario encontrado con éxito');
        return idUsers;
    }
}

