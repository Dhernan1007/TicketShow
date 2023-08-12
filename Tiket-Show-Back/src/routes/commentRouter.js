const {Router} = require('express');
const commentPost = require('../controllers/commentControllers/postComentController.js')
//const putCommentController = require('../handlers/commentsHandler/postComment.js');
const getComment = require('../controllers/commentControllers/getComentController.js');

const commentsRouter = Router();

commentsRouter.post('/postComments/', commentPost);
commentsRouter.get('/getComments/', getComment);
//commentsRouter.put('/comment/:email', putCommentController);

module.exports = commentsRouter