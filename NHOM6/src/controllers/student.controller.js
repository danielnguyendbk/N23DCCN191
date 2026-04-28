const studentService = require("../services/student.service");

// 1. POST /api/students
const createStudent = async (req, res, next) => {
  try {
    const { studentId, name, email, score, major } = req.body;

    if (!studentId || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "studentId, name, and email are required",
      });
    }

    if (score !== undefined && (typeof score !== "number" || score < 0 || score > 100)) {
      return res.status(400).json({
        success: false,
        message: "score must be a number between 0 and 100",
      });
    }

    const validMajors = ["IT", "Business", "Design", "Marketing"];
    if (major && !validMajors.includes(major)) {
      return res.status(400).json({
        success: false,
        message: "major must be one of: IT, Business, Design, Marketing",
      });
    }

    const student = await studentService.createStudent({ studentId, name, email, score, major });

    return res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }
    next(error);
  }
};

// 2. GET /api/students
const getAllStudents = async (req, res, next) => {
  try {
    const { page, limit, major } = req.query;
    const result = await studentService.getAllStudents({ page, limit, major });

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// 3. GET /api/students/:id
const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// 4. PUT /api/students/:id
const updateStudent = async (req, res, next) => {
  try {
    const { name, email, score, major } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;

    if (score !== undefined) {
      if (typeof score !== "number" || score < 0 || score > 100) {
        return res.status(400).json({
          success: false,
          message: "score must be a number between 0 and 100",
        });
      }
      updateData.score = score;
    }

    const validMajors = ["IT", "Business", "Design", "Marketing"];
    if (major !== undefined) {
      if (!validMajors.includes(major)) {
        return res.status(400).json({
          success: false,
          message: "major must be one of: IT, Business, Design, Marketing",
        });
      }
      updateData.major = major;
    }

    const student = await studentService.updateStudent(req.params.id, updateData);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "email already exists" });
    }
    next(error);
  }
};

// 5. DELETE /api/students/:id
const deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    return res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// 6. PATCH /api/students/:id/score
const updateScore = async (req, res, next) => {
  try {
    const { score } = req.body;

    if (score === undefined || typeof score !== "number" || score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: "score must be a number between 0 and 100",
      });
    }

    const student = await studentService.updateScore(req.params.id, score);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// 7. GET /api/students/top
const getTopStudents = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const students = await studentService.getTopStudents(limit);
    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

// 8. GET /api/students/stats/avg
const getAverageScore = async (req, res, next) => {
  try {
    const stats = await studentService.getAverageScore();
    return res.status(200).json({ success: true, ...stats });
  } catch (error) {
    next(error);
  }
};

// 9. GET /api/students/search
const searchStudents = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
    }

    const students = await studentService.searchStudents(q.trim());
    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  updateScore,
  getTopStudents,
  getAverageScore,
  searchStudents,
};
