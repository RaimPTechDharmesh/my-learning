const express = require('express')
const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/localDb');
const UserModel = mongoose.model('users', new Schema({ userName: String, password:String }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/', async (req, res) => {

    const response = await UserModel.findOne({ userName: req.body.userName, password: req.body.password });


    if(response){
        res.send("Login Successful")
    } else {
        res.status(401);
        res.send("Login Failed")
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})