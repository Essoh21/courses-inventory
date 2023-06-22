const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// virtual for cathegory url
CategorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

// export compiled Schema
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
