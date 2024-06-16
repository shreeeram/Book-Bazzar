
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../../model/Book";
import bookService from "../../service/book.service";
import categoryService from "../../service/category.service";
import "./AddBook.css";
import { ToastContainer, toast } from "react-toastify";

const AddBook = () => {
  const [book, setBook] = useState({
    bookName:"",
    description:"",
    author:"",
    category:"",
    isbnNo:"",
    language:"",
    price:""

});
  const [imgFile, setImgFile] = useState(null);

  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();

  const handleBookImage = (e) => {
    setImgFile(e.target.files[0]);
  };
  

  const handleBook = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const notify = () =>
    toast.success("Book Added Sucesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const registerBook = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("bookName", book.bookName);
    fd.append("description", book.description);
    fd.append("author", book.author);
    fd.append("categorysId", book.categorysId);
    fd.append("isbnNo", book.isbnNo);
    fd.append("language", book.language);
    fd.append("price", book.price);
   // fd.append("file", imgFile);

   // console.log(fd);
    // console.log(JSON.stringify(book.category));
  //console.log(book);
    bookService
      .saveBook(book)
      .then((res) => {
       // console.log(res.data.id);
          bookService.uploadProductImage(imgFile,res.data.id)
        notify();
       setBook( new Book("", "", "", "", "", "", "", "", ""));
      })
      .catch((error) => {
       // console.log(error);
      });
  };

  useEffect(() => {
    categoryService
      .getAllCategory()
      .then((response) => {
        setCategoryList(response.data);
        // console.log(response.data);
      })
      .catch();
  }, []);

  return (
    <div class="card paint-card cardx">
      <div class="card-body">
        <h4 class="form-signin-heading text-center">Add Book</h4>
        <form
          noValidate
          class="form-signin"
          method="post"
          onSubmit={(e) => registerBook(e)}
        >
          <div className="row">
            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Book Name
              </label>
              <input
                type="text"
                class="form-control"
                required
                name="bookName"
                value={book.bookName}
                onChange={(e) => handleBook(e)}
              />
            </div>

            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Author
              </label>
              <input
                type="text"
                class="form-control"
                required
                name="author"
                value={book.author}
                onChange={(e) => handleBook(e)}
              />
            </div>
          </div>

          <div className="row">
            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Category
              </label>
              <select
                name="category"
                class="form-control"
                onChange={(e) => handleBook(e)}
              >
                <option>--select--</option>
                {categoryList.map((category, num) => (
                  <option value={category.categoryName}>{category.categoryName}</option>
                ))}
              </select>
            </div>

            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                ISBN No
              </label>
              <input
                type="text"
                class="form-control"
                required
                name="isbnNo"
                value={book.isbnNo}
                onChange={(e) => handleBook(e)}
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Price
              </label>
              <input
                type="number"
                class="form-control"
                required
                name="price"
                value={book.price}
                onChange={(e) => handleBook(e)}
              />
            </div>

            <div class="mb-3 col">
              <label for="exampleInputEmail1" class="form-label">
                Image
              </label>
              <input
                type="file"
                class="form-control"
                required
                name="img"
                onChange={handleBookImage}
              />
            </div>
          </div>

          <div class="mb-3 col">
            <label for="exampleInputEmail1" class="form-label">
              Language
            </label>
            <input
              type="text"
              class="form-control"
              required
              name="language"
              value={book.language}
              onChange={(e) => handleBook(e)}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Description
            </label>
            <textarea
              rows="3"
              cols=""
              class="form-control"
              name="description"
              value={book.description}
              onChange={(e) => handleBook(e)}
            ></textarea>
          </div>
          <button class="btn bg-primary text-white col-md-12" type="submit">
            Submit
          </button>

          <div class="text-center p-3"></div>
        </form>
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
    </div>
  );
};

export { AddBook };
