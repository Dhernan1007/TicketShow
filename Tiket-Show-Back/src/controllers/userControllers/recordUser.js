const {User} = require("../../db");
const {Op} = require("sequelize");

module.exports = async (name)=>{
    const nameUser = await User.findOne({
        where: {
            name: {
                [Op.iLike]:[`%${name}%`]}
        }
    })

    if(nameUser){
        alert("El usuario ya existe en la base de datos")
    }else{
        return alert("Usuario creado con exito")
    }
}