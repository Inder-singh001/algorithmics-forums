import axios from 'axios';
import Validator from 'validatorjs';

let validatorMake = async (data, rules, message) => {    
    let validation = new Validator(data, rules, message);

    return validation;    
}

const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj))
    {
        callback(key, value);
    }
    return true;
}

let postApi = async (url, formData) => {
    let apiUrl = process.env.NEXT_PUBLIC_HOST
    let resp = await axios.post(`${apiUrl}${url}`, formData)
    let {data} = resp
    return data
}

let getApi = async (url) => {
    let apiUrl = process.env.NEXT_PUBLIC_HOST
    let resp = await axios.get(`${apiUrl}${url}`)
    let {data} = resp
    return data 
}


module.exports = {
    validatorMake,
    foreach,
    postApi,
    getApi
}