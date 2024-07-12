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

const getAll = async () => {
    try {
        let record = await getApi('/user')
        console.log(record)
    }
    catch (error) {
        console.log(error)
        return false;
    }
}
const getData = async (email) => {
    try {
        let resp = await getApi('/user');
        console.log(resp)
        if (resp.data && Array.isArray(resp.data)) {
            let user = resp.data.find(user => user.email === email);
            if (user) {
                let useridToken = {
                    id: user._id,
                    token: user.token
                }
                return useridToken; // Return the user ID if needed
            } else {
                console.error('User data not found:', useridToken);
            }
        } else {
            console.error('Unexpected response data:', resp.data);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const getSingleID = async (id) => {
    try {
        let res = await getApi(`/user/view/${id}`);
        if (res.data) {
            let token = res.data.token;
            console.log(token);
            return token; // Optional: return the token if needed
        } else {
            console.error('Token not found in response:', res.data);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

let postApi = async (url, formData) => {
    let apiUrl = process.env.NEXT_PUBLIC_HOST
    let resp = await axios.post(`${apiUrl}${url}`, formData)
    let { data } = resp
    return data
}

let getApi = async (url) => {
    let apiUrl = process.env.NEXT_PUBLIC_HOST
    let resp = await axios.get(`${apiUrl}${url}`)
    let { data } = resp
    return data
}
let getmail = localStorage.getItem('userEmail')


module.exports = {
    validatorMake,
    foreach,
    getAll,
    getData,
    getSingleID,
    postApi,
    getApi,
    getmail
}