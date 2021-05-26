import "./Login.css";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  function linkToUserLogin() {
    props.setRole("user");
    history.push("/login/user");
  }

  function linkToAdminLogin() {
    props.setRole("admin");
    history.push("/login/admin");
  }

  function login(role, email, password) {
    props.login(role, email, password).then((res) => {
      history.push(`/incidents`);
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;

    login(props.role, email, password);
  }

  return (
    <div className="Login">
      <div className="container">
        <ButtonGroup>
          <Button
            className={props.role === "user" ? "btn-highlight-1" : ""}
            variant="outline-info"
            onClick={linkToUserLogin}
          >
            User
          </Button>
          <Button
            className={props.role === "admin" ? "btn-highlight-1" : ""}
            variant="outline-info"
            onClick={linkToAdminLogin}
          >
            Admin
          </Button>
        </ButtonGroup>

        <div className="p-2"></div>

        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="outline-info" type="submit">
            Login
          </Button>

          <Route path="/login">{history.push(`/login/${props.role}`)}</Route>
        </Form>
      </div>
    </div>
  );
};

export default Login;
