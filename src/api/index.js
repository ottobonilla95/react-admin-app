import axios from "axios";
import { NotificationManager } from "react-notifications";


const requestHandler = (request) => {
  if (request.headers["x-handle-request"]) {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.userToken.access_token;
      request.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return request;
};

const successHandler = (response) => {
  let message = response.data.message;
  if (message) {
    NotificationManager.success(message);
  }

  return response;
};

const errorHandler = (error) => {
  let message;
  if (!error.response) {
    message = "Network error";
    NotificationManager.error(message);
    throw Error;
  }
  message = error.response.data.message;

  if (message) {
    NotificationManager.error(message);
  }
  return error;
};

const customAxios = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "http://128.199.43.48/adminapp_webapi/",
});

customAxios.interceptors.request.use((request) => requestHandler(request));

customAxios.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
