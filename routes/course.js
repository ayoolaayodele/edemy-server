const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

// middleware
const { requireSignin, isInstructor } = require("../middleware");

// controllers
const {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
  removeLesson,
  updateLesson,
  publishCourse,
  unpublishCourse,
  courses,
  checkEnrollment,
  freeEnrollment,
  paidEnrollment,
} = require("../controllers/course");

//get-routes
router.get("/courses", courses);

router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);
// course
router.post("/course", requireSignin, isInstructor, create);
router.get("/course/:slug", read);
router.put("/course/:slug", requireSignin, update);
router.post(
  "/course/video-upload/:instructorId",
  requireSignin,
  formidable(),
  uploadVideo
);
router.post("/course/video-remove/:instructorId", requireSignin, removeVideo);

// publish course
router.put("/course/publish/:courseId", requireSignin, publishCourse);
// unpublish course
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);

//We dont need the formData because we are receiving jsonData here
router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);

router.put("/course/lesson/:slug/:instructorId", requireSignin, updateLesson);

router.put("/course/:slug/:lessonId", requireSignin, removeLesson);

router.get("/check-enrollment/:courseId", requireSignin, checkEnrollment);

// enrollment
router.post("/free-enrollment/:courseId", requireSignin, freeEnrollment);
router.post("/paid-enrollment/:courseId", requireSignin, paidEnrollment);

module.exports = router;
