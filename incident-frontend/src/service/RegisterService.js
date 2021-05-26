import Ajax from "./ajax";

const register = async (role, email, password, firstName, lastName) => {
  var data = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  return Ajax.restCall(
    `http://localhost:8080/api/v1/register/${role}`,
    "post",
    {
      data: data,
    },
  );
};

const RegisterService = {
  register,
};
export default RegisterService;
