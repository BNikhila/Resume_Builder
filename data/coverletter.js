const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../helper/validator");

async function create(
  id,
  linkedin,
  fullname,
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
    linkedin: linkedin,
    fullname: fullname,
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
