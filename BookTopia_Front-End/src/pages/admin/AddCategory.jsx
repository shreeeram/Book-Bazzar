import { useState } from "react";
import Category from "../../model/Category";
import categoryService from "../../service/category.service";
import { Link, useNavigate } from "react-router-dom";
const AddCategory = () => {
  const [category, setCategory] = useState(new Category("", ""));
  const [message, setMessage] = useState("");

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    categoryService
      .saveCategory(category)
      .then(() => {
        setCategory(new Category("", "",""));
        setMessage("Category Add sucesfully");
       
      })
      .catch((error) => {
        setMessage("Something wrong on server");
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div class="card paint-card cardx">
        <div class="card-body">
          <h4 class="form-signin-heading text-center">Add Category</h4>
          {message && <p  className="text-center fw-bold text-success fs-5">{message}</p>}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Category Name
              </label>
              <input
                type="text"
                class="form-control"
                required
                name="categoryName"
                value={category.categoryName}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Description
              </label>
              <textarea required
                rows="4"
                className="form-control"
                name="description"
                onChange={(e) => handleChange(e)}
                value={category.description}
              ></textarea>
            </div>

            <button class="btn bg-primary text-white col-md-12" type="submit">
              Add
            </button>

            <div class="text-center p-3"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AddCategory };
