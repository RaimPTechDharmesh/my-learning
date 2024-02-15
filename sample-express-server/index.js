const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello World")
});

app.put('/', (req, res) => {
    res.send("PUT Request Called")
});
app.delete('/', (req, res) => {
    res.send("DELETE Request Called")
});
app.post('/', (req, res) => {
    res.send("POST Request Called")
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

