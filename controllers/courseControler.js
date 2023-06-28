// import  required modules from models
const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");
const Instructor = require("../models/InstructorModel");

// import express-asyn-handler to handle error propagation when loading async files
const asyncHandler = require("express-async-handler");
// import validation modules from express-validator
const { check, matchedData, validationResult } = require("express-validator");

// CRUD
// get form to create Course in a category
exports.getCreateNewCategoryCourse = asyncHandler(async (req, res, next) => {
  const [categories, instructors] = await Promise.all([
    Category.find({}).exec(),
    Instructor.find({}).exec(),
  ]);
  res.render("categoryCourseForm", {
    title: "Create new Course",
    categories: categories,
    instructors: instructors,
  });
});

// save created category Course
/* some functions that return middleware function for validation and sanitization */
const createTextValAndSanitizationChain = (inputName) => {
  return check(`${inputName}`)
    .trim()
    .notEmpty()
    .withMessage("empty text not allowed ")
    .escape();
};
const createNumValAndSanitizationChain = (inputName, errorMessage) => {
  return check(`${inputName}`, `${errorMessage}`)
    .trim()
    .notEmpty()
    .withMessage("Empty text not allowed for title and description")
    .isLength({ max: 5 })
    .withMessage("price must be at most 5 digit")
    .isNumeric()
    .withMessage("price must be a number")
    .escape();
};
exports.postCreateNewCategoryCourse = [
  createTextValAndSanitizationChain("title", "invalid title"),
  createTextValAndSanitizationChain("description", "invalid description"),
  createNumValAndSanitizationChain("price", "invalid price"),
  asyncHandler(async (req, res, next) => {
    const errorsFromValidation = validationResult(req);
    const data = matchedData(req);
    //get all categories and instructors
    const [instructors, categories] = await Promise.all([
      Instructor.find({}).exec(),
      Category.find({}).exec(),
    ]);
    // create the course
    const course = new Course({
      title: data.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      instructor: req.body.instructor,
    });
    if (!errorsFromValidation.isEmpty()) {
      res.render("categoryCourseForm", {
        title: "fix errors below  and submit again",
        course: course,
        errors: errorsFromValidation.array(),
        instructors: instructors,
        categories: categories,
      });
    }
    // if data is save
    await course.save();
    res.redirect(course.url + "/details");
  }),
];

// get category coures details
exports.getCategoryCourseDetails = asyncHandler(async (req, res, next) => {
  res.send("details on category course");
});

//  get update category course
exports.getUpdateCategoryCourse = asyncHandler(async (req, res, next) => {
  res.send("categoryCourseUpdate get not yet");
});

// save category course update
exports.postUpdateCategoryCourse = asyncHandler(async (req, res, next) => {
  res.send("categoryCourseUpdate post not yet");
});

// get   a given category course to delete
exports.getDeleteCategoryCourse = asyncHandler(async (req, res, next) => {
  res.send("category course delete not yet");
});

//post a given categroy course to delete
exports.postDeleteCategoryCourse = asyncHandler(async (req, res, next) => {
  res.send("categoryCourseDelete post not yet");
});
