#! /usr/bin/env node

console.log(
  `This script populates some courses categories, 
    courses, images srcs and instructors in the  database. 
    Specified database as argument 
    - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"`
);

// Get arguments passed on command line
/* process.argv return an array of command line arguments passed
where runing a node script and elements at position 
0 and 1 are respectively absolute path of node executable and 
of the script being executed  */
const userArgs = process.argv.slice(2);

//import models
const Category = require("./models/CategoryModel");
const Instructor = require("./models/InstructorModel");
const Course = require("./models/CourseModel");
const Image = require("./models/ImageModel");

const path = require("path");

const publicFolderPath = path.join(__dirname, "public", "images");

const mathCourseImg = path.join(publicFolderPath, "math.jpg");
const RichardFeynman = path.join(publicFolderPath, "richardFeynman.jpg");
const webdevImage = path.join(publicFolderPath, "webDev.png");
const webdevCourse = path.join(publicFolderPath, "web-dev.png");
const financeImage = path.join(publicFolderPath, "finance.jpg");
/* //import some Images from public folder
const mathCourseImg = require("./public/images/math.jpg");
const RichardFeynman = require("./public/images/richardFeynman.jpg");
const webdevImage = require("./public/images/webDev.png");
const webdevCourse = require("./public/images/web-dev.png");
const financeImage = require("./public/images/finance.jpg");
 */

const categories = [];
const instructors = [];
const courses = [];
const images = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createInstructors();
  await createImages();
  await createCourses();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createCategory(name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function createInstructor(first_name, family_name, qualifications) {
  const instructorDetails = {
    first_name: first_name,
    last_name: family_name,
  };
  if (qualifications != false)
    instructorDetails.qualifications = qualifications;

  const instructor = new Instructor(instructorDetails);

  await instructor.save();
  instructors.push(instructor);
  console.log(`Added instructor: ${first_name} ${family_name}`);
}

async function createCourse(
  title,
  description,
  category,
  price,
  instructor,
  img
) {
  const courseDetail = {
    title: title,
    description: description,
    category,
    category,
    price: price,
    instructor: instructor,
    img: img,
  };

  const course = new Course(courseDetail);
  await course.save();
  courses.push(course);
  console.log(`Added course: ${title}`);
}

async function createImage(src, alt) {
  const imageDetails = {
    src: src,
    alt: alt,
  };

  const image = new Image(imageDetails);
  await image.save();
  images.push(image);
  console.log(`Added image: ''}`);
}

async function createImages() {
  console.log("Adding images ");
  await Promise.all([
    createImage(RichardFeynman, "Richard Feynman"),
    createImage(webdevCourse, "web development"),
    createImage(webdevImage, "development category"),
    createImage(financeImage, "finance category"),
    createImage(mathCourseImg, "math course"),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    createCategory(
      "Finance",
      "This category contains anything you must know in the domaine of finance "
    ),
    createCategory(
      "Mathematics",
      "This contains anything you must know about mathematics and how they are used in the real world"
    ),
  ]);
}

async function createInstructors() {
  console.log("Adding instructors");
  await Promise.all([
    createInstructor(
      "Richard",
      "Feynman",
      "a God of Maths, physics and anything related to knowledge"
    ),
    createInstructor("James", "Padolsey", "author and software develope"),
    createInstructor("anthon", "Spraul", "author and programmer"),
  ]);
}

async function createCourses() {
  console.log("Adding courses");
  await Promise.all([
    createCourse(
      "node novice to ninja",
      "Here you are going to learn everything from the begining and become a real node ninja ",
      categories[0],
      0,
      instructors[0],
      images[0]
    ),
    createCourse(
      "Math for computer science ",
      "in this course you are going to learn any maths required to make you better programmer ",
      categories[1],
      0,
      instructors[0],
      images[1]
    ),
  ]);
}
