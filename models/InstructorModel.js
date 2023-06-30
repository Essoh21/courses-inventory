const mongoose = require("mongoose");
const { Schema } = mongoose;

const InstructorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  qualifications: String,
  pictureSrc: String,
});

// virtuals
// virtual for Instructor url
InstructorSchema.virtual("url").get(function () {
  return `/course/instructor/${this._id}`;
});
//virtual for name
InstructorSchema.virtual("name").get(function () {
  return `${this.first_name}  ${this.last_name}`;
});
const InstructorModel = mongoose.model("Instructor", InstructorSchema);

module.exports = InstructorModel;
