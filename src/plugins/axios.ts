import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_PUBG_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_PUBG_API_KEY}`,
    Accept: 'application/vnd.api+json',
  },
});
export default instance;
