const {Router} = require('express');

const router = Router();

const {
    getEvent,
    getEvents,
    getEventByName,
    createEvent,
    deleteEvent,
    restoreEvent,
    updateEventdatos,
    updateEvent,

} = require('../controllers/eventControllers/getControllers')



router.get('/getEvents', getEvents);

router.get('/getEvent/:id', getEvent);

router.get('/getEvent/name/:name', getEventByName);

router.post('/createEvent', createEvent);

router.put('/deleteEvent/:id', deleteEvent);

router.put('/restoreEvent/:id', restoreEvent);

router.put('/upeventos/:id', updateEventdatos);

router.put('/updateEvent/:id', updateEvent)
module.exports = router;