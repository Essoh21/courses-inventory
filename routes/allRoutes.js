const express = require("express");
const router = express.Router();

// CATEGORY Routes

//import controllers
const CategoryControllers = require("../controllers/categoryController");
const CourseController = require("../controllers/courseControler");
const InstructorController = require("../controllers/instructorController");

// get and display all categories
router.get("/", CategoryControllers.getIndex);

// get and display a category
router.get(
  "/category/:categoryid/courses",
  CategoryControllers.getCategoryCourses
);

// get create category
router.get("/category/create", CategoryControllers.getNewCategory);

// POST new Category
router.post("/category/create", CategoryControllers.postNewCategory);

// GET update category
router.get(
  "/category/:categoryid/update",
  CategoryControllers.getUpdateCategory
);

//POST update Category
router.post(
  "/category/:categoryid/update",
  CategoryControllers.postUpdateCategory
);

//GET delete Category
router.get(
  "/category/:categoryid/delete",
  CategoryControllers.getDeleteCategory
);
// POST delete Category
router.post(
  "/category/:categoryid/delete",
  CategoryControllers.postDeleteCategory
);

module.exports = router;

// Course Routes

// get and display all course in a category
router.get(
  "/category/:categoryid/courses",
  CourseController.getCategoryCourses
);

// get create course in a category
router.get(
  "/category/:categoryid/course/create",
  CourseController.getCreateNewCategoryCourse
);

// POST new Course in a category
router.post(
  "/category/:categoryid/course/create",
  CourseController.postCreateNewCategoryCourse
);

// get and display a course
router.get(
  "/category/course/:courseid/details",
  CourseController.getCategoryCourseDetails
);

// GET update course
router.get(
  "/category/:categoryid/course/:courseid/update",
  CourseController.getUpdateCategoryCourse
);

//POST update course
router.post(
  "/category/course/:courseid/update",
  CourseController.postUpdateCategoryCourse
);

//GET delete Course
router.get(
  "/category/:categoryid/course/:courseid/delete",
  CourseController.getDeleteCategoryCourse
);
// POST delete course
router.post(
  "/category/:categoryid/course/:courseid/delete",
  CourseController.postDeleteCategoryCourse
);

// Instructor Routes

// get and display instructors
router.get("/instructors", InstructorController.getInstructors);

// get create Instructor
router.get("/instructor/create", InstructorController.getCreateNewInstructor);

// POST new instructor
router.post("/instructor/create", InstructorController.postCreateNewInstructor);

// display instructor details
router.get(
  "/instructor/:instructorid/details",
  InstructorController.getInstructorDetails
);

// GET update instructor
router.get(
  "/instructor/:instructorid/update",
  InstructorController.getUpdateInstructor
);

//POST update instructor
router.post(
  "/instructor/:instructorid/update",
  InstructorController.postUpdateInstructor
);

//GET delete Instructor
router.get(
  "/instructor/:instructorid/delete",
  InstructorController.getDeleteInstructor
);
// POST delete instructor
router.post(
  "/instructor/:instructorid/delete",
  InstructorController.postDeleteInstructor
);

module.exports = router;
