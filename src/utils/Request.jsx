import axios from "axios";

const Request = axios.create({
    baseURL: "https://localhost:7207/api/",
});
export default Request;