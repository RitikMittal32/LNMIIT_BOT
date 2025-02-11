import axios from "axios";

// const BASE_URL = "http://localhost:8080"; // Local development URL
const BASE_URL = "https://lnmiit-bot.onrender.com"; // Production URL

// Set global defaults for Axios
axios.defaults.baseURL = BASE_URL;

export default axios;
