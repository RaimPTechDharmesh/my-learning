const express = require('express')
const app = express()
const port = 3000
const {login} = require('./login');

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', login);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})