import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { Modal } from "react-bootstrap";
import { BASE_API_URL } from "../../common/constant";
import orderService from "../../service/order.service";

const ViewOrder = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showOrderModal() {
      setShow(true);
    },
  }));

  const [show, setShow] = useState(false);
  const [payment,setPayment]=useState([]);
  const [ord, setOrd] = useState({
    id: "",
    user: "",
    book: "",
    quantity: "",
    paymentType: "",
    orderNumber: "",
    date: "",
    status: "",
  });

  const [ordStatus, setOrdStatus] = useState("");
  const [id, setId] = useState("");
  const refs = useRef();

  useEffect(() => {
    setOrd(props.orders);
    if(props.orders.id!="")
    orderService.getPaymentDetails(props.orders.id)
     .then(res=>{
      setPayment(res.data)
     })
     .catch(er=>{
      alert("error")
     })
  }, [props.orders]);

  const handleStatus = (e) => {
    setOrdStatus(e.target.value);
  };

  const updateStatus = (e) => {
    e.preventDefault();

    orderService
      .updateOrder(refs.current.value, ordStatus)
      .then((res) => {
        props.onUpdate();
        setShow(false);
      })
      .catch((error) => {
      });
  };

  return (
    <Modal show={show} size="lg">
      <div className="modal-header">
        <h5 className="modal-title">Order Details</h5>

        <button
          type="button"
          className="btn-close"
          onClick={() => {
            setShow(false);
          }}
        ></button>
      </div>
      <div className="modal-body">
        <div className="card">
          <div className="card-body">
            <table class="table table-borderless ms-2">
              <tbody>
                <tr className="text-center">
                  <td colSpan={3}>
                    <img
                      src={BASE_API_URL + "/" + ord.book.img}
                      width="130px"
                      height="130px"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <u>Order Details</u>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center">
                    Order Id
                  </th>
                  <td>:</td>
                  <td>{ord.orderNumber}</td>
                </tr>
                <tr>
                  <th scope="row" className="text-center">
                    Order Date
                  </th>
                  <td>:</td>
                  <td>{ord.date}</td>
                </tr>

                <tr>
                  <th scope="row" className="text-center">
                    Quantity
                  </th>
                  <td>:</td>
                  <td>{ord.quantity}</td>
                </tr>
                
                <tr>
                  <th scope="row" className="text-center">
                    Status
                  </th>
                  <td>:</td>
                  <td>{ord.status}</td>
                </tr>
                <tr>
                  <td>
                    <u>Payment Details</u>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center">
                    PaymentType
                  </th>
                  <td>:</td>
                  <td>{payment.paymentType}</td>
                </tr>
                {payment.status  &&
                <tr>
                  <th scope="row" className="text-center">
                    Payment Id
                  </th>
                  <td>:</td>
                  <td>{payment.razPaymentId}</td>
                </tr>
}
                {payment.status 
              &&
                  <tr>
                  <th scope="row" className="text-center">
                  Transaction Id
                  </th>
                  <td>:</td>
                  <td>{payment.razOrderId}</td>
                </tr>
                }

                
                <tr>
                  <td>
                    <u>User Details</u>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center">
                    Customer Name :
                  </th>
                  <td>:</td>
                  <td>{ord.user.name}</td>
                </tr>

                <tr>
                  <th scope="row" className="text-center">
                    Delivery Address :
                  </th>
                  <td>:</td>
                  <td>
                    {ord.user.address} ,{ord.user.city},{ord.user.state} ,
                    {ord.user.pincode}
                  </td>
                </tr>

                <tr>
                  <td>
                    <u>Book Details</u>
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="text-center">
                    Book Name
                  </th>
                  <td>:</td>
                  <td>{ord.book.bookName}</td>
                </tr>

                <tr>
                  <th scope="row" className="text-center">
                    Author
                  </th>
                  <td>:</td>
                  <td>{ord.book.author}</td>
                </tr>

                <tr>
                  <th scope="row" className="text-center">
                    ISBN No
                  </th>
                  <td>:</td>
                  <td>{ord.book.isbnNo}</td>
                </tr>

                <tr>
                  <th scope="row" className="text-center">
                    Price
                  </th>
                  <td>:</td>
                  <td>{ord.book.price}</td>
                </tr>
              </tbody>
            </table>

            <div>
              <p className="fs-6">
                <u>Status Update</u>
              </p>
              <form onSubmit={(e) => updateStatus(e)}>
                <input type="hidden" value={ord.id} name="id" ref={refs} />
                <div class="row">
                  <div class="col-md-10">
                    <select
                      name="st"
                      class="form-control form-control-sm"
                      onChange={(e) => handleStatus(e)}
                    >
                      <option>--select--</option>
                      <option>Order Processing</option>
                      <option>Order Recieved</option>
                      <option>Order Packed</option>
                      <option>Out for delivery</option>
                      <option>Order delivered</option>
                    </select>
                  </div>

                  {ord.status === "Order delivered" && (
                    <div class="col ">
                      <button class="btn btn-sm btn-primary ml-2" disabled>
                        update
                      </button>
                    </div>
                  )}

                  {ord.status !== "Order delivered" && (
                    <div class="col ">
                      <button class="btn btn-sm btn-primary ml-2" >
                        update
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="text-center p-3">
          <button
            type="button"
            onClick={() => setShow(false)}
            class="btn btn-danger text-white"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
});

export { ViewOrder };
