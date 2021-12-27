const mongosee = require("mongoose");

const connectionDB = async () => {
  const connectionString = process.env.CONNECTION_STRING;
  const name = process.env.DATABASE_NAME;

  try {
    await mongosee.connect(`${connectionString}${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error("Data Base conecction failed: " + error.message);
  }
};

module.exports = connectionDB;
