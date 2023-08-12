const {Router} = require('express');
const createArtist = require('../handlers/artistHandlers/createArtist');
//const validationCreate = require("../middleware/validationArtist/validationCreate");
//const validationId = require("../middleware/validationArtist/validationIdId");
const getAllArtist = require("../handlers/artistHandlers/getAllArtist");
const getANameArtist = require("../handlers/artistHandlers/getANameArtist");
const getIdArtist = require("../handlers/artistHandlers/getIdArtist");
const updateArtist = require("../handlers/artistHandlers/updateArtist");
const deleteArtist = require("../handlers/artistHandlers/deleteArtist");
const { allArtist } = require('../controllers/artistControllers/allArtist');

const artistRouter = Router();

/* 
C: create --> create
R: read --> get
U: update --> put / patch
D: delete --> delete
*/


/* 
params: id
name: name
all: all artist
*/

artistRouter.post('/createArtist', createArtist);
artistRouter.get('/allArtist', getAllArtist);
artistRouter.get('/nameArtist/:firstName', getANameArtist);
artistRouter.get('/:idArtist', getIdArtist);
artistRouter.put('/update/:idArtist', updateArtist);
artistRouter.delete('/delete/:idArtist', deleteArtist);









module.exports = artistRouter;