import axios from "axios";

// const BASE_URL = "http://localhost:8080"; // Local development URL
const BASE_URL = "https://4a4ef31fd3c8.ngrok-free.app"; // Production URL

// Set global defaults for Axios
axios.defaults.baseURL = BASE_URL;

export default axios;



