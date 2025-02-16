import axios from "axios";

const baseURL = "http://localhost:4000/api/v1";
const token = localStorage.getItem("token");
const headers = token ? { Authorization: `Bearer ${token}` } : {};

const TheBearer = axios.create({
  baseURL,
  headers,
});

export default TheBearer;
