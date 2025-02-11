import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Local development URL
// const BASE_URL = "https://e-mart-1.onrender.com"; // Production URL

// Set global defaults for Axios
axios.defaults.baseURL = BASE_URL;

export default axios;
