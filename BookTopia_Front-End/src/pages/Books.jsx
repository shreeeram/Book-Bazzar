
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../component/footer/Footer";
import { useEffect } from "react";
import bookService from "../service/book.service";
import { useState } from "react";
import { BASE_API_URL } from "../common/constant";
import { toast, ToastContainer } from "react-toastify";
import { Pagination, Stack, Typography } from "@mui/material";
import Carousel from '../component/Carousel/Carousel.jsx'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const Books = () => {
  const [book, setBook] = useState([]);
  

  const [totalPages,setTotalPages]=useState(0);

  const navigate =useNavigate();

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    bookService
      .getAllBookByPag(value - 1)
      .then((res) => {
      setTotalPages(res.data.totalPages)
        setBook(res.data.book);
      })
      .catch((error) => {
      });
  };


  useEffect(() => {
    init();
  }, []);

  const init = () => {
       

    bookService
      .getAllBookByPag(0)
      .then((res) => {
       setTotalPages(res.data.totalPages)
        setBook(res.data.book);
       
      })
      .catch((error) => {
      });

      
  };

  const [ch, setCh] = useState();

  const handleSearch = (e) => {
    setCh(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();

    if (!ch) {
      init();
    } else {
      bookService
        .searchBook(ch)
        .then((res) => {

          if (res.data.length > 0) {
            if(res.data.length/6>0){
              
            setTotalPages(res.data.length/6)
            }
            setBook(res.data);
          } else {
            notify();
          }
        })
        .catch((error) => {
        });
    }
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
        
        <div className="row ">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={(e) => search(e)} method="post">
              <div className="input-group">
                <input
                placeholder="Search book by Name or Author..."
                  type="text"
                  className="form-control"
                  name="ch"
                  onChange={(e) => handleSearch(e)}
                />
                <button className="btn bg-primary ms-2 text-white">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="cotainer mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card paint-card bg-image hover-overlay hover-zoom hover-shadow ripple">
              <div className="card-body">
                <p className="fs-3 text-center">All Books</p>
                <div className="row p-3">
                  {
                    book.map((book) => {
                      return (
                       
                        <div className="p-5 col-lg-3 col-md-4 col-sm-12" key={book.id} onClick={() =>
                          navigate("/viewBook/" + book.id)
                        }>
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
                            <Typography variant="body2" color="text.secondary" style={{
                                    textOverflow :'ellipsis',
                                    overflow :'hidden',
                                    whiteSpace :'nowrap',
                                    
                                }}>
                              {book.description}
                            </Typography>
                            <div className="d-flex align-items-center justify-content-between">
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
          <div className="d-flex justify-content-center">
        
            <Stack spacing={2}>
            
              <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>
          </div>
        </div>

      </div>
      <ToastContainer
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

export { Books };
