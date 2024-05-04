import axios from "axios";
import { toast } from "react-toastify";

const API = (token) =>
  axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
    headers: { AUthorization: token },
  });

let url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/register`, body);
  } catch (error) {
    console.log("ERROR: in register api", error);
  }
};

export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/login`, body);
  } catch (error) {
    console.log("error in loginuser api");
  }
};
export const googleAuth = async (body) => {
  try {
    return await axios.post(`${url}/api/google`, body);
  } catch (error) {
    console.log(error);
  }
};
export const validUser = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log("error in valid user api");
  }
};
export const searchUsers = async (id) => {
  try {
    const token = localStorage.getItem("userToken");

    return await API(token).get(`/api/user?search=${id}`);
  } catch (error) {
    console.log("error in search users api");
  }
};
export const updateUser = async (id, body) => {
  try {
    const token = localStorage.getItem("userToken");

    const { data } = await API(token).patch(`/api/users/update/${id}`, body);
    return data;
  } catch (error) {
    console.log("error in update user api");
    toast.error("Something Went Wrong.try Again!");
  }
};
export const checkValid = async () => {
  const data = await validUser();
  if (!data?.user) {
    window.location.href = "/login";
  } else {
    window.location.href = "/chats";
  }
};
