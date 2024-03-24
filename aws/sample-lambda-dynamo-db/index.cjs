const  performLogin  = require('./login.cjs');

const handler = async (event) => {
    console.log('from zip file');
    const {userName, password} = event;
    const result = performLogin(userName, password);
    const response = {
        statusCode: 200,
        body: result,
    };
    return response;
};

exports.handler = handler;