const db = require('../db/config.js');
const Audio = {};

Audio.findAll = () => {
  return db.query(`
    SELECT * FROM audio
  `);
};

Audio.findById = id => {
  return db.oneOrNone(`
    SELECT * FROM audio
    WHERE id = $1
  `, [id]
  );
};

Audio.create = data => {
  return db.one(`
    INSERT INTO audio
    (audio)
    VALUES ($1)
    RETURNING *
  `, [data.audio]
  );
};

Audio.update = (data, id) => {
  return db.one(`
    UPDATE audio SET
    audio = $1
    WHERE id = $2
    RETURNING *
  `, [data.audio, id]
  );
};

Audio.destroy = id => {
  return db.none(`
    DELETE FROM audio
    WHERE id = $1
  `, [id]
  );
};

module.exports = Audio;
