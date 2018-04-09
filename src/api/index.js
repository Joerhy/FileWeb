import axios from "axios";

let BASE_URL = "http://127.0.0.1:8080/v1/";

export const POST = (url, params) => {
  return axios.post(`${BASE_URL}${url}`, params).then(res => res.data);
};

export const GET = (url, get_params) => {
  return axios
    .get(`${BASE_URL}${url}`, { params: get_params })
    .then(res => res.data);
};

export const UPDATE = (url, params) => {
  return axios.put(`${BASE_URL}${url}`, params).then(res => res.data);
};

export const DELETE = (url, delete_params) => {
  return axios
    .delete(`${BASE_URL}${url}`, { params: delete_params })
    .then(res => res.data);
};
