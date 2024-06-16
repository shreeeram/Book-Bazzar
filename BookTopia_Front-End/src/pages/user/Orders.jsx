import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../../common/constant";
import orderService from "../../service/order.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderContent,setOrderContent] = useState("AllOrders") ;
  const navigate = useNavigate();

 const user= useSelector((u)=>u.user)

  useEffect(() => {
    orderService
      .getOrderByUser(user.id)
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => {
        navigate('/')
        
      });
  }, []);

  return (
    
    <div className="min_height_container">
      <div className="container mt-10">
      <div className="card paint-card">
        <div className="card-body">
       
        <h4 className="form-signin-heading text-center">Order Details</h4>
        <div className="container-fluid">
        <div style={{textAlign:'center'}}>
        <button type="button" className="btn btn-primary mr-2" style={{ width: '150px', }} onClick={()=>{ setOrderContent("AllOrders")}}>All Orders</button>
        </div>
        </div>
        
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Order Id</th>
                <th scope="col">Book Details</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Payment Type</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((item, ind) => {
               // console.log(item)
                if(orderContent=="AllOrders" || item.status == orderContent)
                return(<tr key={item.id}  onClick={()=>{
                  navigate("/OrderDetails5", {
                    state: item
                });
              
            }}>
                  <th scope="row">
                    <img
                      src={BASE_API_URL + "/" + item.book.img}
                      width="70px"
                      height="70px"
                    />
                  </th>

                  <th scope="row">{item.orderNumber}</th>

                  <td>
                    {item.book.bookName}
                    <br />
                    Author: {item.book.author}
                    <br />
                    ISBN :{item.book.isbnNo} 
                  
                  </td>

                  <td>{item.quantity}</td>

                  <td>{item.price}</td>
                  <td>{item.paymentType}</td>
                  <td >{item.status} 
                  </td>
                </tr>)
                
})}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Orders;