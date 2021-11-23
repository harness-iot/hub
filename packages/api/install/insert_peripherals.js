// Setup Intrakit peripherals - must be setup in Mycodo first
const sqlite3 = require('sqlite3');
const { v4: uuidv4 } = require('uuid');

const supported_peripherals = [
  {
    unique_name: 'Grove_Multichannel_Relay',
    type: 'output',
    nickname: 'Relay',
    icon: 'relay',
    address: '11',
    custom_options: JSON.stringify({ channels: 4 }),
  },
  {
    unique_name: 'PCA9685_motor',
    type: 'output',
    nickname: 'Motor Driver',
    icon: 'motor',
    address: '60',
  },
  {
    unique_name: 'AM2315',
    type: 'input',
    nickname: 'Air Temperature & Humidity',
    icon: 'temp',
    address: '5c',
  },
  {
    unique_name: 'ATLAS_PH',
    type: 'input',
    nickname: 'Ion Concentration (PH)',
    icon: 'ph',
    address: '63',
  },
];

async function getMycodoId(db, { type, unique_name }) {
  return new Promise((resolve, reject) => {
    // Mycodo output stores name in 'output_type'
    // might be a bug
    const nameColumn = type === 'output' ? 'output_type' : 'device';
    return db.get(
      `SELECT unique_id FROM ${type} WHERE ${nameColumn} = ?`,
      [unique_name],
      (err, result) =>
        err ? reject(err) : resolve(result && result.unique_id),
    );
  });
}

async function isPeriphExists(db, mycodo_id) {
  return new Promise((resolve, reject) => {
    return db.get(
      `SELECT * FROM peripherals WHERE mycodo_id = ?`,
      [mycodo_id],
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });
}

async function insertPeriph(db, mycodo_id, peripheral) {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    return db.run(
      'INSERT INTO peripherals(mycodo_id,id,is_enabled,name,nickname,icon,type,address,custom_options) VALUES(?,?,?,?,?,?,?,?,?)',
      [
        mycodo_id,
        id,
        0,
        peripheral.unique_name,
        peripheral.nickname,
        peripheral.icon,
        peripheral.type,
        peripheral.address,
        peripheral.custom_options,
      ],
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });
}

(async function () {
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

  const intrakitDB = new sqlite3.Database('/home/ty/intrakit.db', (err) => {
    if (err) {
      console.log('Error connecting to Intrakit DB', err);
      throw err;
    }
    console.log('Connected to Intrakit DB');
  });

  try {
    for (const peripheral of supported_peripherals) {
      console.log(`Inserting peripheral: ${peripheral.nickname}`);

      const mycodo_id = await getMycodoId(mycodoDB, peripheral);

      if (!mycodo_id) {
        console.log(
          `Peripheral not found in Mycodo DB. skipping: ${peripheral.unique_name}`,
        );
        continue;
      }

      const periph_exists = await isPeriphExists(intrakitDB, mycodo_id);

      if (periph_exists) {
        console.log(`Skipping, peripheral exists: ${peripheral.nickname}`);
      } else {
        await insertPeriph(intrakitDB, mycodo_id, peripheral);
        console.log(`Peripheral successfully inserted: ${peripheral.nickname}`);
      }
    }

    console.log('Process Complete!');
  } catch (err) {
    console.log('ERROR: ', err);
  }
})();
