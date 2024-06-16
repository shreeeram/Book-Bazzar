import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import bookService from "../service/book.service";
import { useState } from "react";
import { BASE_API_URL } from "../common/constant";
import { toast, ToastContainer } from "react-toastify";
import { Pagination, Stack, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const CategoryBooks = (props) => {
  const [book, setBook] = useState([]);
  const navigate =useNavigate();
  const location = useLocation();

  useEffect(() => {
    init();
  }, []);
  const init = () => {
       

    bookService
      .getBooksByCategoryId(location.state.id)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
      });

      
  };
  const notify = () => {
    toast.error("Not Available", {
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
    <> 
   
      <div
        className="container-fluid  p-3 bg-light "
        style={{ backgroundColor: "#f0f1f2" }}
      >
      </div>
      <div className="cotainer mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card paint-card bg-image hover-overlay hover-zoom hover-shadow ripple">
              <div className="card-body">
                <p className="fs-3 text-center text-uppercase" style={{fontWeight:'bolder'}}>{location.state.name} Books</p>
                <div className="row p-3">
                  {
                    book.map((book) => {
                      return (
                        
                        <div className="p-5 col-lg-3 col-md-4 col-sm-12" key={book.id}>
                        <Card className="px-3 pt-3" key={book.id} sx={{ width: 400 }}>
                          <div className="d-flex justify-content-center">
                            <img className="img-fluid" style={{
                              height: 300,
                              width: 200
                            }} src={BASE_API_URL + "/" + book.img} />
                          </div>
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: "hidden", whiteSpace: 'nowrap' }}>
                              {book.bookName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" 
                             style={{
                                fontWeight: 600,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}>
                              {book.description}
                            </Typography>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                              <Typography variant="h6" style={{ fontWeight: 600 }}>
                                ₹{book.price}
                              </Typography>
                              <Button size="small" variant="contained" onClick={() => navigate("/viewBook/" + book.id)}>View Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

            
            </div>

          </div>

        </div>

      </div> 
      * <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export  { CategoryBooks };