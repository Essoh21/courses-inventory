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
router.get("/category/:id/details", CategoryControllers.getCategoryDetails);

// get create category
router.get("/category/create", CategoryControllers.getNewCategory);

// POST new Category
router.post("/category/create", CategoryControllers.postNewCategory);

// GET update category
router.get("/category/:id/update", CategoryControllers.getUpdateCategory);

//POST update Category
router.post("/category/:id/update", CategoryControllers.postUpdateCategory);

//GET delete Category
router.get("/category/:id/delete", CategoryControllers.getDeleteCategory);
// POST delete Category
router.post("/category/:id/delete", CategoryControllers.postDeleteCategory);

module.exports = router;

// Course Routes

// get and display all course in a category
router.get("/category/:id/courses", CourseController.getCategoryCourses);

// get create course in a category
router.get(
  "/category/:id/course/create",
  CourseController.getCreateNewCategoryCourse
);

// POST new Course in a category
router.post(
  "/category/:id/course/create",
  CourseController.postCreateNewCategoryCourse
);

// get and display a course
router.get(
  "/category/:id/course/:id/details",
  CourseController.getCategoryCourseDetails
);

// GET update course
router.get(
  "/category/:id/course/:id/update",
  CourseController.getUpdateCategoryCourse
);

//POST update course
router.post(
  "/category/:id/course/:id/update",
  CourseController.postUpdateCategoryCourse
);

//GET delete Course
router.get(
  "/category/:id/course/:id/delete",
  CourseController.getDeleteCategoryCourse
);
// POST delete course
router.post(
  "/category/:id/course/:id/delete",
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
  "/instructor/:id/details",
  InstructorController.getInstructorDetails
);

// GET update instructor
router.get("/instructor/:id/update", InstructorController.getUpdateInstructor);

//POST update instructor
router.post(
  "/instructor/:id/update",
  InstructorController.postUpdateInstructor
);

//GET delete Instructor
router.get("/instructor/:id/delete", InstructorController.getDeleteInstructor);
// POST delete instructor
router.post(
  "/instructor/:id/delete",
  InstructorController.postDeleteInstructor
);

module.exports = router;
