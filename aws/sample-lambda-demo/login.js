const login = (req, res) => {
    console.log('req send ==>', req.body)

    const {userName, password} = req.body;
    const result = performLogin(userName, password);
    res.send(result);
}

const performLogin = (userName, password) => {
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

module.exports = {
    login, performLogin
}