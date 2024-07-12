const tokenName = {
    LOGIN_TOKEN:"_token",
    OTP_TOKEN:"token"
}

let getToken = (key) => {
    return localStorage.getItem(key);
}

let setToken = (key,token) => {
    return localStorage.setItem(key, token);
}

module.exports = {
    getToken,
    setToken,
    tokenName
}