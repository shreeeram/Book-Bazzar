import { useRef, useState } from "react";
import { useEffect } from "react";
import cartService from "../../service/cart.service";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API_URL } from "../../common/constant";
import { Link, useNavigate } from "react-router-dom";
import orderService from "../../service/order.service";
import { useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

const Cart = () => {
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

  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tot, setTot] = useState(0);
  const [pymtType, setPymtType] = useState("");
  const navigate = useNavigate();
  const loginUser = useSelector((u) => u.user);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    user.id = loginUser.id;
    user.name = loginUser.name;
    user.email = loginUser.email;
    user.mobNo = loginUser.mobNo;
    user.address = loginUser.address;
    user.city = loginUser.city;
    user.state = loginUser.state;
    user.pincode = loginUser.pincode;
    init();
  }, []);

  const init = async () => {
    let cart = await cartService.getCart(user.id);
    setCartList(cart.data);

    if (cart.data.length != 0)
      setTotalPrice(cart.data[cart.data.length - 1].totalPrice);
    setTot(CalTotal());
    let num = 0;
    cart.data.forEach((n) => {
      num = num + n.totalPrice * n.quantity;
    });
    setTot(num);
  };

  const plusCart = (id, qu) => {
    qu = qu + 1;

    if (qu > 1) {
      cartService
        .updateCart(id, qu)
        .then((res) => {
          init();
        })
        .catch((error) => {
        });
    }
    setTot(CalTotal());
  };

  const CalTotal = () => {
    let num = 0;
    cartList.forEach((n) => {
      num = num + n.totalPrice * n.quantity;
    });
    return num;
  };

  const minusCart = (id, qu) => {
    qu = qu - 1;
    if (qu < 1) {
      cartService
        .deleteCart(id)
        .then((res) => {
          init();
          notify();
        })
        .catch((error) => {
        });
    } else {
      cartService
        .updateCart(id, qu)
        .then((res) => {
          init();
        })
        .catch((error) => {
        });
    }

    setTot(CalTotal());
  };

  const handleType = (e) => {
    setPymtType(e.target.value);
  };

  const orderPage = (e) => {
    e.preventDefault();

    if (pymtType === "COD") {
      orderService
        .createOrder(pymtType, loginUser.id)
        .then((res) => {
        })
        .catch((error) => {
        });
      navigate("/orderSucc");
    } else {
      const url = BASE_API_URL + "/api/payment/create_order";
      axios
        .post(url, JSON.stringify({ amt: tot, info: "order_request",pymtType:pymtType,userId:loginUser.id }), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          //alert("something went wrong")

          swal({
            title: "oops!!",
            text: "something went wrong",
            icon: "failure",
            button: "retry",
          });
        })
        .then((response) => {
          if (response.data.status == "created") {
            var options = {
              key: "rzp_test_QQT1v9U5PAocCe", // Enter the Key ID generated from the Dashboard
              amount: response.data.amount, // Amount is in currency subunits. Default currency is
              // INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "BookTopia",
              description: "Test Transaction",
              image:
                "https://uploads-ssl.webflow.com/61e26cac44a5f4e78e0af5bd/622963675ca27bdc04aae9d7_1640135518357.Booktopia_logo_visa.jpg",
              order_id: response.data.id, //This is a sample Order ID. Pass the
              //   `id` obtained in the response of Step 1
              handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                updatePayment(
                  response.razorpay_payment_id,
                  response.razorpay_order_id,
                  "paid"
                );
              },
              prefill: {
                name: "",
                email: "",
                contact: "9999999999",
              },
              notes: {
                address: "BookTopia",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
            });
            rzp1.open();
          }
        });

      const updatePayment = (payment_id, order_id, status) => {
        const url = BASE_API_URL + "/api/payment/update_order";
        axios
          .post(
            url,
            JSON.stringify({
              payment_id: payment_id,
              order_id: order_id,
              status: status,
              userId:loginUser.id ,
              pymtType:pymtType

            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            init()
          })
          .catch(error => {
            alert("Error");
          });
      };
      // navigate("/cardPayment/" + totalPrice);
    }
  };

  // const CalFinalTotal=()=>{
  //  let num= tot.toFixed(2);
  //     let t=num+30.0 + 60.0
  // }

  const notify = () =>
    toast.success("Item Removed", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="main-height-container">
    <div className="container-fluid p-5 main-height-container">
      <div className="row">
        <div className="col-md-8">
          <table className="table ">
            <thead className="text-center bg-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cartList.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">
                      <img
                        src={BASE_API_URL + "/" + item.img}
                        width="70px"
                        height="70px"
                      />
                    </th>
                    <td>{item.book.bookName}</td>
                    <td>{item.book.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.book.price}</td>
                    <td className="text-center">
                      <a
                        onClick={() => plusCart(item.id, item.quantity)}
                        className="text-dark"
                      >
                        <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
                      </a>

                      <button className="btn btn-sm btn-light border ms-2 me-2 mt-1">
                        {item.quantity}{" "}
                      </button>
                      <a
                        onClick={() => minusCart(item.id, item.quantity)}
                        className="text-dark ms-1"
                      >
                       <i class="fa fa-lg  fa-minus-circle" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          <div className="col-md-12">
            <div className="card paint-card">
              <div className="card-body">
                <p className="fs-6 text-Secondary text-center">
                  Delivery Address
                </p>

                <p style={{ color: "black" }}>
                  {user.name} <br />
                  {user.address} <br />
                  {user.city},{user.state},{user.pincode} <br />
                  Mobile No: {user.mobNo}
                </p>
                <Link className="fs-5 text-decoration-none" to="/editProfile">
                  Change Address
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card paint-card">
              <div className="card-body">
                <p className="fs-6 text-Secondary text-center">Payment</p>
                <p className="fw-bold" style={{ color: "black" }}>
                  Amount: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i>₹&nbsp;{tot.toFixed(2)}</i> <br /> Shipping Charge:&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i></i> &nbsp;Free Shipping <br /> 
                </p>
                <hr />
                <p className="fw-bold">
                  Total Amount:&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; ₹&nbsp;
                  {parseFloat(tot.toFixed(2))}
                  <br />
                </p>

                <form
                  className="row g-3"
                  onSubmit={(e) => orderPage(e)}
                  method="post"
                >
                  <div className="form-group">
                    <label className="form-label">Payment Mode</label>
                    <select
                      name="type"
                      className="form-control form-control-sm"
                      onChange={(e) => handleType(e)}
                    >
                      <option>--select--</option>
                      <option value="Online">Online</option>
                      <option value="COD">Cash On Delivary</option>
                    </select>
                  </div>
                  {/* <input type="hidden" name="amt" value="690" />
                  <input type="hidden" value="43" name="uid" /> */}

                  {cartList.length !== 0 && (
                    <button className="btn btn-success col-md-12 text-white">
                      Place Order
                    </button>
                  )}

                  {cartList.length === 0 && (
                    <button
                      className="btn btn-success col-md-12 text-white"
                      disabled
                    >
                      Place Order
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
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
    </div>
  );
};

export { Cart };
