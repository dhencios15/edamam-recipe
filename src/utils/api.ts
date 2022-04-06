import axios from "axios";

const api = axios.create({
  baseURL: `https://api.edamam.com/api/recipes`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["type"] = "public";
  config.params["app_id"] = process.env.APP_ID;
  config.params["app_key"] = process.env.APP_KEYS;
  // config.params["field"] = encodeURIComponent(JSON.stringify(fields));
  // config.params["field"] = fields;
  return config;
});

export default api;
