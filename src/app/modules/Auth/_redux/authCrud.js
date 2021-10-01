import axios from "axios";

export const LOGIN_URL = "api/Authentication/Login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";


export const ME_URL = "api/me";
const BASE_URL = "http://megaminds-001-site12.itempurl.com/api/"
// const BASE_URL = "http://localhost:4200/api/"
export function login(email, password) {
  var data = {
    "stEmail": email,
    "stPassword": password
    // "IPAddress": ipAddress,
    // "TimeZone": timeZone,
  };
  const instance = axios.create({
  });
  const options = {
    headers: { 'Content-Type': "application/json" }
  };
  const respo = instance.post(`${BASE_URL}Authentication/login`, data, options);
  return respo;

}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get(ME_URL);
// }
