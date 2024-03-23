const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const AWS = require('aws-sdk');

// Replace with your actual AWS region
const region = 'us-east-2';

// Configure DynamoDB with environment variables (assuming they are set)
AWS.config.update({
    region,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);


const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'Dharmesh-User';

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/', async (req, res) => {
    const { userName, password } = req.body;
    const params = {
        TableName: tableName,
        Key: {
            userName
        }
    };


    try {
        const data = await docClient.get(params).promise();
        if (data.Item?.userName === password) {
            res.json('log in successful');
        } else {
            res.status(401).send('log in failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})