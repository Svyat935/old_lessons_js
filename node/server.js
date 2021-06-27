const express = require('express');
const app = express()

const PORT = 3000;
const answers = [
    'А ну иди сюда, ублюдок, мать твою!',
    'Да',
    'Нет',
    'Может быть',
    'Привет',
    'Скорее всего нет',
    '?',
    'Угу'
]

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get("/answer", function (request, response) {
    response.send(">> " + request.query.message + "\n" + "<<" + answers[Math.floor(Math.random() * answers.length)]);
})
app.listen(PORT);