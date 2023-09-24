import _axios from "axios";

const axios = _axios.create({
    baseURL: 'http://10.0.2.2:1337/api/',
});

export default axios