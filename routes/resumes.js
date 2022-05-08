const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const resumeData = require("../data/resume");
const utils = require("../helper/utils");
const validator = require("../helper/validator");
const errorCode = require("../helper/common").errorCode;
const ErrorMessage = require("../helper/message").ErrorMessage;
const moment = require("moment");
let nodemailer = require("nodemailer");
const html_to_pdf = require('html-pdf-node');
const fs = require('fs')
const path = require('path')

router.get("/new", async (req, res) => {
  try {
    return res.render("new", {
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
router.post('/new', async (req, res) => {
  const user = req.session.user

  if (!user) {
    req.flash('message', 'In order to create your resume, you have to log in first')
    return res.redirect('/users/login')
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
    const resume = await resumeData.create(
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
    );
    return res.render("resume_template1", {
      user: req.session.user,
      resume: resume
    });

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

router.get('/preview', (req, res) => {
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
})

router.get('/download', (req, res) => {
  const user = req.session.user
  var userId = req.query.id
  if (user) {
    userId = user._id
  }
  if (!userId) {
    req.flash('message', 'In order to create your resume, you have to log in first')
    return res.redirect('/users/login')
  }
  Resume.find({ userId: userId }).lean()
    .then(resumes => {
      if (resumes) {
        res.render('download', {
          layout: false,
          user: req.user,
          resume: resumes[resumes.length - 1]
        })
      } else {
        // res.json({
        //     message: 'No user found'
        // })
        req.flash('error', 'No resume found for the username')
        res.redirect('/resume/new')
      }
    })
})

router.get('/build', (req, res) => {
  const user = req.user
  if (!user) {
    req.flash('message', 'In order to create your resume, you have to log in first')
    return res.redirect('/users/login')
  }
  Resume.find({ userId: user._id }).lean()
    .then(resumes => {
      if (resumes) {
        res.render('resume_template1', {
          layout: false,
          user: req.user,
          resume: resumes[resumes.length - 1]
        })
      } else {
        // res.json({
        //     message: 'No user found'
        // })
        req.flash('error', 'No resume found for the username')
        res.redirect('/resume/new')
      }
    })

})

module.exports = router;