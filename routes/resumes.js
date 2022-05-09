const express = require("express");
const router = express.Router();
const resumeData = require("../data/resume");
const validator = require("../helper/validator");
const ErrorMessage = require("../helper/message").ErrorMessage;

router.get("/new", async (req, res) => {
  try {
    return res.render("new_resume", {
      user: req.session.user,
    });
  } catch (e) {
    console.log(e);
    if (typeof e == "string") {
      e = new Error(e);
      e.code = 400;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .render("error", {
        code: validator.isValidResponseStatusCode(e.code) ? e.code : 500,
        error: e.message,
        user: req.session.user,
      });
  }
});
router.post("/new", async (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/users/login");
    }
    console.log("req.body", req.body);
  const {
    address,
    linkedin,

    // about me
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
    skill3_proficiency,
  } = req.body;

  try {
    //create and store the new user
    const resume = await resumeData.create(
      user._id,
      address,
      linkedin,

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
    );
    console.log("resume create",resume);
    res.redirect('/resume/build')
  } catch (e) {
    if (typeof e == "string") {
      e = new Error(e);
      e.code = 400;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .json(ErrorMessage(e.message));
  }
});

router.get("/preview", (req, res) => {
  try {
    return res.render("preview", {
      user: req.session.user,
    });
  } catch (e) {
    console.log(e);
    if (typeof e == "string") {
      e = new Error(e);
      e.code = 400;
    }
    return res
      .status(validator.isValidResponseStatusCode(e.code) ? e.code : 500)
      .render("error", {
        code: validator.isValidResponseStatusCode(e.code) ? e.code : 500,
        error: e.message,
        user: req.session.user,
      });
  }
});

router.get("/build", async (req, res) => {
  const user = req.session.user;
  if (!user) {  
    return res.redirect("/users/login");
  }
  const users = await resumeData.build(user._id);
      if (users) {
        const resumes = users.resume;
        if(resumes){
          res.render("resume_template1", {
            layout: false,
            users: users,
            resume: resumes[resumes.length-1]
          });
        }else{
          res.redirect("/resume/new");
        }
        
      } else {
        res.redirect("/resume/new");
      }
  
});

module.exports = router;
