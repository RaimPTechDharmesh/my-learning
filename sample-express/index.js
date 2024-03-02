const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/', (req, res) => {
    console.log('req send ==>', req.body)

    if(req.body.userName === '1234' && req.body.passWord === 'admin'){
        res.send("Login Successful")
    } else {
        req.status(401);
        res.send("Login Failed")
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})