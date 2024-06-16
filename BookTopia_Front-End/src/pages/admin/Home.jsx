import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import bookService from "../../service/book.service";
import userService from "../../service/user.service";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import PieChart from "./PieChart";
import orderService from "../../service/order.service";
import { CategoryBooks } from "../CategoryBooks";

const Home = () => {
    // const [count, setCount] = useState({
    //   book: "",
    //   category: "",
    //   order: "",
    // });
 
    const [uCount, setUcount] = useState(0);
    const [bCount, setBcount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [data, setData] = useState([]);
    const [pieFlag, setPieFlag]=useState(true);
    const [pieValues,setPieValues]=useState([]);
 

    useEffect(() => {
        init();
    }, []);




    const init = async () => {

        let c = await bookService.countDetails();
      
        setBcount(c.data);

        let rep = await bookService.getReport("2023");
        setData(rep.data);

        let u = await userService.userCount();
        setUcount(u.data);

        let r = await userService.getRevenue();
        setRevenue(r.data);

        let values=await orderService.getPieValues();
        setPieValues(values.data);


    };

    return (
        <div className="row card mt-3" style={{
            height : 'calc(100vh - 100px)'
        }} >
            
            <p class="text-center fs-1">Admin Dashboard</p>
            <div className="row">
                <div class="col-md-3">
                    <a class="text-decoration-none bg-custom">
                        <div class="card paint-card">
                            <div class="card-body text-center rounded-9" style={{backgroundColor:'#BBDEFB'}}>
                                <i class="bi bi-cash-coin fa-2x"></i>
                                <br />
                                <p class="fs-3 text-dark">Revenue</p>
                                <p class="fs-3 text-dark">{parseFloat((revenue).toFixed(2))}</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-md-3">
                    <a class="text-decoration-none bg-custom">
                        <div class="card paint-card">
                            <div class="card-body text-center rounded-9" style={{backgroundColor:'#FFCDD2'}}>
                                <i class="bi bi-coin fa-2x"></i>
                                <br />
                                <p class="fs-3 text-dark">Profit</p>
                                <p class="fs-3 text-dark">{parseFloat((revenue * 0.3).toFixed(2))}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-3">
                    <a class="text-decoration-none bg-custom">
                        <div class="card paint-card">
                            <div class="card-body text-center rounded-9" style={{backgroundColor:'#E6EE9C'}}>
                                <i class="bi bi-book fa-2x"></i>
                                <br />
                                <p class="fs-3 text-dark"> Books</p>
                                <p class="fs-3 text-dark">{parseFloat(bCount.toFixed(2))}</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-3">
                    <a class="text-decoration-none bg-custom">
                        <div class="card paint-card">
                            <div class="card-body text-center rounded-9" style={{backgroundColor:'#E1BEE7'}}>
                                <i class="bi bi-people fa-2x"></i>
                                <br />
                                <p class="fs-3 text-dark">Users</p>
                                <p class="fs-3 text-dark">{uCount}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                <LineChart width={800} height={400} data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="totalSales" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
                <div className="d-flex justify-content-center align-item-center">
                <p style={{fontWeight:"bolder" , fontSize:'larger'}}>Monthly Orders</p>
                </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="p-5">
                    
               {pieFlag &&
                    <>
                  
                     <PieChart  orderdata={pieValues}/>
                    </>
               }
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Home;