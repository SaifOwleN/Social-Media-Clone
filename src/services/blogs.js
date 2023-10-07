import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = "";

const setToken = (desToken) => {
  token = `Bearer ${desToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios
    .get(baseUrl, config)
    .then((response) => response.data);
  console.log("request", request);
  return request;
};

export default { getAll, setToken };
