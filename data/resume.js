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


  // experiences
  experience_title,
  experience_company,
  experience_fromYear,
  experience_toYear,

  // skills
  skill_name,
  skill_proficiency,
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

    // experiences
    experience_title: experience_title,
    experience_company: experience_company,
    experience_fromYear: experience_fromYear,
    experience_toYear: experience_toYear,

   

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
