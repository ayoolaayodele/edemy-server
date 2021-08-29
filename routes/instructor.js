const express = require("express");

const router = express.Router();

// middleware
const { requireSignin } = require("../middleware/index");

// controllers
const {
  makeInstructor,
  getAccountStatus,
  currentInstructor,
  instructorCourses,
} = require("../controllers/instructors");

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, currentInstructor);

router.get("/instructor-courses", requireSignin, instructorCourses);

module.exports = router;
