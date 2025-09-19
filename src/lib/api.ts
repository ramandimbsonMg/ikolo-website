import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-ramandimbson.onrender.com/api/", // ✅ point vers Django
});

export default api;
 