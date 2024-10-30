// script.js
const adafruitIoUrl = 'https://io.adafruit.com/api/v2/Jupac1053/feeds/led1';
const adafruitApiKey = 'aio_zvQA66eRQlTvYQODxGHtfDcosIAJ';
const feedIds = ['led1', 'led2', 'led3', 'led4'];

// Obten los elementos checkbox
const checkboxes = document.querySelectorAll('.checkbox input');

// Función para enviar datos a Adafruit IO
function sendToAdafruit(feedId, value) {
    const url = `${adafruitIoUrl}${adafruitApiKey}/feeds/${feedId}/data`;
    const data = { value: value ? 1 : 0 };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': adafruitApiKey,
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => console.log(`Enviado a ${feedId}: ${value}`))
    .catch((error) => console.error(`Error al enviar a ${feedId}: ${error}`));
}

// Agrega eventos a los checkboxes
checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
        const feedId = feedIds[index];
        const checked = checkbox.checked;
        sendToAdafruit(feedId, checked);
    });
});
