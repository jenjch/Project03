JASON, if you re-generate the index file then:

ADD:
const dotenv = require('dotenv');
dotenv.config();

EDIT (note that the config.password has been changed to process.env.localPW):
sequelize = new Sequelize(config.database, config.username, process.env.localPW, config);

NOTE:
This assumes that there is an .env file with a "localPW" key-value pair, which has also been added to .gitignore