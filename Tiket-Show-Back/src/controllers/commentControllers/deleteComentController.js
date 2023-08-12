const {Comment} = require('../../db')
const deleteFunction = async(id)=>{ 
    const findComment = await Comment.findByPk(id)
       const deleteComment = await findComment.destroy(id)
    return deleteComment
}

module.exports = deleteFunction