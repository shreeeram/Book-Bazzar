import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container text-center mt-5 p-5">
      <i className="fas fa-check-circle fa-5x text-success"></i>
      <h1>Thank You</h1>
      <h2>Your Order Successfully</h2>
      <h5>With in 7 Days Your Product will be Delivered In your Address</h5>
      <a href="/" className="btn btn-primary mt-3">
        Home
      </a>{" "}
      <Link to="/orders" className="btn btn-danger mt-3">
        View Order
      </Link>
    </div>
  );
};

export default OrderSuccess;
