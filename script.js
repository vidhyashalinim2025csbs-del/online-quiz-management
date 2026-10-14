```javascript
const API_URL = "http://localhost:3000";

const quizForm = document.getElementById("quizForm");
const result = document.getElementById("result");

quizForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const answers = [];

    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(
            'input[name="q' + i + '"]:checked'
        );

        if (!selected) {
            result.textContent = "Please answer all questions.";
            return;
        }

        const options = {
            q1: { a: 0, b: 1, c: 2 },
            q2: { a: 0, b: 1, c: 2 },
            q3: { a: 0, b: 1, c: 2 },
            q4: { a: 0, b: 1, c: 2 },
            q5: { a: 0, b: 1, c: 2 }
        };

        answers.push(options["q" + i][selected.value]);
    }

    try {
        const response = await fetch(API_URL + "/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ answers: answers })
        });

        if (!response.ok) {
            throw new Error("Unable to submit quiz.");
        }

        const data = await response.json();

        result.textContent =
            "Your Score: " + data.score + " / " + data.total;
    } catch (error) {
        result.textContent =
            "Backend not connected yet. We will set it up next!";
    }
});
```
