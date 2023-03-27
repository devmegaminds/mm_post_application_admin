import axios from "axios";

export const LOGIN_URL = "api/Authentication/Login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";
// const BASE_URL = "http://localhost:4200/api/"
export function login(email, password) {
  var devMode = localStorage.getItem("devMode");
  const BASE_URL =
    devMode == "Enable"
      ? "http://megaminds-001-site4.itempurl.com/api/"
      : "https://feelbrandliveapi.megaminds.live/api/";
  console.log("------------", `${BASE_URL}Authentication/login`, "---------");
  var data = {
    stEmail: email,
    stPassword: password,
  };

  const instance = axios.create({});
  const options = {
    headers: { "Content-Type": "application/json" },
  };
  const respo = instance.post(`${BASE_URL}Authentication/login`, data, options);
  return respo;
}

export function register(email, firstname, lastname, contactnumber, password) {
  var devMode = localStorage.getItem("devMode");

  const BASE_URL =
    devMode == "On"
      ? "http://megaminds-001-site4.itempurl.com/api/"
      : "https://feelbrandliveapi.megaminds.live/api/";
  console.log("------------", `${BASE_URL}Authentication/login`, "---------");
  var data = {
    inAdminUserId: 0,
    stFirstName: firstname,
    stLastName: lastname,
    stEmail: email,
    stContact: contactnumber,
    stPassword: password,
  };
  return axios.post(`${BASE_URL}Authentication/AddEditAdminUser`, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}
