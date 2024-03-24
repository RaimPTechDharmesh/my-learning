const handler = require('./index.cjs').handler;

const AWS = require('aws-sdk');

// Replace with your actual AWS region
const region = 'us-east-2';

AWS.config.update({
    region,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'Dharmesh-User';
const localRun = async () => {
    const params = {
        TableName: tableName,
        Key: {
            userName: 'admin1'
        }
    };


    try {
        const data = await docClient.get(params).promise();
        const loginSuccessResponse = await handler({userName: data.Item?.userName, password: data.Item?.password });
        console.log(loginSuccessResponse);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
localRun();