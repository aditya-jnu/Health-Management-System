const {Router} = require('express')
const router = Router();

const createToken = require('../controller/createToken')

router.get('/room',function(request, response) {
    const identity = request.query.identity || 'identity';
    const room = request.query.room;
    response.json({ token: createToken(identity, room) });
})

module.exports = router;

