import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import back from "../img/back2.jpg";
import User from "../model/User";
import userService from "../service/user.service";
import { setCurrentUser } from "../store/action/user.action";
import './pages.css'
import { Signup } from "./Signup";
const Login = () => {
  const [message, setMessage] = useState("");
  const [login, userLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((u) => u.user);
  const handleChange = (e) => {
    const { name, value } = e.target;

    userLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (loginUser?.id) {
      navigate("/");
    }
  }, []);

  const loginSubmit = (e) => {
    e.preventDefault();
    userService
      .login(login)
      .then((res) => {
        
        dispatch(setCurrentUser(res.data));

        if (res.data.role === "ROLE_ADMIN") {
          navigate("/admin/home");
        } else {
          navigate("/home");
        }
      })
      .catch((error) => {
        setMessage("invalid email and password");
      });
  };

  return (
    <div
    className="main-container container-fluid d-flex align-items-center justify-content-center"
    >
          <div className="card login-card">

            <div className="card-body">
            <h4 className="text-dark text-center fw-bold mt-3">LOGIN</h4>
              {message && (
                <p className="text-center text-danger fs-5">{message}</p>
              )}
              <form onSubmit={(e) => loginSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    name="password"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                <button type="submit" className="btn btn-primary col-md-3">
                  Login
                </button>
                
                <p className="m-2">Don't have account?? <NavLink to="/signup">Register here...</NavLink></p>
                </div>
                

                {/* <div className="text-center p-3">
                  <a href="loadforgotPassword" className="text-decoration-none">
                    Forgot Password
                  </a>
                </div> */}
              </form>
            </div>
      
    </div>
    </div>
  );
};

export { Login };
