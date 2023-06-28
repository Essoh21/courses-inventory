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

// get category course details
exports.getCategoryCourseDetails = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseid;
  const course = await Course.findById(courseId)
    .populate("category")
    .populate("instructor")
    .exec();
  if (course === null) {
    const error = new Error("course not found");
    error.status = 404;
    return next(error);
  }
  //if the course is found then:
  res.render("courseDetails", { course: course });
});

//  get update category course
exports.getUpdateCategoryCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseid;
  const [course, categories, instructors] = await Promise.all([
    Course.findById(courseId).exec(),
    Category.find({}).exec(),
    Instructor.find({}).exec(),
  ]);
  res.render("categoryCourseForm", {
    title: "Form to update the course",
    categories: categories,
    instructors: instructors,
    course: course,
  });
});

// save category course update
exports.postUpdateCategoryCourse = [
  // use functions defined in creation section
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
      _id: req.params.courseid, //use the old id
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
    // if data is safe
    await Course.findByIdAndUpdate(req.params.courseid, course);
    res.redirect(course.url + "/details");
  }),
];

// get   a given category course to delete
exports.getDeleteCategoryCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseid;
  const course = await Course.findById(courseId)
    .populate("category")
    .populate("instructor")
    .exec();
  res.render("courseDelete", {
    title: "Deleting course",
    course: course,
  });
});

//post a given categroy course to delete
exports.postDeleteCategoryCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseid;
  await Course.findByIdAndRemove(courseId).exec();
  res.redirect("/");
});
