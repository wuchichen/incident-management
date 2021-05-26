import jwt_decode from "jwt-decode";
import LoginService from "./LoginService";

const isLogin = () => {
  return localStorage.getItem("jwt") ? true : false;
};

const getJWT = () => {
  return localStorage.getItem("jwt");
};

/**
 *
 * @param {"user" | "admin"} role target role
 * @param {String} email user email
 * @param {String} password user password
 * @returns {Promise<any>} http response
 */
const login = async (role, email, password) => {
  return LoginService.login(role, email, password).then((res) => {
    localStorage.setItem("jwt", res.access_token);
    return res;
  });
};

const logout = () => {
  localStorage.removeItem("jwt");
};

const getRole = () => {
  var jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return;
  }
  var decoded = jwt_decode(jwt);
  return decoded.role;
};

const getFullName = () => {
  var jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return;
  }
  var decoded = jwt_decode(jwt);
  return `${decoded.firstName} ${decoded.lastName}`;
};

const AuthService = {
  isLogin,
  getJWT,
  login,
  logout,
  getRole,
  getFullName,
};

export default AuthService;
