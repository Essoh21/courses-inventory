const express = require("express");
const categoryRouter = express.Router();

// import modes modules
const Category = require("../models/CategoryModel");
const Course = require("../models/CourseModel");
const Instrunctor = require("../models/InstructorModel");
