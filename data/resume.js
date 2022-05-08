const mongoCollections = require("../config/mongoCollections");
const resumeCollections = mongoCollections.resume;
const userCollections = mongoCollections.users;
const validator = require("../helper/validator");
const utils = require("../helper/utils");
const errorCode = require("../helper/common").errorCode;
const userData = require("../data/users");

async function create(
  firstName,
  lastName,
  address,
  email,
  linkedIn,
  phoneNo,

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
  // Input Validation by calling functions from validation.js
  console.log("firstName", firstName);
  const newResume = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    linkedIn: linkedIn,
    phoneNo: phoneNo,

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

  const resumeData = await resumeCollections();
  const users = await userCollections();
  const insertInfo = await resumeData.insertOne(newResume);

  if (insertInfo.length === 0) throw new Error("Could not add a resume");
  let id = insertInfo.insertedId;
  return newResume;
}

async function build(
  firstName,
  lastName,
  address,
  email,
  linkedIn,
  phoneNo,

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
  // Input Validation by calling functions from validation.js
  console.log("firstName", firstName);
  const newResume = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    linkedIn: linkedIn,
    phoneNo: phoneNo,

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

  const resumeData = await resumeCollections();
  const users = await userCollections();
  const insertInfo = await resumeData.insertOne(newResume);
  const resume = {
    resume: newResume,
  };
  const insertInfoResume = await users.insertOne(resume);
  if (insertInfo.length === 0) throw new Error("Could not add a resume");
  if (insertInfoResume.length === 0) throw new Error("Could not add a resume");
  let id = insertInfo.insertedId;
}

module.exports = {
  create,
  build,
};
