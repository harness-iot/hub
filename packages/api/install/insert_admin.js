const sqlite3 = require('sqlite3');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

async function insertAdmin(db, user) {
  return new Promise((resolve, reject) => {
    return db.run(
      'INSERT INTO users(id,unique_id,name,api_key,role_id) VALUES(?,?,?,?,?)',
      user,
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });
}

(async function () {
  try {
    const api_key = crypto.randomBytes(128);

    const mycodoDB = new sqlite3.Database(
      '/home/ty/Mycodo/databases/mycodo.db',
      (err) => {
        if (err) {
          console.log('Error connecting to Mycodo DB', err);
          throw err;
        }
        console.log('Connected to Mycodo DB');
      },
    );

    const unique_id = uuidv4();
    console.log('Inserting Mycodo Admin...');
    await insertAdmin(mycodoDB, [1, unique_id, 'admin', api_key, 1]);
    console.log(
      'IMPORTANT! set MYCODO_API_KEY in .env file to: ',
      api_key.toString('base64'),
    );
  } catch (err) {
    console.log('Insert Admin Failed: ', err);
  }
})();
