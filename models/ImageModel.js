const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
});

const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = ImageModel;
