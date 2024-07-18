const tokenName = {
    LOGIN_TOKEN: "_token",
    OTP_TOKEN: "token"
}

let getToken = (key) => {
    return localStorage.getItem(key);
}

let setToken = (key, token) => {
    return localStorage.setItem(key, token);
}

const setValue = (key, value) => {
    return localStorage.setItem(key, value);
}

const getValue = (key) => {
    const modalToken = localStorage.getItem(key);
    // localStorage.removeItem(key)
    return modalToken
}


module.exports = {
    getToken,
    setToken,
    tokenName,
    setValue,
    getValue
}