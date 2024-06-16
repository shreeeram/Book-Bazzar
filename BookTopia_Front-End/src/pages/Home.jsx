import { Link, NavLink, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bookService from "../service/book.service";
import { BASE_API_URL } from "../common/constant";
import Carousel from "../component/Carousel/Carousel.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CategoryBooks } from "./CategoryBooks";
import { Footer } from "../component/footer/Footer";
const Home = () => {
  const navigate = useNavigate();
  const [bookss, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    bookService.getAllCategories().then((res) => {
      setCategories(res.data);
    });

    bookService.getAllBook().then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#f6f6f6" }} className="min_height_container">

      <Carousel />

      {categories.map((category) => {
        return (
          <div key={category.id} >
            <div className="container border rounded-4 my-5 bg-white">
              <h4 className="text-center pt-3" style={{ fontWeight: "bold" }}>
                {category.categoryName}
              </h4>
              <div class="overflow-auto book-main-card">
                <div className="d-flex ">
                  {bookss.map((book) => {
                    if (
                      book.category == category.categoryName &&
                      book.status == 1
                    )
                      return (
                        <div className="px-5 pb-5 pt-3 d-flex justify-content-center"key={book.id}  onClick={() =>
                          navigate("/viewBook/" + book.id)
                        }>
                          <Card key={book.id} sx={{ width: 300 }}>
                            <div className="d-flex justify-content-center">
                              <img
                                className="img-fluid"
                                style={{
                                  height: 250,
                                  width: 180,
                                }}
                                src={BASE_API_URL + "/" + book.img}
                              />
                            </div>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                style={{
                                  fontWeight: 600,
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {book.bookName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{
                                    textOverflow :'ellipsis',
                                    overflow :'hidden',
                                    whiteSpace :'nowrap',
                                    
                                }}

                            
                              >
                                {book.description}
                              </Typography>
                              <div className="d-flex align-items-center justify-content-between">
                                <Typography
                                  variant="h6"
                                  style={{ fontWeight: 600 }}
                                >
                                  ₹{book.price}
                                </Typography>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() =>
                                    navigate("/viewBook/" + book.id)
                                  }
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                  })}
                </div>
              
              </div>
              <div className="d-flex justify-content-end pb-3 pr-4">
                <button  className="border-0 bg-transparent text-primary" onClick={()=>{ navigate("/categorypage", {state: {id:category.id,name:category.categoryName}})}}>More...</button>
                </div>
            </div>

          </div>
        );
      })}
   </div>

  );
};

export { Home };