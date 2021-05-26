import Ajax from "./ajax";

const login = async (role, email, password) => {
  return Ajax.restCall(`http://localhost:8080/api/v1/login/${role}`, "post", {
    data: { email: email, password: password },
  });
};

const LoginService = {
  login,
};
export default LoginService;
