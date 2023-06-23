// import  required modules from models
const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");
const Instructor = require("../models/InstructorModel");

// import express-asyn-handler to handle error propagation when loading async files
const asyncHandler = require("express-async-handler");

// get all courses of a given category

exports.getCategoryCourses = asyncHandler(async (req, res, next) => {
  res.send("category courses not available yet ");
});

// CRUD
// get form to create Course in a category
exports.getCreateNewCategoryCourse = (req, res, next) => {
  res.send("Create category new course");
};

// save created category Course
exports.postCreateNewCategoryCourse = asyncHandler(async (req, res, next) => {
  res.send(" post category course ");
});

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
