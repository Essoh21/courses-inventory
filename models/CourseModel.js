const mongoose = require("mongoose");
const { Schema } = mongoose;
const CourseSchema = new Schema({
  title: { type: String, maxLength: 100, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
});

//virtual for Course url
CourseSchema.virtual("url").get(function () {
  return `/category/course/${this._id}`;
});
// compile CourseSchema to a model   (this create collection with name Courses)
const CourseModel = mongoose.model("Course", CourseSchema);

module.exports = CourseModel;
