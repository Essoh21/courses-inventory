const path = require("path");
// import  required modules from models
const Course = require("../models/CourseModel");
const Instructor = require("../models/InstructorModel");
//import multer to help getting file and form data
const multer = require("multer");
//configure where files are going to be stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // create unique number
    const fileExtension = file.originalname.split(".").pop(); // get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});
// create the middleware function that is called to store files
const upload = multer({ storage: storage });

// import express-asyn-handler to handle error propagation when loading async files
const asyncHandler = require("express-async-handler");
// import express-validator middlware to validate and sanitize data
const { body, validationResult, matchedData } = require("express-validator");
const { response } = require("express");

// get all instructors

exports.getInstructors = asyncHandler(async (req, res, next) => {
  const allInstructors = await Instructor.find().exec();
  res.render("instructors", {
    title: "all Instructors",
    instructors: allInstructors,
  });
});

// CRUD
// get form to create Instructor
exports.getCreateNewInstructor = (req, res, next) => {
  res.render("instructorForm", { title: "New Instructor Form " });
};

// save created instructor
/* Some middleware functions  */
const createTextValAndSanitizationChain = (property, errorText) => {
  return body(`${property}`, `${errorText}`).trim().notEmpty().escape();
};
exports.postCreateNewInstructor = [
  upload.single("picture"),
  createTextValAndSanitizationChain(
    "firstName",
    "empty first Name not allowed"
  ),
  createTextValAndSanitizationChain(
    "lastName",
    "empty Family Name not allowed"
  ),
  createTextValAndSanitizationChain(
    "qualifications",
    "empty qualification not allowed"
  ),
  asyncHandler(async (req, res, next) => {
    const profilePicture =
      req.file === undefined ? undefined : path.basename(req.file.path);
    const formData = matchedData(req);
    const errorsFromValidation = validationResult(req);
    // prepare form data for save
    const instructor = new Instructor({
      first_name: formData.firstName,
      last_name: formData.lastName,
      qualifications: formData.qualifications,
      pictureSrc: profilePicture,
    });
    if (!errorsFromValidation.isEmpty()) {
      res.render("instructorForm", {
        title: "fix displayed errors and submit again",
        instructor: instructor,
        errors: errorsFromValidation.array(),
      });
    }
    //if valide data
    await instructor.save();
    res.redirect(instructor.url + "/details");
  }),
];

// get instructor details
exports.getInstructorDetails = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.instructorid;
  const [instructor, instructorCourses] = await Promise.all([
    Instructor.findById(instructorId).exec(),
    Course.find({ instructor: instructorId }).exec(),
  ]);
  if (instructor === null) {
    const error = new Error("Instructor not found");
    error.status = 404;
    return next(error);
  }
  res.render("instructorDetails", {
    title: `Instructor ${instructor.first_name}`,
    instructor: instructor,
    courses: instructorCourses,
  });
});

//  get update Instructor
exports.getUpdateInstructor = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.instructorid;
  // get instructor and his courses
  const instructor = await Instructor.findById(instructorId);
  res.render("instructorForm", {
    title: "Form to update Instructor",
    instructor: instructor,
  });
});

// save Instructor update
exports.postUpdateInstructor = [
  createTextValAndSanitizationChain(
    "firstName",
    "empty first Name not allowed"
  ),
  createTextValAndSanitizationChain(
    "lastName",
    "empty Family Name not allowed"
  ),
  createTextValAndSanitizationChain(
    "qualifications",
    "empty qualification not allowed"
  ),
  asyncHandler(async (req, res, next) => {
    const formData = matchedData(req);
    const errorsFromValidation = validationResult(req);
    // prepare form data for save
    const instructor = new Instructor({
      first_name: formData.firstName,
      last_name: formData.lastName,
      qualifications: formData.qualifications,
      _id: req.params.instructorid,
    });
    if (!errorsFromValidation.isEmpty()) {
      res.render("instructorForm", {
        title: "fix displayed errors and submit again",
        instructor: instructor,
        errors: errorsFromValidation.array(),
      });
    }
    //if valide data
    await Instructor.findByIdAndUpdate(req.params.instructorid, instructor);
    res.redirect(instructor.url + "/details");
  }),
];

// get  instructor delete form
exports.getDeleteInstructor = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.instructorid;
  const [instructor, instructorCourses] = await Promise.all([
    Instructor.findById(instructorId).exec(),
    Course.find({ instructor: instructorId }).exec(),
  ]);
  res.render("instructorDelete", {
    title: "Deleting Instructor Form ",
    instructor: instructor,
    instructorCourses: instructorCourses,
  });
});

//post instructor delete
exports.postDeleteInstructor = asyncHandler(async (req, res, next) => {
  const instructorId = req.params.instructorid;
  const password = req.body.password;
  const [instructor, instructorCourses] = await Promise.all([
    Instructor.findById(instructorId).exec(),
    Course.find({ instructor: instructorId }).exec(),
  ]);
  if (instructorCourses.notEmpty) {
    res.render("instructorDelete", {
      title: "Deleting Instructor Form ",
      instructor: instructor,
      instructorCourses: instructorCourses,
    });
    return;
  } else if (password === "addPass1") {
    await Instructor.findByIdAndRemove(instructorId);
    res.redirect("/instructors");
  } else {
    const error = "invalid password";
    res.render("instructorDelete", {
      title: "Deleting Instructor Form ",
      instructor: instructor,
      instructorCourses: instructorCourses,
      error: error,
    });
    return;
  }
});
