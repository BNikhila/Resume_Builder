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

  skill3_name,
  skill3_proficiency
) {

  const userColnew = await usersCol();
  const users = await userColnew.findOne({
    _id: ObjectId(id)
  });
  if (!title || typeof (title) != "string" || !title.trim() || id.length == 0 || !ObjectId.isValid(id))
    throw "title not Valid"
  if (!address || typeof (address) != 'string' || address.trim().length === 0 || !address.trim())
    throw "address not Valid"
  if (!profile || typeof (profile) != "string" || !profile.trim())
    throw "profile not Valid"
  if (!education_field || typeof (education_field) != 'string' || education_field.trim().length === 0 || !education_field.trim())
    throw "education_field not Valid"
  if (!education_qualification || typeof (education_qualification) != "string" || !education_qualification.trim())
    throw "education_qualification not Valid"
  if (!education_school ||typeof (education_school) != 'string' || education_school.trim().length === 0 || !education_school.trim())
    throw "education_school not Valid"
  if (!education_fromYear || typeof (education_fromYear) != "string" || !education_fromYear.trim())
    throw "education_fromYear not Valid"
  if (!education_toYear || typeof (education_toYear) != 'string' || education_toYear.trim().length === 0 || !education_toYear.trim())
    throw "education_toYear not Valid"
  if (!education2_field || typeof (education2_field) != "string" || !education2_field.trim())
    throw "education2_field not Valid"
  if (!education2_qualification || typeof (education2_qualification) != 'string' || education2_qualification.trim().length === 0 || !education2_qualification.trim())
    throw "education2_qualification not Valid"
  if (!education2_school || typeof (education2_school) != "string" || !education2_school.trim())
    throw "education2_school not Valid"
  if (!education2_toYear || typeof (education2_toYear) != 'string' || education2_toYear.trim().length === 0 || !education2_toYear.trim())
    throw "education2_toYear not Valid"
  if (!education3_field ||  typeof (education3_field) != 'string' || education3_field.trim().length === 0 || !education3_field.trim())
    throw "education3_field not Valid"
  if (!education3_qualification || typeof (education3_qualification) != "string" || !education3_qualification.trim())
    throw "education3_qualification not Valid"
  if (!education3_school || typeof (education3_school) != 'string' || education3_school.trim().length === 0 || !education3_school.trim())
    throw "education3_school not Valid"
  if (!education3_fromYear ||  typeof (education3_fromYear) != "string" || !education3_fromYear.trim())
    throw "education3_fromYear not Valid"
  if (!education3_toYear || etypeof (education3_toYear) != 'string' || education3_toYear.trim().length === 0 || !education3_toYear.trim())
    throw "education3_toYear not Valid"

  if (!experience_title || typeof (experience_title) != "string" || !experience_title.trim())
    throw "experience_title not Valid"
  if (!experience_company || typeof (experience_company) != 'string' || experience_company.trim().length === 0 || !experience_company.trim())
    throw "experience_company not Valid"
  if (!experience_fromYear || typeof (experience_fromYear) != 'string' || experience_fromYear.trim().length === 0 || !experience_fromYear.trim())
    throw "experience_fromYear not Valid"
  if (!experience_toYear || typeof (experience_toYear) != "string" || !experience_toYear.trim())
    throw "experience_toYear not Valid"
  if (!experience2_title || etypeof (experience2_title) != 'string' || experience2_title.trim().length === 0 || !experience2_title.trim())
    throw "experience2_title not Valid"
  if (!experience2_company || typeof (experience2_company) != "string" || !experience2_company.trim())
    throw "experience2_company not Valid"
  if (!experience2_fromYear || typeof (experience2_fromYear) != 'string' || experience2_fromYear.trim().length === 0 || !experience2_fromYear.trim())
    throw "experience2_fromYear not Valid"

  if (!experience2_toYear || typeof (experience2_toYear) != 'string' || experience2_toYear.trim().length === 0 || !experience2_toYear.trim())
    throw "experience2_toYear not Valid"

  if (!experience3_title ||  typeof (experience3_title) != 'string' || experience3_title.trim().length === 0 || !experience3_title.trim())
    throw "experience3_title not Valid"
  if (!experience3_company || typeof (experience3_company) != "string" || !experience3_company.trim())
    throw "experience3_company not Valid"
  if (!experience3_fromYear ||  typeof (experience3_fromYear) != 'string' || experience3_fromYear.trim().length === 0 || !experience3_fromYear.trim())
    throw "experience3_fromYear not Valid"

  if (!experience3_toYear ||  typeof (experience3_toYear) != 'string' || experience3_toYear.trim().length === 0 || !experience3_toYear.trim())
    throw "experience3_toYear not Valid"

  if (!skill_name || typeof (skill_name) != 'string' || skill_name.trim().length === 0 || !skill_name.trim())
    throw "skill_name not Valid"
  if (!skill_proficiency || typeof (skill_proficiency) != "string" || !skill_proficiency.trim())
    throw "skill_proficiency not Valid"
  if (!skill2_name ||  typeof (skill2_name) != 'string' || skill2_name.trim().length === 0 || !skill2_name.trim())
    throw "skill2_name not Valid"

  if (!skill2_proficiency || typeof (skill2_proficiency) != 'string' || skill2_proficiency.trim().length === 0 || !skill2_proficiency.trim())
    throw "skill2_proficiency not Valid"

  if (!skill2_name || typeof (skill2_name) != 'string' || skill2_name.trim().length === 0 || !skill2_name.trim())
    throw "skill2_name not Valid"

  if (!skill3_name || typeof (skill3_name) != 'string' || skill3_name.trim().length === 0 || !skill3_name.trim())
    throw "skill3_name not Valid"

  if (!skill3_proficiency || typeof (skill3_proficiency) != 'string' || skill3_proficiency.trim().length === 0 || !skill3_proficiency.trim())
    throw "skill3_proficiency not Valid"

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

    skill3_name: skill3_name,
    skill3_proficiency: skill3_proficiency,
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
  try {
    validator.isValidObjectID(id);
    const userColnew = await usersCol();
    const users = await userColnew.findOne({
      _id: ObjectId(id)
    });
    return users;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  create,
  build,
};
