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
      
         // experiences
          experience_title,
          experience_company,
          experience_fromYear,
          experience_toYear,
      
         // skills
         skill_name,
          skill_proficiency,
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
      
         // experiences
          experience_title,
          experience_company,
          experience_fromYear,
          experience_toYear,
      
         // skills
         skill_name,
          skill_proficiency,
          );
          
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

router.get('/preview', (req, res) => {
    return res.render("preview", {
        user: req.session.user,
      });
})
router.get('/build', (req, res) => {
  const user = req.session.user;
  if (!user) {
      return res.redirect('/users/login')
  }
  Resume.findOne({userId: user._id}).lean()
  .then(resume => {
      if (resume) {
          res.render('resume_template1', {
              layout: false,
              user: req.session.user,
              resume: resume
          })
      } else {
          // res.json({
          //     message: 'No user found'
          // })
          
          res.redirect('/resume/new')
      }
  })
  
})

module.exports = router;