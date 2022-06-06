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
    put(endpoint, data, token) {
        return ajax(endpoint, 'PUT', data, token);
    },
    delete(endpoint, data, token) {
        return ajax(endpoint, 'DELETE', data, token);
    },
    // postFile(file, apiKey) {
    //     return ajaxFile(file, apiKey)
    // }
};

// async function ajaxFile(file, apiKey) {
//     try {
//         let formData = new FormData();
//         formData.append('file', file)
//         const res = await axios({
//             url: 'https://cubee-api.staging.cubee3d.com/v1/file/upload/',
//             // url: 'https://cubee-api.staging.cubee3d.com/v1/test',
//             method: 'POST',
//             // formData,
//             data: null,
//             headers: {
//                 // 'x-api-key': apiKey,
//                 'Access-Control-Allow-Origin': '*',
//             },
//         })
//         console.log(res)
//         return res
//     } catch (err) {
//         if (!err.response)
//             return {
//                 error: {
//                     message:
//                         'Oops, there is a problem with the server, please try again',
//                     status: 500,
//                 },
//             };
//         return {
//             error: {
//                 message: err.response.data,
//                 status: err.response.status,
//             },
//         };
//     }
// }

async function ajax(endpoint, method = 'get', data = null, apiKey = null) {
    try {
        let formData = new FormData();
        formData.append('file', data)
        const res = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data: formData,
            headers: {
                'x-api-key': 'yPLsXXF6ialkaUbjGy0IRiV0YEVG4EYr',
                'Access-Control-Allow-Origin': '*',
                "Content-Type":'multipart/form-data'
            },
        });
        return res.data;
    } catch (err) {
        if (!err.response)
            return {
                error: {
                    message:
                        'Oops, there is a problem with the server, please try again',
                    status: 500,
                },
            };
        return {
            error: {
                message: err.response.data,
                status: err.response.status,
            },
        };
    }
}
