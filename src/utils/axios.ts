import _axios from "axios";

const axios = _axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL || "http://10.0.2.2:1337/api/",
});

export default axios