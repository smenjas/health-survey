const categories = {
    'Physical functioning': {
        mean: 70.61,
        sd: 27.42,
        questions: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    'Role limitations due to physical health': {
        mean: 52.97,
        sd: 40.78,
        questions: [13, 14, 15, 16]
    },
    'Role limitations due to emotional problems': {
        mean: 65.78,
        sd: 40.71,
        questions: [17, 18, 19]
    },
    'Energy/fatigue': {
        mean: 52.15,
        sd: 22.39,
        questions: [23, 27, 29, 31]
    },
    'Emotional well-being': {
        mean: 70.38,
        sd: 21.97,
        questions: [24, 25, 26, 28, 30]
    },
    'Social functioning': {
        mean: 78.77,
        sd: 25.43,
        questions: [20, 32]
    },
    'Pain': {
        mean: 70.77,
        sd: 25.46,
        questions: [21, 22]
    },
    'General health': {
        mean: 56.99,
        sd: 21.11,
        questions: [1, 33, 34, 35, 36]
    }
};

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

function selectScores(questions, scores) {
    const selection = [];
    for (const question of questions) {
        const index = question - 1;
        selection.push(scores[index]);
    }
    return selection;
}

function computeMean(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

function averageScores(scores) {
    const averages = {};
    for (const category in categories) {
        const questions = categories[category].questions;
        averages[category] = computeMean(selectScores(questions, scores));
    }
    return averages;
}

function renderResults(averages) {
    let html = '';
    for (const category in averages) {
        const average = averages[category].toFixed(0).toLocaleString();
        if (isNaN(average)) {
            html += `<p>${category}: not enough data.</p>`;
            continue;
        }
        const mean = categories[category].mean;
        let how = (average === mean) ? 'exactly' :
            (average > mean) ? 'better than' : 'worse than';
        if (Math.abs(mean - average) > categories[category].sd) {
            how = 'much ' + how;
        }
        html += `<p>${category}: ${average}, which is ${how} average.</p>`;
    }
    return html;
}

function updateResults(answers) {
    const scores = scoreSurvey(answers);
    const averages = averageScores(scores);
    document.getElementById('results').innerHTML = renderResults(averages);
}

// Parse a radio button ID into a question number and value.
function parseId(id) {
    const [name, value] = id.split('-');
    return [parseInt(name.slice(1)), parseInt(value)];
}

const answers = JSON.parse(localStorage.getItem('answers')) || [];
updateResults(answers);

// Restore answers after reloading the page.
for (const index in answers) {
    const answer = answers[index];
    if (answer === null) {
        continue;
    }
    const question = parseInt(index) + 1;
    document.getElementById(`q${question}-${answer}`).checked = true;
}

const radios = document.querySelectorAll('input[type=radio]');

for (const radio of radios) {
    radio.addEventListener('click', (event) => {
        const [question, value] = parseId(event.target.id);
        answers[question - 1] = value;
        updateResults(answers);
        localStorage.setItem('answers', JSON.stringify(answers));
    });
}
