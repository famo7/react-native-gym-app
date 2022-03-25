import axios from "axios";
const baseUrl = "http://192.168.0.13:3001/api/exercises";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl + "/getAllEx", newObject, config);
  return response.data;
};

const obj = { setToken, create, getAll };

export default obj;
