const express = require("express");
const router = express.Router();

const controller = require("../controllers/student.controller");
const validateObjectId = require("../middlewares/validateObjectId.middleware");

// IMPORTANT: Static routes must come BEFORE /:id to avoid Express treating them as id params

// 7. GET /api/students/top
router.get("/top", controller.getTopStudents);

// 8. GET /api/students/stats/avg
router.get("/stats/avg", controller.getAverageScore);

// 9. GET /api/students/search
router.get("/search", controller.searchStudents);

// 1. POST /api/students
router.post("/", controller.createStudent);

// 2. GET /api/students
router.get("/", controller.getAllStudents);

// 3. GET /api/students/:id
router.get("/:id", validateObjectId, controller.getStudentById);

// 4. PUT /api/students/:id
router.put("/:id", validateObjectId, controller.updateStudent);

// 5. DELETE /api/students/:id
router.delete("/:id", validateObjectId, controller.deleteStudent);

// 6. PATCH /api/students/:id/score
router.patch("/:id/score", validateObjectId, controller.updateScore);

module.exports = router;
