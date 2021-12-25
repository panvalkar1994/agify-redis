import axios from "axios";
import { Constants } from "./constants.js";

export async function getAgePredictionByName(name, redisClient) {
  let cachedValue = getDataFromCacheByName(redisClient, name);
  if (cachedValue) {
    return cachedValue;
  }
  const response = await axios.get(Constants.AgifyBaseUrl, {
    params: {
      name: name,
    },
  });
  if (response.status == 200) {
    await setDataToCacheAgainstName(redisClient, name, response.data);
    return response.data;
  }
  return {};
}

async function getDataFromCacheByName(redisClient, name) {
  if (redisClient && name) {
    const cachedValue = await redisClient.get(name);
    if (cachedValue) {
      return JSON.parse(cachedValue);
    }
  }
  return null;
}

async function setDataToCacheAgainstName(redisClient, name, data) {
  if (redisClient && name && Object.keys(data).length) {
    await redisClient.set(name, JSON.stringify(data));
  }
}
