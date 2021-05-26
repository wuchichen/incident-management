import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import TopNav from "./component/TopNav/TopNav";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Incident from "./module/Incident/Incident";
import AuthService from "./service/AuthService";

const App = () => {
  // login status
  const [loginStatus, setLoginStatus] = useState(() => {
    return AuthService.isLogin();
  });

  function login(_role, _email, _password) {
    return AuthService.login(_role, _email, _password)
      .then((res) => {
        setRole(AuthService.getRole());
        setLoginStatus(true);
        return res;
      })
      .catch((err) => {
        setLoginStatus(false);
        throw err;
      });
  }

  function logout() {
    AuthService.logout();
    setLoginStatus(false);
  }

  // role
  const [role, setRole] = useState(() => {
    const tempRole = AuthService.getRole();
    return tempRole ? tempRole : "user";
  });

  return (
    <div className="App">
      {/* toaster */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* top navigation bar */}
      <div className="inc-topnav">
        <TopNav logout={logout} loginStatus={loginStatus} role={role}></TopNav>
      </div>

      {/* main content */}
      <main className="inc-main">
        <div
          className="bg-main"
          style={{ backgroundImage: `url("/bg.jpg")` }}
        ></div>

        <div className="container">
          <Switch>
            <Route exact path="/">
              <h3>
                <i>
                  <b>Incident Manager </b>
                </i>
                &ndash; makes work assignment effortless
              </h3>
            </Route>

            {/* protected route */}
            <Route path="/incidents">
              {loginStatus ? (
                <Incident></Incident>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route path="/login">
              <Login
                login={login}
                loginStatus={loginStatus}
                role={role}
                setRole={setRole}
              ></Login>
            </Route>

            <Route path="/register">
              <Register
                loginStatus={loginStatus}
                role={role}
                setRole={setRole}
              ></Register>
            </Route>
          </Switch>
        </div>
      </main>

      {/* footer */}
      <footer className="inc-footer">
        <i>Copyright &copy; Incident Manager</i>
      </footer>
    </div>
  );
};

export default App;
