const weatherForm = document.querySelector('form');
const searchInput = weatherForm.querySelector('input');

const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchInput.value;

    msg1.textContent = 'Loading...';
    msg2.textContent = '';

    fetch('./weather?address=' + location).then((resp) => {
        resp.json().then((data) => {
            if (data.error) return msg1.textContent = data.error;

            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
        });
    });
});