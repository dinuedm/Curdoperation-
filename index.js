const express = require('express');
const logger = require('./logger'); // Import the logger middleware

const app = express();
const dotenv = require('dotenv');

app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;
app.use(logger); // Use the logger middleware for all routes

let students = [];

// Create (Add) a student
app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send('Student added successfully');
});

// Read (Retrieve) a student by ID
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

// Update a student's information
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        const updatedInfo = req.body;
        Object.assign(student, updatedInfo);
        res.send('Student updated successfully');
    } else {
        res.status(404).send('Student not found');
    }
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.send('Student deleted successfully');
    } else {
        res.status(404).send('Student not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
