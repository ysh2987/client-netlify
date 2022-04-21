import axios from 'axios';

const client = axios.create({
  baseURL: 'https://teamfinder-server.herokuapp.com/api',
});

export default client;
