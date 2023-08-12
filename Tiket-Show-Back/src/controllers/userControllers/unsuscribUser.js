const {User} = require('../../db');

module.exports = async (id)=>{
    const findUser = await User.findByPk(id);
    const deleteUser = await findUser.destroy();

    return deleteUser;
}