import axios from "axios";
import config from "../env/index";

// Config axios
const axiosConfig = { baseURL: config.geolocalization.API_URL };

const axiosInstance = axios.create(axiosConfig);
axiosInstance.defaults.params = {};
axiosInstance.defaults.params["apiKey"] = config.geolocalization.API_KEY;

export default axiosInstance;
