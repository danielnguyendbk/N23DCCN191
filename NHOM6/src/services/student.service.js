const Student = require("../models/student.model");

// 1. Create student
const createStudent = async (data) => {
  const student = new Student(data);
  return await student.save();
};

// 2. Get all students with pagination and filter
const getAllStudents = async ({ page = 1, limit = 10, major }) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const filter = { isActive: true };
  if (major) filter.major = major;

  const [data, total] = await Promise.all([
    Student.find(filter).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
    Student.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

// 3. Get student by id
const getStudentById = async (id) => {
  return await Student.findOne({ _id: id, isActive: true });
};

// 4. Update student
const updateStudent = async (id, data) => {
  return await Student.findOneAndUpdate(
    { _id: id, isActive: true },
    { $set: data },
    { new: true, runValidators: true }
  );
};

// 5. Soft delete student
const deleteStudent = async (id) => {
  return await Student.findOneAndUpdate(
    { _id: id, isActive: true },
    { $set: { isActive: false } },
    { new: true }
  );
};

// 6. Update score only
const updateScore = async (id, score) => {
  return await Student.findOneAndUpdate(
    { _id: id, isActive: true },
    { $set: { score } },
    { new: true, runValidators: true }
  );
};

// 7. Get top students by score
const getTopStudents = async (limit = 5) => {
  return await Student.find({ isActive: true })
    .sort({ score: -1 })
    .limit(parseInt(limit));
};

// 8. Get average score stats
const getAverageScore = async () => {
  const result = await Student.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        averageScore: { $avg: "$score" },
        totalStudents: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0) return { averageScore: 0, totalStudents: 0 };

  return {
    averageScore: parseFloat(result[0].averageScore.toFixed(2)),
    totalStudents: result[0].totalStudents,
  };
};

// 9. Search students by name
const searchStudents = async (q) => {
  return await Student.find({
    isActive: true,
    name: { $regex: q, $options: "i" },
  });
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
