const sqlite3 = require('sqlite3');
const { v4: uuidv4 } = require('uuid');

const default_roles = [
  {
    name: 'Admin',
    edit_settings: true,
    edit_controllers: true,
    edit_users: true,
    view_settings: true,
    view_camera: true,
    view_stats: true,
    view_logs: true,
  },
  {
    name: 'Editor',
    edit_settings: true,
    edit_controllers: true,
    edit_users: false,
    view_settings: true,
    view_camera: true,
    view_stats: true,
    view_logs: true,
  },
  {
    name: 'Monitor',
    edit_settings: false,
    edit_controllers: false,
    edit_users: false,
    view_settings: true,
    view_camera: true,
    view_stats: true,
    view_logs: true,
  },
  {
    name: 'Guest',
    edit_settings: false,
    edit_controllers: false,
    edit_users: false,
    view_settings: false,
    view_camera: false,
    view_stats: false,
    view_logs: false,
  },
];

async function insertRole(db, role) {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    return db.run(
      'INSERT INTO roles(id,name,edit_settings,edit_controllers,edit_users,view_settings,view_camera,view_stats,view_logs) VALUES(?,?,?,?,?,?,?,?,?)',
      [
        id,
        role.name,
        role.edit_settings,
        role.edit_controllers,
        role.edit_users,
        role.view_settings,
        role.view_camera,
        role.view_stats,
        role.view_logs,
      ],
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });
}

(async function () {
  try {
    const db = new sqlite3.Database('/home/ty/intrakit.db', (err) => {
      if (err) {
        console.log('Error connecting to Intrakit DB', err);
        throw err;
      }
      console.log('Connected to Intrakit DB');
    });

    for (const role of default_roles) {
      await insertRole(db, role);
      console.log(`inserted role: ${role.name}`);
    }

    console.log('Insert roles complete!');
  } catch (err) {
    console.log('Roles insert error: ', err);
  }
})();
