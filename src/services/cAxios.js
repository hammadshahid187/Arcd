import axios from "axios";

export const axiosConfig = {
  baseURL: "https://arcafeed.herokuapp.com/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const cAxios = axios.create(axiosConfig);
export default cAxios;
