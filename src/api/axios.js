import axios from "axios";

const isDevelopment = process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: isDevelopment ? process.env.VUE_APP_LOCAL_HOST : process.env.VUE_APP_API_URL
});

instance.interceptors.request.use(config => {
  config.headers = {
    "X-Auth-Token": process.env.VUE_APP_API_TOKEN
  };

  return config;
});

export default instance;
