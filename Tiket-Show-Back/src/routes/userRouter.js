const {Router} = require('express');

/*const createUser = require("../handlers/userHandler/createUser");
const getIdUser = require("../handlers/userHandler/idUser");
const deleteUser = require("../handlers/userHandler/unsuscribUser");
const commentPost = require('../controllers/userControllers/addComment')*/

const deleteUser = require('../controllers/userControllers/deleteUser');
const stateUser = require('../controllers/userControllers/stateUser');
const createUserData = require('../handlers/userHandler/createUser');
const checkUserDisabled = require('../controllers/userControllers/checkuser');
// const validationCreate = require("../middleware/validationArtist/validationCreate");
// const validationId = require("../middleware/validationArtist/validationIdId");
// const getAllArtist = require("../handlers/artistHandlers/getAllArtist");
// const getANameArtist = require("../handlers/artistHandlers/getANameArtist");
const idUser = require("../handlers/userHandler/idUser");
// // const updateArtist = require("../handlers/artistHandlers/updateArtist");


const userRouter = Router();
userRouter.get('/checkUserDisabled/:email', checkUserDisabled);
userRouter.post('/createUser',createUserData);
userRouter.get('/', idUser);
userRouter.delete('/deleteUser/:id', deleteUser);
userRouter.put('/stateUser/:email', stateUser);
// artistRouter.post('/createArtist', validationCreate, createArtist);

// artistRouter.get('/allArtist', getAllArtist);
// artistRouter.get('/?name=artist', getANameArtist);
// artistRouter.get('/:idArtist', validationId, getIdArtist);
// artistRouter.put('/update/:idArtist', validationId, updateArtist);
// artistRouter.delete('/delete/:idArtist', validationId, deleteArtist);

/*userRouter.post('/createUser', createUser);
userRouter.patch('/userComment/:id',commentPost )
userRouter.get('/id/:id', getIdUser);
userRouter.delete('/delete/:id', deleteUser);*/


module.exports = userRouter;