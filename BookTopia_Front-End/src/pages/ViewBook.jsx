import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../model/Book";
import bookService from "../service/book.service";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../service/cart.service";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API_URL } from "../common/constant";
import { Rating } from "@mui/material";
import wishlistService from "../service/wishlist.service";

const ViewBook = () => {
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useState({
    id: "",
    bookId: "",
    userId: "",
    quantity: "",
  });
  const [wishList, setWishList] = useState({
    id: "",
    bookId: "",
    userId: "",
  });

  const [book, setBook] = useState(
    new Book("", "", "", "", "", "", "", "", "", "", "")
  );

  const [cartStatus, setCartStatus] = useState(false);
  const [wishlistStatus, setwishlistStatus] = useState(false);

  const { id } = useParams();
  const user = useSelector((st) => st.user);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      let bk = await bookService.getBookById(id);
      setBook(bk.data);
      setRating(bk.data.avgRating);
      cart.bookId = bk.data;
      cart.userId = user;
      let review = await bookService.getReviewsByBooks(id);
      setReviews(review.data);
      let stt = await cartService.checkCartBook(user.id, id);
      setCartStatus(stt.data);
      let wishlistStatuss = await wishlistService.checkWishlist(user.id, id);
      setwishlistStatus(wishlistStatuss.data);
    } catch (error) {
    
    }
  };

  const notify = () =>
    toast.success("Added to Cart", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const WishNotify = () =>
    toast.success("Added to Wishlist", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const addToCart = (b) => {
    if (!user) {
      navigate("/login");
    } else {
      cart.bookId = b.id;
      cart.userId = user.id;
      cart.quantity = 1;

      cartService
        .addCart(cart)
        .then((res) => {
          cart.id = res.data.id;
          setCart();
          notify();
          init();
        })
        .catch((error) => {
        });
    }
  };

  const addToWishlist = (b) => {
    if (!user) {
      navigate("/login");
    } else {
      wishList.bookId = b.id;
      wishList.userId = user.id;

      wishlistService
        .addWishlist(wishList)
        .then((res) => {
          wishList.id = res.data.id;
          WishNotify();
          init();
        })
        .catch((error) => {
        });
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <p className="fs-3 text-center">Book Details</p>
        <div className="col-md-12 paint-card p-5">
          <div className="row">
            <div className="col-md-6 text-end">
              <img
                alt=""
                src={BASE_API_URL + "/" + book.img}
                width="330px"
                height="400px"
              />
            </div>

            <div className="col-md-6">
              <p className="fs-3">{book.bookName}</p>
              {/* <p>
                {}
              </p> */}
              <Rating
                name="read-only"
                value={rating}
                readOnly
                precision={0.1}
              />
              <p>
                <span className="fw-bold">Description : </span>
                <br />
                {book.description}
              </p>
              <p>
                <span className="fw-bold"> Book Deatils: </span> <br />
                ISBN NO : {book.isbnNo} <br /> Author : {book.author} <br />
                Category : {book.category}
              </p>
              <p className="fs-5 fw-bold">
                Price :&nbsp;
                {/* <i className="fas fa-rupee-sign"></i> */}
                &nbsp; ₹ {book.price}
              </p>
             <div className="container col-8">
              <div className="d-flex justify-content-between align-items-center">
                <div className="col-md-6 text-info text-center p-2">
                  <i className="fas fa-money-bill-wave fa-2x"></i>
                  <p>Cash On Delivery</p>
                </div>
             
                <div className="col-md-6 text-info text-center p-2">
                  <i className="fas fa-truck-moving fa-2x"></i>
                  <p>Free Shipping</p>
                </div>
              </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {!cartStatus && book.status && (
                  <a
                    onClick={() => addToCart(book)}
                    className="btn btn-primary col-md-4 "
                  >
                    <i className="fa-solid fa-cart-shopping mx-1"></i>

                    <>Add To Cart</>
                  </a>
                )}
                {!cartStatus && !book.status && (
                  <a className="btn btn-primary col-md-4 disabled ">
                    <i className="fa-solid fa-cart-shopping mx-1"></i>

                    <>Book Unavailable</>
                  </a>
                )}

                {cartStatus && (
                  <a className="btn btn-primary col-md-4 disabled">
                    <i className="fa-solid fa-cart-shoppinmx-2g mx-1"></i> Added To
                    Cart
                  </a>
                )}

                {!wishlistStatus && (
                  <a
                    onClick={() => addToWishlist(book)}
                    className="btn btn-danger col-md-4 mx-2"
                  >
                    <i className="fa-solid fa-heart mx-1"></i>
                    Add To Wishlist
                  </a>
                )}

                {wishlistStatus && (
                  <a className="btn btn-danger col-md-4 mx-2 disabled">
                    <i className="fa-solid fa-heart mx-1"></i>
                    Added To Wishlist
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="my-10 conatiner">
            <br />
            <div className="row" >
              {/* <div className="container row d-flex card py-10 bg-danger">
                 */}
                 {reviews.length==0 && <p style={{fontSize:'larger'}}>No Reviews ...</p>
} 
                {reviews.length!=0 && reviews.map((r) => {
                  return (
                    <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center" key={r.id}>
                    <div className="card d-flex paint-card" style={{width : 350, height :250}}>
                      <div className="card-header">
                        <p className="card-title fs-5">
                          {r.custName} &nbsp;&nbsp;&nbsp;&nbsp;{r.date}
                        </p>
                        <Rating
                          name="read-only"
                          value={r.rating}
                          readOnly
                          precision={0.1}
                        />
                      </div>
                      <div className="card-body">
                        <p className="card-text">{r.content}</p>
                      </div>
                    </div>
                    </div>
                  );
                })}
              {/* </div> */}
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
  );
};

export { ViewBook };