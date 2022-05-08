const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function create(
  id,
  fullName,
  email,
  linkedIn,
  phoneNo,

  managerName,
  companyAddress,
  companyPhone,
  companyEmail,
  salutation,

  firstParagraph,
  secondParagraph,
  thirdParagraph,
  finalParagraph,

) {
  // Input Validation by calling functions from validation.js
  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });
  const newCoverletter = {
    fullName: fullName,
    email: email,
    linkedIn: linkedIn,
    phoneNo: phoneNo,

    // education
    managerName: managerName,
    companyAddress: companyAddress,
    companyPhone: companyPhone,
    companyEmail: companyEmail,
    salutation: salutation,

    firstParagraph: firstParagraph,
    secondParagraph: secondParagraph,
    thirdParagraph: thirdParagraph,
    finalParagraph: finalParagraph,
  };

  if (users === null)
    throw `No user exists with such ${id}`

  const updateUsers = await userColnew.updateOne({
    _id: ObjectId(id)
  }, {
    $addToSet: {
      coverLetter: newCoverletter
    }
  });

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update Coverletter details"
  }
  return newCoverletter;
}

async function build(id) {
  // Input Validation by calling functions from validation.js
  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });
  return users;
}

module.exports = {
  create,
  build,
};
