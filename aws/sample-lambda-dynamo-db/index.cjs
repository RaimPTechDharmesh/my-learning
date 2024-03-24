const  performLogin  = require('./login.cjs');

const handler = async (event) => {const {userName, password} = event;
    const result = performLogin(userName, password);
    const response = {
        statusCode: 200,
        body: result,
    };
    return response;
};

exports.handler = handler;