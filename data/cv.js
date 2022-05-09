const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../helper/validator");

async function create(
  id,
  address,
  linkedin,
  title,
  profile,

  research_title,

  // education
  education_field,
  education_qualification,
  education_school,
  education_fromYear,
  education_toYear,

  // experiences
  experience_title,
  experience_company,
  experience_fromYear,
  experience_toYear,

  publications_title,
  conference_title,
  courses_title,
  certificate_title,
  volunteer_title,

  // skills
  skill_proficiency,
  skill_name,
) {
  // Input Validation by calling functions from validation.js
  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });

  const newCv = {
    address: address,
    linkedin: linkedin,

    title: title,
    profile: profile,

    research_title: research_title,
   
    // education
    education_field: education_field,
    education_qualification: education_qualification,
    education_school: education_school,
    education_fromYear: education_fromYear,
    education_toYear: education_toYear,

    // experiences
    experience_title: experience_title,
    experience_company: experience_company,
    experience_fromYear: experience_fromYear,
    experience_toYear: experience_toYear,

    publications_title: publications_title,
    conference_title: conference_title,
    courses_title: courses_title,
    certificate_title: certificate_title,
    volunteer_title: volunteer_title,
    // skills
    skill_name: skill_name,
    skill_proficiency: skill_proficiency,
  };

  if (users === null)
    throw `No user exists with such ${id}`

  const updateUsers = await userColnew.updateOne({
    _id: ObjectId(id)
  }, {
    $addToSet: {
      cv: newCv
    }
  });

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update cv details"
  }
  return newCv;

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
