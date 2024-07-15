import { getToken, tokenName, setToken } from '@/dataCenter/LocalStorage';
import axios from 'axios';
import Validator from 'validatorjs';

let validatorMake = async (data, rules, message) => {
    let validation = new Validator(data, rules, message);

    return validation;
}

const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj)) {
        callback(key, value);
    }
    return true;
}

let postApi = async (url, formData) => {
    let apiUrl = process.env.NEXT_PUBLIC_HOST
    let resp = await axios.post(`${apiUrl}${url}`, formData, {
        headers: {
            Authorization: "Bearer " + getToken(tokenName.LOGIN_TOKEN)
        }
    })
    let { data } = resp
    return data
}

let getApi = async (url) => {
    let apiUrl = process.env.NEXT_PUBLIC_HOST
    let resp = await axios.get(`${apiUrl}${url}`,
        {
            headers: {
                Authorization: "Bearer " + getToken(tokenName.LOGIN_TOKEN)
            }
        }).catch((error) => {
            if(error.response.status == 401)
            {
                setToken(tokenName.LOGIN_TOKEN,"")
            }
        })

    if(resp)
    {
        let { data } = resp
        return data
    }
    else
    {
        return []
    }
}

let checkLogin = async () => {
    let resp = await getApi('/check-login')
    console.log(resp)
}

const getHash = (length = 32) => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength )
        );
    }
    return result;
}

module.exports = {
    validatorMake,
    foreach,
    postApi,
    getApi,
    getHash
}