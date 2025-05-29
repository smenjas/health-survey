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
        localStorage.setItem('answers', JSON.stringify(answers));
    });
}
