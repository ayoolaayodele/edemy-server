//This we store all the completed course status
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const completedSchema = new mongoose.Schema(
  // Each completed document must have the user, course and lessons array
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    course: {
      type: ObjectId,
      ref: "Course",
    },
    lessons: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Completed", completedSchema);
