import axios from "axios";
const loginUrl = "https://powerful-retreat-80063.herokuapp.com/api/login";
const signUpUrl = "https://powerful-retreat-80063.herokuapp.com/api/users";

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