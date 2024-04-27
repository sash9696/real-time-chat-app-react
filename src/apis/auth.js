import axios from 'axios';

// const API = (token) => 
//     axios.create({
//         baseURL: process.env.REACT_APP_SERVER_URL,
//         headers: {AUthorization: token}
//     });

let url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const registerUser = async (body) => {

    try {
        return await axios.post(`${url}/auth/register`, body)
        
    } catch (error) {
        console.log('ERROR: in register api', error)
    }
};