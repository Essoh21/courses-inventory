// import required  model modules
const Category = require("../models/CategoryModel");
const Course = require("../models/CourseModel");

//import express-async-handler to handle async error propagation
const asyncHandler = require("express-async-handler");
//import matchedData, body and validationResult from express-validator module
const { body, matchedData, validationResult } = require("express-validator");

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
  res.render("categoryForm", {
    title: "New Category Form",
  });
};

// save created category
// create some validation chains
const createTextvalAndSanitizationChain = (property, errorText) => {
  return body(`${property}`, `${errorText}`).trim().notEmpty().escape();
};
exports.postNewCategory = [
  createTextvalAndSanitizationChain("name", "name must not be empty"),
  createTextvalAndSanitizationChain(
    "description",
    "empty description not allowed"
  ),
  asyncHandler(async (req, res, next) => {
    const errorsFromValidation = validationResult(req);
    const data = matchedData(req);
    //create a new category with user inputed data
    const category = new Category({
      name: data.name,
      description: data.description,
    });
    //if there is an error in validation, send back the form with errors highlighted:
    if (!errorsFromValidation.isEmpty()) {
      res.render("categoryForm", {
        title: "Fix errors to create category",
        category: category,
        errors: errorsFromValidation.array(),
      });
    }
    // if there is no error in validation and sanitization
    await category.save(); // save the category to the database
    res.redirect(category.url + "/courses");
  }),
];

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
  const categoryId = req.params.categoryid;
  const category = await Category.findById(categoryId).exec();
  //return error when the category is not found
  if (category === null) {
    const error = new Error("category not found");
    error.status = 404;
    return next(error);
  }

  //else
  res.render("categoryForm", {
    title: "Form to Update category",
    category: category,
  });
});

// save category update
exports.postUpdateCategory = [
  createTextvalAndSanitizationChain("name", "name must not be empty"),
  createTextvalAndSanitizationChain(
    "description",
    "empty description not allowed"
  ),
  asyncHandler(async (req, res, next) => {
    const errorsFromValidation = validationResult(req);
    const data = matchedData(req);
    //create a new category with user updated data and old id
    const category = new Category({
      name: data.name,
      description: data.description,
      _id: req.params.categoryid,
    });
    //if there is an error in validation, send back the form with errors highlighted:
    if (!errorsFromValidation.isEmpty()) {
      res.render("categoryForm", {
        title: "Fix errors to create category",
        category: category,
        errors: errorsFromValidation.array(),
      });
    }
    // if there is no error in validation and sanitization
    await Category.findByIdAndUpdate(req.params.categoryid, category); // save the category to the database
    res.redirect(category.url + "/courses");
  }),
];

// get   a given category to delete
exports.getDeleteCategory = asyncHandler(async (req, res, next) => {
  const [category, categoryCourses] = await Promise.all([
    Category.findById(req.params.categoryid).exec(),
    Course.find({ category: req.params.categoryid }).exec(),
  ]);
  const categoryIsNotFound = category === null;
  if (categoryIsNotFound) {
    res.redirect("index");
  }
  res.render("categoryDelete", {
    title: "Delete category",
    category: category,
    categoryAllCourses: categoryCourses,
  });
});

//post a given categroy to delete
exports.postDeleteCategory = asyncHandler(async (req, res, next) => {
  const [category, categoryCourses] = await Promise.all([
    Category.findById(req.params.categoryid).exec(),
    Course.find({ category: req.params.categoryid }).exec(),
  ]);
  if (categoryCourses.length > 0) {
    res.render("categoryDelete", {
      title: "Delete category",
      category: category,
      categoryAllCourses: categoryCourses,
    });
    return;
  } else {
    await Category.findByIdAndRemove(req.params.categoryid);
    res.redirect("/");
  }
});
