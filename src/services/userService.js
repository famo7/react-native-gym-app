import axios from "axios";
const loginUrl = "http://192.168.0.13:3001/api/login";
const signUpUrl = "http://192.168.0.13:3001/api/users";

const login = async (newObject) => {

  const response = await axios.post(loginUrl, newObject);
  return response.data;
};

const createUser = async (newObject) => {
  const response = await axios.post(signUpUrl, newObject);
  return response.data;
};


const obj = {login, createUser };

export default obj;