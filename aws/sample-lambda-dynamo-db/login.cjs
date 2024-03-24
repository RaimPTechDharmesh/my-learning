module.exports = function performLogin(userName, password) {
    if (isValidUser(userName, password)) {
        return "Login Successful";
    } else {
        return "Login Failed";
    }
}

function isValidUser(userName, password) {
    if (userName === 'admin' && password === 'admin') {
        return true;
    } else {
        return false;
    }
}