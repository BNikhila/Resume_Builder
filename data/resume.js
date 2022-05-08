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

   // experiences
    experience_title,
    experience_company,
    experience_fromYear,
    experience_toYear,

   // skills
   skill_name,
    skill_proficiency,
  ) {
    // Input Validation by calling functions from validation.js
    console.log("firstName", firstName)
    const newResume = {
       firstName: firstName,
     lastName: lastName,
       address: address,
      email: email,
       linkedIn: linkedIn,
       phoneNo:phoneNo,
  
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

   // experiences
    experience_title,
    experience_company,
    experience_fromYear,
    experience_toYear,

   // skills
   skill_name,
    skill_proficiency,
  ) {
    // Input Validation by calling functions from validation.js
    console.log("firstName", firstName)
    const newResume = {
       firstName: firstName,
     lastName: lastName,
       address: address,
      email: email,
       linkedIn: linkedIn,
       phoneNo:phoneNo,
  
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
  
    const resumeData = await resumeCollections();
    const users = await userCollections();
    const insertInfo = await resumeData.insertOne(newResume);
    const resume = {
      resume: newResume
    }
    const insertInfoResume = await users.insertOne(resume);
    if (insertInfo.length === 0) throw new Error("Could not add a resume");
    if (insertInfoResume.length === 0) throw new Error("Could not add a resume");
    let id = insertInfo.insertedId;
   
  }

module.exports = {
  create,
  build
}