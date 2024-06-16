import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userService from "../service/user.service";
import { signupUpSchema } from "../schemas";
import { toast, ToastContainer } from "react-toastify";
import './pages.css'
const initialValues = {
  name: "",
  email: "",
  password: "",
  mobNo: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};


const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupUpSchema,
      onSubmit: (values, action) => {
        userService
          .register(values)
          .then(() => {
            notify("Register sucessfully");
            navigate("/login");
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              notify("Email id already exist");
              navigate("/signup");
            }
          });

        action.resetForm();
      },
    });
  
    
  const notify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className="container-fluid main-container d-flex align-items-center justify-content-center" 
    >
      <div className="row">
        <div className="col-md-6">
          <div className="card paint-card signup-card" >
            <div className="card-body">
            <h3 className="text-center text-dark font-weight-bold">Signup</h3>
              {succMsg && (
                <p className="fs-4 text-success text-center">{succMsg}</p>
              )}
              {errorMsg && (
                <p className="fs-4 text-danger text-center">{errorMsg}</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-sm"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="text-danger">{errors.name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label>Email Id</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-sm"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-danger">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="col">
                    <label>Mobile No</label>
                    <input
                      type="number"
                      name="mobNo"
                      className="form-control form-control-sm"
                      value={values.mobNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobNo && touched.mobNo ? (
                      <p className="text-danger">{errors.mobNo}</p>
                    ) : null}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      id="psw"
                      className="form-control form-control-sm"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="text-danger">{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="col">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmpassword"
                      className="form-control form-control-sm"
                      value={values.confirmpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <p className="text-danger">{errors.confirmpassword}</p>
                    ) : null}
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label>Address</label>
                  <textarea
                    rows="3"
                    cols=""
                    className="form-control"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {errors.address && touched.address ? (
                    <p className="text-danger">{errors.address}</p>
                  ) : null}
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control form-control-sm"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.city && touched.city ? (
                      <p className="text-danger">{errors.city}</p>
                    ) : null}
                  </div>
                  <div className="col">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control form-control-sm"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.state && touched.state ? (
                      <p className="text-danger">{errors.state}</p>
                    ) : null}
                  </div>

                  <div className="col">
                    <label>Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      className="form-control form-control-sm"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.pincode && touched.pincode ? (
                      <p className="text-danger">{errors.pincode}</p>
                    ) : null}
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4">
                  <button className="btn btn-primary col-md-4">
                    Register
                  </button>
                <p className="m-2font-weight-bold" style={{color:'grey'}}>Already have account?? <NavLink to="/login">Login here...</NavLink></p>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    
  );
};

export { Signup };
