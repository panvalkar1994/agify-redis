import axios from "axios";
import { Constants } from "./constants.js";

export async function getAgePredictionByName(name) {
  const response = await axios.get(Constants.BaseUrl, {
    params: {
      name: name,
    },
  });
  if (response.status == 200) {
    return response.data;
  }
  return {};
}
