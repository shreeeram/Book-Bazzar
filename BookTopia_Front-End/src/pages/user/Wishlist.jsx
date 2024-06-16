import { useRef, useState } from "react";
import { useEffect } from "react";

import wishlistService from "../../service/wishlist.service";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API_URL } from "../../common/constant";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cartService from "../../service/cart.service";
import Image from '../../img/poster-with-people-reading-books-library_655090-62858.jpg'

const Wishlist = () => {
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
  const [cartStatus, setCartStatus] = useState(false);

  const [wishList, setwishList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tot, setTot] = useState(0);
  const [pymtType, setPymtType] = useState("");
  const navigate = useNavigate();
  const loginUser = useSelector((u) => u.user);

  const [cart, setCart] = useState({
    id: "",
    bookId: "",
    userId: "",
    quantity: "",
  });

  useEffect(() => {
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
    let wishlistt = await wishlistService.getWishlist(user.id);
    setwishList(wishlistt.data);
  };

  const remove = (id) => {
    wishlistService.deleteWishlist(id).then((data) => {
      notify("Removed from Wishlist");
      init();
    });
  };

  const addToCart = (item) => {
    if (!user) {
      navigate("/login");
    } else {
      cart.bookId = item.book.id;
      cart.userId = user.id;
      cart.quantity = 1;

      cartService
        .addCart(cart)
        .then((res) => {
          cart.id = res.data.id;
          setCart();
          notify("Added To Cart");
          init();
          remove(item.id);
        })
        .catch((error) => {
        });
    }
  };

  const notify = (msg) =>
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-7">
          <table className="table ">
            <thead className="text-center bg-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {wishList.map((item) => {
               

                return (
                  <tr key={item.id}>
                    <th scope="row">
                      <img
                        src={BASE_API_URL + "/" + item.book.img}
                        width="80px"
                        height="110px"
                      />
                    </th>
                    <td>{item.book.bookName}</td>
                    <td>{item.book.price}</td>

                    <td>
                      
                      {!item.cartStatus && item.book.status && (
                        <button
                          className="btn-primary btn"
                          onClick={() => {
                            addToCart(item);
                          }}
                        >
                          Add To Cart
                        </button>
                      )}

                      {!item.cartStatus && !item.book.status &&  (
                        <button
                          className="btn-secondary btn"
                        >
                         Book Unavailable
                        </button>
                      )}

                      {item.cartStatus && (
                        <button className="btn-primary btn disabled">
                          Added To Cart
                        </button>
                      )}

                      <button
                        className="btn-danger mx-1 btn"
                        onClick={() => {
                          remove(item.id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
        <div className="col-md-3 justify-content-center align-item-center">
          <img className="border rounded-8" src={Image}  />
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
  );
};

export default Wishlist;
