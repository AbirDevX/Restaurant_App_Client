import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  timeout: 10000,
  withCredentials: true,
});

export { instance };

