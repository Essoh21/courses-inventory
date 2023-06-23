const mongoose = require("mongoose");
const { Schema } = mongoose;

const InstructorSchema = new Schema({
  name: { type: String, required: true },
  qualifications: String,
  picture: { type: Schema.Types.ObjectId, ref: "Image" },
});

// virtual for Instructor url
InstructorSchema.virtual("url").get(function () {
  return `/course/instructor/${this._id}`;
});

const InstructorModel = mongoose.model("Instructor", InstructorSchema);

module.exports = InstructorModel;
