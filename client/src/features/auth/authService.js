import axios from 'axios';

const API_URL = '/service/user';

// signup user
const signup = async (userData) => {
  const response = await axios.post(API_URL + '/signup', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + "/signin", userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}


const authService = {
    signup,
    signin
}

export default authService