import _axios from "axios";

const axios = _axios.create({
    baseURL: 'https://738c-161-246-146-144.ngrok-free.app/api/',
    // baseURL: 'http://10.0.2.2:1337/api/',
});

export default axios