const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Add student data
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            message: "Student data saved successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving student data",
            error: error.message
        });
    }
});

// Get student data
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching student data",
            error: error.message
        });
    }
});

module.exports = router;