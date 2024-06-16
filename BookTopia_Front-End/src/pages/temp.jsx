import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../img/back2.jpg";
import User from "../model/User";
import userService from "../service/user.service";
import { signupUpSchema } from "../schemas";
import { toast, ToastContainer } from "react-toastify";
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // };

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupUpSchema,
      onSubmit: (values, action) => {
        userService
          .register(values)
          .then(() => {
            notify("Register sucessfully");
            navigate("/signup");
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
      className="container-fluid p-2"
      style={{
        backgroundImage: `url(${back})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >

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
