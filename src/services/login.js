import axios from "axios";
const loginURL = "http://localhost:3003/api/login";

const login = async (cred) => {
  const req = await axios.post(loginURL, cred).then((re) => re.data);

  return req;
};

export default { login };