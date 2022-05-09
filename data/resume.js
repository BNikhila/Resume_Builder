const mongoCollections = require("../config/mongoCollections");
const usersCol = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function create(
  id,
  linkedin,
  address,

  title,
  profile,
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

  education3_field,
  education3_qualification,
  education3_school,
  education3_fromYear,
  education3_toYear,

  // experiences
  experience_title,
  experience_company,
  experience_fromYear,
  experience_toYear,

  experience2_title,
  experience2_company,
  experience2_fromYear,
  experience2_toYear,

  experience3_title,
  experience3_company,
  experience3_fromYear,
  experience3_toYear,

  // skills
  skill_name,
  skill_proficiency,

  skill2_name,
  skill2_proficiency,
) {

  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });

  const newResume = {
    linkedIn: linkedin,
    address: address,
    title: title,
    profile: profile,
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

    education3_field: education3_field,
    education3_qualification: education3_qualification,
    education3_school: education3_school,
    education3_fromYear: education3_fromYear,
    education3_toYear: education3_toYear,

    // experiences
    experience_title: experience_title,
    experience_company: experience_company,
    experience_fromYear: experience_fromYear,
    experience_toYear: experience_toYear,

    experience2_title: experience2_title,
    experience2_company: experience2_company,
    experience2_fromYear: experience2_fromYear,
    experience2_toYear: experience2_toYear,

    experience3_title: experience3_title,
    experience3_company: experience3_company,
    experience3_fromYear: experience3_fromYear,
    experience3_toYear: experience3_toYear,

    // skills
    skill_name: skill_name,
    skill_proficiency: skill_proficiency,

    skill2_name: skill2_name,
    skill2_proficiency: skill2_proficiency,
  };

  if (users === null)
    throw `No user exists with such ${id}`

  const updateUsers = await userColnew.updateOne({
    _id: ObjectId(id)
  }, {
    $addToSet: {
      resume: newResume
    }
  });

  if (!updateUsers.matchedCount && !updateUsers.modifiedCount) {
    throw "failed to update resume details"
  }
  return newResume;

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
