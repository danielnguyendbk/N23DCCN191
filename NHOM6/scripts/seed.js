require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("../src/models/student.model");

const students = [
  { studentId: "SV001", name: "Nguyen Van A", email: "a@student.com", score: 85, major: "IT" },
  { studentId: "SV002", name: "Tran Thi B", email: "b@student.com", score: 92, major: "Business" },
  { studentId: "SV003", name: "Le Van C", email: "c@student.com", score: 78, major: "Design" },
  { studentId: "SV004", name: "Pham Thi D", email: "d@student.com", score: 65, major: "Marketing" },
  { studentId: "SV005", name: "Hoang Van E", email: "e@student.com", score: 95, major: "IT" },
  { studentId: "SV006", name: "Nguyen Thi F", email: "f@student.com", score: 55, major: "Business" },
  { studentId: "SV007", name: "Do Van G", email: "g@student.com", score: 72, major: "Design" },
  { studentId: "SV008", name: "Bui Thi H", email: "h@student.com", score: 88, major: "IT" },
  { studentId: "SV009", name: "Vo Van I", email: "i@student.com", score: 45, major: "Marketing" },
  { studentId: "SV010", name: "Dang Thi J", email: "j@student.com", score: 99, major: "IT" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Student.deleteMany({});
    console.log("Cleared existing students");

    await Student.insertMany(students);
    console.log(`Seeded ${students.length} students successfully`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
};

seed();
