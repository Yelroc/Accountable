require('dotenv').config();

/**
 * Database env variables
 */

const {
  MASTER_USERNAME,
  DB_NAME,
  DB_PASSWORD,
  DB_URI,
} = process.env;


/**
 * Using sequelize to connect to mysql database
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB_NAME, MASTER_USERNAME, DB_PASSWORD, {
  host: DB_URI,
  dialect: 'mysql',
});


/**
 * Function call that connects to database
 * If databse connection is successful, success message logged to console
 */

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database successful');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

/**
 * Teachers is sequelize model that links to Teachers table in our database
 * Teachers model has name (string), and email (string)
 */


const Teachers = sequelize.define('teacher', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  number: {
    type: Sequelize.STRING,
    default: '+15042268038',
  },
});

/**
 * Classes is sequelize model that links to Classes table in our database
 * Classes model has name (string), and teacherID (foreign key pointing to Teachers table ID)
 */

const Classes = sequelize.define('class', {
  name: {
    type: Sequelize.STRING,
  },
  teacherID: {
    type: Sequelize.INTEGER,
    references: { model: 'teachers', key: 'id' },
  },
});

/**
 * Stuents is sequelize model that links to Stuents table in our database
 * Stuents model has name (string), parnetName (string)
 * phone (string), email (string), and classID (foreign key pointing to Classes table ID)
 */

const Students = sequelize.define('student', {
  name: {
    type: Sequelize.STRING,
  },
  parentName: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  classID: {
    type: Sequelize.INTEGER,
    references: { model: 'classes', key: 'id' },
  },
});

/**
 * Classes is sequelize model that links to Classes table in our database
 * Classes model has studentID (foreign key pointing to Student table id) and comment (text)
 */

const Comments = sequelize.define('comment', {
  studentID: {
    type: Sequelize.INTEGER,
    references: { model: 'students', key: 'id' },
  },
  comment: {
    type: Sequelize.TEXT,
  },
});

const Messages = sequelize.define('messages', {
  convoID: {
    type: Sequelize.INTEGER,
    references: { model: 'convos', key: 'id' },
  },
  incoming: {
    type: Sequelize.BOOLEAN,
  },
  body: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
});

/**
 * Convos is sequelize model that connects the students, teachers, and messages
 */

const Convos = sequelize.define('convos', {
  teacherNumber: {
    type: Sequelize.INTEGER,
    references: { model: 'teachers', key: 'id' },
  },
  parentNumber: {
    type: Sequelize.STRING,
    references: { model: 'students', key: 'phone' },
  },
});


sequelize.sync().then(() => {
  Teachers.create({ name: 'jesse', email: 'jesse@jesse.com' });
});

/**
 * Export models to use on server index.js to add / remove / update data in database
 */

module.exports.models = {
  Teachers,
  Classes,
  Students,
  Comments,
  // Convos,
  Messages,
};


// TEST
