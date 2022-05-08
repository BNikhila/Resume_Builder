const express = require("express");
const router = express.Router();
const cvData = require("../data/cv");
const validator = require("../helper/validator");
const ErrorMessage = require("../helper/message").ErrorMessage;

router.get("/new", async (req, res) => {
  try {
    return res.render("new_cv", {
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
  const {
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
    skill3_proficiency,
  } = req.body;

  try {
    //create and store the new user
    const resume = await cvData.create(
      user._id,
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
    res.redirect('/cv/build')
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

router.get("/build", (req, res) => {
  const user = req.session.user;
  if (!user) {  
    return res.redirect("/users/login");
  }
  const cv = cvData.build(user._id);
      if (cv) {
        res.render("cv_template1", {
          layout: false,
          user: req.user,
          cv: cv[cv.length - 1],
        });
      } else {
        // res.json({
        //     message: 'No user found'
        // })
        res.redirect("/cv/new");
      }
  
});

module.exports = router;
