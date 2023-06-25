// import required  model modules
const Category = require("../models/CategoryModel");

//import express-async-handler to handle async error propagation
const asyncHandler = require("express-async-handler");
const Course = require("../models/CourseModel");

// get all categories on home page
exports.getIndex = asyncHandler(async (req, res, next) => {
  // find and load all categories from db
  const allCategories = await Category.find({}).exec();
  res.render("index", {
    title: "Courses Categories",
    categories: allCategories,
  });
});

// CRUD
// get form to create category
exports.getNewCategory = (req, res, next) => {
  res.send("Not yet categoryForm");
};

// save created category
exports.postNewCategory = asyncHandler(async (req, res, next) => {
  res.send(" Coming soon Some form to save ");
});

// get category courses
exports.getCategoryCourses = asyncHandler(async (req, res, next) => {
  //get category id  and category courses
  const [category, categoryCourses] = await Promise.all([
    Category.findById(req.params.categoryid).exec(),
    Course.find({ category: req.params.categoryid }).exec(),
  ]);

  if (category === null) {
    const error = new Error("category not found");
    error.status = 404;
    return next(error);
  }
  res.render("categoryCourses", {
    title: `${category.name} available courses`,
    category: category,
    courses: categoryCourses,
  });
});

//  get update category
exports.getUpdateCategory = asyncHandler(async (req, res, next) => {
  res.send("categoryUpdate get not yet");
});

// save category update
exports.postUpdateCategory = asyncHandler(async (req, res, next) => {
  res.send("categoryUpdate post not yet");
});

// get   a given category to delete
exports.getDeleteCategory = asyncHandler(async (req, res, next) => {
  res.send("category delete not yet");
});

//post a given categroy to delete
exports.postDeleteCategory = asyncHandler(async (req, res, next) => {
  res.send("categoryDelete post not yet");
});
