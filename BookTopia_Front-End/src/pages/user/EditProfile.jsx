import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import bookService from "../../service/book.service";
import { setCurrentUser } from "../../store/action/user.action";

const EditProfile = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const loginUser = useSelector((state) => state.user);
  const [msg, setMsg] = useState(true);
  if (msg) {
    setUser(loginUser);
    setMsg(false);
  }


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    bookService
      .updateProfile(user)
      .then((res) => {
        dispatch(setCurrentUser(user));
        notify();
      })
      .catch((error) => {
      });
  };

  const notify = () => {
    toast.success("Profile Update Sucesfully", {
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
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card paint-card">
            <div className="card-header">
              <h3 className="text-center text-dark">Edit Profile</h3>
              
            </div>
            <div className="card-body">
              <form
                action="addUser"
                className=""
                method="post"
                id="userRegister"
                onSubmit={(e) => register(e)}
              >
                <div className="row">
                  <div className="col">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control form-control-sm"
                      defaultValue={user.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label>Email Id</label>
                    <input
                      type="email"
                      name="email"
                      required
                      readOnly
                      className="form-control form-control-sm"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col">
                    <label>Mobile No</label>
                    <input
                      type="number"
                      name="mobNo"
                      required
                      maxLength={10}
                      minLength={10}
                      className="form-control form-control-sm"
                      value={user.mobNo}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label>Address</label>
                  <textarea
                    required
                    rows="3"
                    cols=""
                    className="form-control"
                    name="address"
                    value={user.address}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="form-control form-control-sm"
                      value={user.city}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control form-control-sm"
                      value={user.state}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="col">
                    <label>Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      className="form-control form-control-sm"
                      value={user.pincode}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="text-center mt-3">
                  <button className="btn btn-primary col-md-12">update</button>
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

export default EditProfile;
