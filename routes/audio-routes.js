const express = require('express');
const audioRouter = express.Router();
const audioController = require('../controllers/audio-controller.js');

audioRouter.get('/', audioController.index);
audioRouter.post('/', audioController.create);
audioRouter.get('/:id', audioController.show);
audioRouter.put('/:id', audioController.update);
audioRouter.delete('/:id', audioController.destroy);

module.exports = audioRouter;
