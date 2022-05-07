const MongoClient = require("mongodb").MongoClient;
const settings = {
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/",
    database: "resume_builder_db",
  },
};
=======
const settings = require("./settings.json");
>>>>>>> 2d713959645fa494006546a803bc889266338842
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

<<<<<<< HEAD
module.exports = {
  connectToDb: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(mongoConfig.serverUrl, {
        useNewUrlParser: true,
      });
      _db = await _connection.db(mongoConfig.database);
    }
    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
=======
module.exports = async () => {
	if (!_connection) {
		_connection = await MongoClient.connect(mongoConfig.serverUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		_db = await _connection.db(mongoConfig.database);
	}
	return _db;
>>>>>>> 2d713959645fa494006546a803bc889266338842
};
