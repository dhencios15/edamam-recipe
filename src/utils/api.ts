import axios from "axios";

const fields = [
  "field=label",
  "field=images",
  "field=source",
  "field=dietLabels",
  "field=url",
  "field=healthLabels",
  "field=ingredientLines",
  "field=ingredients",
  "field=calories",
  "field=totalWeight",
  "field=totalTime",
  "field=cuisineType",
  "field=mealType",
  "field=dishType",
  "field=cautions",
  "field=uri",
];

const api = axios.create({
  baseURL: `https://api.edamam.com/api/recipes/v2?${fields.join("&")}`,
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
