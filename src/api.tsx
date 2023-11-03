import axios from "axios";

const apiGateway = axios.create({
  baseURL: "https://api.thecatapi.com",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export async function getCatApi() {
  const url = "/v1/images/search?limit=10";
  return apiGateway.get(url);
}

export default apiGateway;
