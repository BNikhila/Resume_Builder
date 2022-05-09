const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function create(
  id,
  address,
  linkedin,
  title,
  profile,

  research_title,
  research2_title,
  research3_title,

  // education
  education_field,
  education_qualification,
  education_school,
  education_fromYear,
  education_toYear,

  education2_field,
  education2_qualification,
  education2_school,
  education2_fromYear,
  education2_toYear,

  // experiences
  experience_title,
  experience_company,
  experience_fromYear,
  experience_toYear,

  experience2_title,
  experience2_company,
  experience2_fromYear,
  experience2_toYear,

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
    research2_title: research2_title,
    research3_title: research3_title,
    // education
    education_field: education_field,
    education_qualification: education_qualification,
    education_school: education_school,
    education_fromYear: education_fromYear,
    education_toYear: education_toYear,

    education2_field: education2_field,
    education2_qualification: education2_qualification,
    education2_school: education2_school,
    education2_fromYear: education2_fromYear,
    education2_toYear: education2_toYear,

    // experiences
    experience_title: experience_title,
    experience_company: experience_company,
    experience_fromYear: experience_fromYear,
    experience_toYear: experience_toYear,

    experience2_title: experience2_title,
    experience2_company: experience2_company,
    experience2_fromYear: experience2_fromYear,
    experience2_toYear: experience2_toYear,

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
  console.log("id", id);
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
