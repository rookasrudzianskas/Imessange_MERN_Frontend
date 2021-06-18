import axios from "axios";

const instance = axios.create({
    baseURL: 'https://rookas-imessage-mern-backend.herokuapp.com'
})

export default instance;