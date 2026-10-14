
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const questions = [
    {
        id: 1,
        question: "Which language is used for object-oriented programming?",
        options: ["HTML", "Java", "CSS"],
        answer: 1
    },
    {
        id: 2,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Main Language"
        ],
        answer: 0
    },
    {
        id: 3,
        question: "Which is a database management system?",
        options: ["MySQL", "HTML", "CSS"],
        answer: 0
    },
    {
        id: 4,
        question: "Which symbol ends a Java statement?",
        options: [":", ",", ";"],
        answer: 2
    },
    {
        id: 5,
        question: "Which technology styles web pages?",
        options: ["Java", "CSS", "SQL"],
        answer: 1
    }
];

// Home route
app.get("/", (req, res) => {
    res.send("Online Quiz Management System Backend is Running!");
});

// Get quiz questions without revealing answers
app.get("/api/questions", (req, res) => {
    const publicQuestions = questions.map(({ answer, ...question }) => question);
    res.json(publicQuestions);
});

// Submit quiz answers and calculate score
app.post("/api/submit", (req, res) => {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
        return res.status(400).json({
            message: "Please submit an array of answers."
        });
    }

    let score = 0;

    questions.forEach((question, index) => {
        if (answers[index] === question.answer) {
            score++;
        }
    });

    res.json({
        message: "Quiz submitted successfully!",
        score: score,
        total: questions.length
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

