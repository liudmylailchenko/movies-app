import axios from 'axios';

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = 'a66cf14c';

export const apiCall = axios.create({
  baseURL: API_URL,
  params: {
    apikey: API_KEY,
  },
});
