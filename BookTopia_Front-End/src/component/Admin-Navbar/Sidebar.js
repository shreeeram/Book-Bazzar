import React, { useState } from 'react';
import './assets/css/style.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/img/apple-touch-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from '../../store/action/user.action';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/login")
    }

    const [activeElem, setActiveElem] = useState("Dashboard");
    return (
        <div>
            {/* id="sidebar" className="sidebar" */}
            <aside id="sidebar" className="sidebar" >

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item" style={{
                        backgroundColor: activeElem ==="Dashboard" ? "#f6f9ff" : ""
                    }} onClick={()=>setActiveElem("Dashboard")}>
                        <Link to="/admin/home" className="nav-link ">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#category-nav" data-bs-toggle="collapse" href="#"  style={{
                        backgroundColor: activeElem ==="Category" ? "#f6f9ff" : ""
                    }} onClick={()=>setActiveElem("Category")}>
                            <i className="bi bi-menu-button-wide"></i><span>Category</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="category-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li >
                                <Link to="addCategory">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>Add</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="viewCategory">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>View</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#book-nav" data-bs-toggle="collapse" href="#" style={{
                        backgroundColor: activeElem ==="Book" ? "#f6f9ff" : ""
                    }} onClick={()=>setActiveElem("Book")}>
                            <i className="bi bi-journal-richtext"></i>
                            <span>Book</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="book-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="addBook">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>Add</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="viewBook">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>View</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* <li className="nav-heading">Pages</li> */}

                    <li className="nav-item"  style={{
                        backgroundColor: activeElem ==="Orders" ? "#f6f9ff" : ""
                    }} onClick={()=>setActiveElem("Orders")}>
                        <Link to="Orders" className="nav-link collapsed" >
                            <i className="bi bi-app"></i>
                            <span>Orders</span>
                        </Link></li>

                    
                    <li className="nav-item"  style={{
                        backgroundColor: activeElem ==="Logout" ? "#f6f9ff" : ""
                    }} onClick={()=>setActiveElem("Logout")}>
                        <a className="nav-link collapsed" onClick={() => logout()}>
                            <i className="bi bi-person"></i>
                            <span>Logout</span>
                        </a></li>



                </ul>
            </aside>
            {/* <!-- End Sidebar--> */}
        </div>
    )
}

export { Sidebar };
