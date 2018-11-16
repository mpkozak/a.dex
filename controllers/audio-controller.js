const Audio = require('../models/audio.js');
const audioController = {};

audioController.index = (req, res) => {
  Audio.findAll()
    .then(data => {
      res.json({
        message: 'ok',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({err});
    });
};

audioController.show = (req, res) => {
  Audio.findById(req.params.id)
    .then(data => {
      res.json({
        message: 'ok',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({err});
    });
};

audioController.create = (req, res) => {
  Audio.create({
    audio: req.body.audio
  })
    .then(data => {
      res.json({
        message: 'ok',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({err});
    });
};

audioController.update = (req, res) => {
  Audio.update({
    audio: req.body.audio
    }, req.params.id
  )
    .then(data => {
      res.json({
        message: 'ok',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({err});
    });
};

audioController.destroy = (req, res) => {
  Audio.destroy(req.params.id)
    .then(data => {
      res.json({
        message: 'ok'
      });
    })
    .catch(err => {
      res.status(500).json({err});
    });
};

module.exports = audioController;
