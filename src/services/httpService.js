import Axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const API_URL = `${baseURL}/`;
const axios = Axios.create({
    // withCredentials: true,
});

export default {
    get(endpoint, data, token) {
        return ajax(endpoint, 'GET', data, token);
    },
    post(endpoint, data, token) {
        return ajax(endpoint, 'POST', data, token);
    },
    postFile(endpoint, data, token) {
        return ajaxFile(endpoint, 'POST', data, token);
    },
    put(endpoint, data, token) {
        return ajax(endpoint, 'PUT', data, token);
    },
    delete(endpoint, data, token) {
        return ajax(endpoint, 'DELETE', data, token);
    },
};

async function ajax(endpoint, method = 'get', data = null, apiKey = null) {
    try {
        const res = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data,
            headers: {
                // 'x-api-key': 'yPLsXXF6ialkaUbjGy0IRiV0YEVG4EYr',
                // 'x-api-key': 'HXREGyX1onfC6d-_Z99EvBzQavgOayET',
                'x-api-key': apiKey,

                'Access-Control-Allow-Origin': '*',
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
        if (!err.response || !err.response.data) {
            return {
                error: {
                    message:
                        'Oops, there is a problem with the server, please try again',
                    status: 500,
                },
            };
        }
        return {
            error: {
                message: err.response.data,
                status: err.response.status,
            },
        };
    }
}

async function ajaxFile(endpoint, method = 'get', data = null, apiKey = null) {
    try {
        let formData = new FormData();
        formData.append('file', data);
        const res = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data: formData,
            headers: {
                'x-api-key': apiKey,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
        if (!err.response) {
            return {
                error: {
                    message:
                        'Oops, there is a problem with the server, please try again',
                    status: 500,
                },
            };
        }
        return {
            error: {
                message: err.response.data,
                status: err.response.status,
            },
        };
    }
}
