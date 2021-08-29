const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//Lesson schema is a part of course because each course will have many lessons
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    //We will be creating user friendly slug based on its titlt
    slug: {
      type: String,
      lowercase: true,
    },
    //We accept all kinds of content
    content: {
      type: {},
      minlength: 200,
    },
    //Because of the response we will be getting from s3, which is
    //URL and key
    video: {},
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      minlength: 200,
      required: true,
    },
    price: {
      type: Number,
      default: 9.99,
    },
    //So we can save image object we get from s3 such as key, location
    image: {},
    category: String,
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", courseSchema);
