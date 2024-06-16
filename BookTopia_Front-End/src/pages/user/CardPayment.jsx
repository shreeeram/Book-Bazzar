import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderService from "../../service/order.service";
import { useSelector } from "react-redux";

const CardPayment = () => {
  const navigate = useNavigate();
  const { pr } = useParams();
  const sum = parseInt(pr) + 90;
   const user=useSelector((u)=>u.user)
  const payNow = (e) => {
    e.preventDefault();
    orderService
      .createOrder("Card Payment",user.id)
      .then((res) => {
      })
      .catch((error) => {
      });
    navigate("/orderSucc");
  };

  return (
    <>
      <div class="container p-5">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <div class="card paint-card">
              <div class="card-header">
                <div class="row">
                  <h3 class="text-center">Payment Details</h3>
                  <img
                    class="img-responsive cc-img"
                    src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"
                  />
                </div>
              </div>
              <div class="card-body">
                <form role="form">
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="form-group">
                        <label>Card Number</label>
                        <div class="input-group">
                          <input
                            required
                            type="number"
                            class="form-control"
                            placeholder="Card Number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-xs-7 col-md-7">
                      <div class="form-group">
                        <label>
                          <span class="hidden-xs">Exp Date</span>
                        </label>
                        <input
                          required
                          type="number"
                          class="form-control"
                          placeholder="MM / YY"
                        />
                      </div>
                    </div>
                    <div class="col-xs-5 col-md-5 pull-right">
                      <div class="form-group">
                        <label>Cvv</label>
                        <input
                          required
                          type="number"
                          class="form-control"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="form-group">
                      <label>Card Holder Name</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="form-group">
                      <label>Total Amount</label>
                      <input
                        readOnly
                        type="text"
                        class="form-control"
                        value={sum}
                      />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      class="btn btn-warning btn-lg btn-block col-md-12"
                      onClick={(e) => payNow(e)}
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardPayment };
