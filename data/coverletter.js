const mongoCollections = require("../config/mongoCollections");
const coverletterCollections = mongoCollections.coverletter;
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
    const newCoverLetter = {
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
  
    const coverletterData = await coverletterCollections();
    const users = await userCollections();
    const insertInfo = await coverletterData.insertOne(newCoverLetter);
  
    if (insertInfo.length === 0) throw new Error("Could not add a resume");
    let id = insertInfo.insertedId;
    return newCoverLetter;
   
  }

  
module.exports = {
  create
}