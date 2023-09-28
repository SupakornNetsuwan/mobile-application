import _axios from "axios";

const axios = _axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL + "/api",
});

export default axios