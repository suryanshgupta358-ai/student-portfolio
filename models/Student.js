const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    course: { type: String, required: true },
    college: { type: String, required: true },
    about: { type: String },
    skills: { type: [String], required: true }
});

// This line prevents Mongoose from caching old models
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

module.exports = Student;