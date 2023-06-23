// import  required modules from models
const Course = require("../models/CourseModel");
const Instructor = require("../models/InstructorModel");

// import express-asyn-handler to handle error propagation when loading async files
const asyncHandler = require("express-async-handler");

// get all instructors

exports.getInstructors = asyncHandler(async (req, res, next) => {
  res.send("all instructors ");
});

// CRUD
// get form to create Instructor
exports.getCreateNewInstructor = (req, res, next) => {
  res.send("Create new instrunctor");
};

// save created instructor
exports.postCreateNewInstructor = asyncHandler(async (req, res, next) => {
  res.send(" post new instructor");
});

// get instructor details
exports.getInstructorDetails = asyncHandler(async (req, res, next) => {
  res.send("details instructor");
});

//  get update Instructor
exports.getUpdateInstructor = asyncHandler(async (req, res, next) => {
  res.send("get update instructor");
});

// save Instructor update
exports.postUpdateInstructor = asyncHandler(async (req, res, next) => {
  res.send("post update instructor");
});

// get  instructor delete form
exports.getDeleteInstructor = asyncHandler(async (req, res, next) => {
  res.send("get instructor delete");
});

//post instructor delete
exports.postDeleteInstructor = asyncHandler(async (req, res, next) => {
  res.send("post instructor delete");
});
