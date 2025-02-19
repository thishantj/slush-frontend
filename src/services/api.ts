import axios from 'axios';

const api = axios.create({
  baseURL: 'hhttps://slush-backend-iypg.onrender.com:5011',
});

export { api };
