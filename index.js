// Parse a radio button ID into a question number and value.
function parseId(id) {
    const [name, value] = id.split('-');
    return [parseInt(name.slice(1)), parseInt(value)];
}

const answers = [];
const radios = document.querySelectorAll('input[type=radio]');

for (const radio of radios) {
    radio.addEventListener('click', (event) => {
        const [question, value] = parseId(event.target.id);
        answers[question - 1] = value;
    });
}
