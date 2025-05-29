// Binary ascending
function a2(value) {
    switch (value) {
    case 1: return 0;
    case 2: return 100;
    }
}

// Ternary ascending
function a3(value) {
    switch (value) {
    case 1: return 0;
    case 2: return 50;
    case 3: return 100;
    }
}

// Quinary ascending
function a5(value) {
    switch (value) {
    case 1: return 0;
    case 2: return 25;
    case 3: return 50;
    case 4: return 75;
    case 5: return 100;
    }
}

// Quinary descending
function d5(value) {
    switch (value) {
    case 1: return 100;
    case 2: return 75;
    case 3: return 50;
    case 4: return 25;
    case 5: return 0;
    }
}

// Senary ascending
function a6(value) {
    switch (value) {
    case 1: return 0;
    case 2: return 20;
    case 3: return 40;
    case 4: return 60;
    case 5: return 80;
    case 6: return 100;
    }
}

// Senary descending
function d6(value) {
    switch (value) {
    case 1: return 100;
    case 2: return 80;
    case 3: return 60;
    case 4: return 40;
    case 5: return 20;
    case 6: return 0;
    }
}

function scoreSurvey(answers) {
    const rubrics = [
        d5, // Question 1
        d5, // Question 2
        a3, // Question 3
        a3, // Question 4
        a3, // Question 5
        a3, // Question 6
        a3, // Question 7
        a3, // Question 8
        a3, // Question 9
        a3, // Question 10
        a3, // Question 11
        a3, // Question 12
        a2, // Question 13
        a2, // Question 14
        a2, // Question 15
        a2, // Question 16
        a2, // Question 17
        a2, // Question 18
        a2, // Question 19
        d5, // Question 20
        d6, // Question 21
        d5, // Question 22
        d6, // Question 23
        a6, // Question 24
        a6, // Question 25
        d6, // Question 26
        d6, // Question 27
        a6, // Question 28
        a6, // Question 29
        d6, // Question 30
        a6, // Question 31
        a5, // Question 32
        a5, // Question 33
        d5, // Question 34
        a5, // Question 35
        d5, // Question 36
    ];
    const scores = [];
    for (const index in rubrics) {
        if (answers[index] === undefined) {
            continue;
        }
        const rubric = rubrics[index];
        scores[index] = rubric(answers[index]);
    }
    return scores;
}

// Parse a radio button ID into a question number and value.
function parseId(id) {
    const [name, value] = id.split('-');
    return [parseInt(name.slice(1)), parseInt(value)];
}

const answers = JSON.parse(localStorage.getItem('answers')) || [];

// Restore answers after reloading the page.
for (const index in answers) {
    const question = parseInt(index) + 1;
    const answer = answers[index];
    document.getElementById(`q${question}-${answer}`).checked = true;
}

const radios = document.querySelectorAll('input[type=radio]');

for (const radio of radios) {
    radio.addEventListener('click', (event) => {
        const [question, value] = parseId(event.target.id);
        answers[question - 1] = value;
        const scores = scoreSurvey(answers);
        localStorage.setItem('answers', JSON.stringify(answers));
    });
}
