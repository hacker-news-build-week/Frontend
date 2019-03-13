import axios from 'axios';

const axiosAuth = () => {
  const token = localStorage.getItem('saltyToken');
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  });
};

export default axiosAuth;
