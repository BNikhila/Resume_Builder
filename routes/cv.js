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
  } = req.body;

  try {
    //create and store the new user
    const cv = await cvData.create(
      user._id,
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
  const users = cvData.build(user._id);
  if (users) {
    res.render("cv_template1", {
      layout: false,
      users: users,
    });
  } else {
    // res.json({
    //     message: 'No user found'
    // })
    res.redirect("/cv/new");
  }

});

module.exports = router;
