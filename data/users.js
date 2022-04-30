const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId } = require("mongodb");

async function create(
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  resume,
  cv,
  coverLetter
) {
  const userCol = await users();
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    addres: address,
    resume: resume,
    cv: cv,
    coverLetter: coverLetter,
    passwordHash: passwordHash,
  };
  const insertInfo = await userCol.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Could not add User";
  return "success";
}

module.exports = {
  create,
};
