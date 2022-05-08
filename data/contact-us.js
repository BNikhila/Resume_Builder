const mongoCollections = require("../config/mongoCollections");
const contactusCollections = mongoCollections.contactus;
const userCollections = mongoCollections.users;
const validator = require("../helper/validator");
const utils = require("../helper/utils");
const errorCode = require("../helper/common").errorCode;
const userData = require("../data/users");

async function create(name, email, subject, message) {
  // Input Validation by calling functions from validation.js
  const contactusData = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  const conatctusData = await contactusCollections();
  const users = await userCollections();
  const insertInfo = await conatctusData.insertOne(contactusData);

  if (insertInfo.length === 0) throw new Error("Could not add a resume");
  let id = insertInfo.insertedId;
}

module.exports = {
  create,
};
