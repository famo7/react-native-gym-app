import axios from "axios";
const baseUrl = "https://powerful-retreat-80063.herokuapp.com/api/exercises";
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
