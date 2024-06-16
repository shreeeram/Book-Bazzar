import { useRef } from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BASE_API_URL } from "../../common/constant";
import orderService from "../../service/order.service";
import c from "./../../img/c.png";
import { ViewOrder } from "./ViewOrder";

const Orders = () => {
    const [orderContent, setOrderContent] = useState("AllOrders");
    const [orderList, setOrderList] = useState([]);
    const orderComponet = useRef();
    const [selectedOrder, setSelectedOrder] = useState({
        id: "",
        user: "",
        book: "",
        quantity: "",
        paymentType: "",
        orderNumber: "",
        date: "",
        status: "",
    });

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        orderService
            .getAllOrder()
            .then((res) => {
                setOrderList(res.data);
            })
            .catch((error) => {
            });
    };

    const viewOrderDetails = (ord) => {
        setSelectedOrder(Object.assign({}, ord));
        orderComponet.current?.showOrderModal();
    };

    const updateSt = (msg) => {
        init();
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



        <div>
            <div className="row mt-5 justify-content-center" >
                <button type="button" className="btn btn-primary mr-2" style={{ width: '150px' }} onClick={() => { setOrderContent("AllOrders") }}>All Orders</button>
                <button type="button" className="btn btn-danger mx-2" style={{ width: '150px' }} onClick={() => { setOrderContent("Order Recieved") }} >Pending Orders</button>
                <button type="button" className="btn btn-warning mx-2" style={{ width: '160px' }} onClick={() => { setOrderContent("Order Processing") }}>Processing Orders</button>
                <button type="button" className="btn btn-info mx-2" style={{ width: '155px' }} onClick={() => { setOrderContent("Order Packed") }}>Packed Orders</button>
                <button type="button" className="btn btn-success mx-2" style={{ width: '155px' }} onClick={() => { setOrderContent("Out for delivery") }}>OutForDelivery</button>
                <button type="button" className="btn btn-secondary mx-2" style={{ width: '155px' }} onClick={() => { setOrderContent("Order delivered") }}>Delivered Orders</button>

            </div>
            <div className="card paint-card my-5">
                <div className="card-body">
                    <h4 className="form-signin-heading text-center">Order Details({orderContent})</h4>

                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Image</th>

                                <th scope="col">Order Id</th>

                                <th scope="col">Order Date</th>

                                <th scope="col">Book Details</th>

                                <th scope="col">Status</th>
                                <th scope="col">Full Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((item) => {
                                if (orderContent == "AllOrders" || item.status == orderContent) {
                                    return (<tr onClick={() => viewOrderDetails(item)} key={item.id}>
                                        <th scope="row">
                                            <img
                                                src={BASE_API_URL + "/" + item.book.img}
                                                width="70px"
                                                height="70px"
                                            />
                                        </th>

                                        <th scope="row">{item.orderNumber}</th>
                                        <td>{item.date}</td>

                                        <td>{item.book.bookName}</td>

                                        <td>{item.status}</td>
                                      
                                            <td>
                                                <button
                                                    onClick={() => viewOrderDetails(item)}
                                                    className="btn btn-sm btn-success"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        
                                    </tr>)

                                }

                            }

                            )}
                        </tbody>
                    </table>
                </div>
                <ViewOrder
                    ref={orderComponet}
                    orders={selectedOrder}
                    onUpdate={() => updateSt("Order Status Updated")}
                />

                <ToastContainer
                    position="top-right"
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

export { Orders };