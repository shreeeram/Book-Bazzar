import { useEffect, useRef, useState } from "react";
import { CategoryEdit } from "../../component/Category/CategoryEdit";
import { DeleteAlert } from "../../component/Category/DeleteAlert";
import Category from "../../model/Category";
import categoryService from "../../service/category.service";

const ViewCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectCategory, setSelectedCategory] = useState(
    new Category("", "", "")
  );
  const [message, setMessge] = useState("");
  const editCategoryComponent = useRef();
  const deleteCategoryComponent = useRef();

  useEffect(() => {
    categoryService
      .getAllCategory()
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch();
  }, []);

  const editCategoryRequest = (ca) => {
    setSelectedCategory(Object.assign({}, ca));
    editCategoryComponent.current?.showCategoryModel();
  };

  const deleteCategoryRequest = (item) => {
    setSelectedCategory(item);
    deleteCategoryComponent.current?.showDeleteModel();
  };

  const deleteCategory = () => {
    categoryService
      .deleteCategory(selectCategory)
      .then(() => {
        setMessge("Delete Sucessfully");
        setCategoryList(categoryList.filter((x)=>x.id!==selectCategory.id));
      })
      .catch((error) => {
      });
  };

  const updateCategoryWatcher = (ca) => {
    let itemIndex = categoryList.findIndex((item) => item.id === ca.id);
    if (itemIndex !== -1) {
      const newList = categoryList.map((item) => {
        if (item.id === ca.id) {
          return ca;
        }
        return item;
      });
      setMessge("category update sucesfully");
      setCategoryList(newList);
    }
  };

  return (
    <div className="card paint-card cardx">
      <div className="card-body">
        <h4 className="form-signin-heading text-center">Category Details</h4>
        {message && (
          <p className="text-center fw-bold text-success fs-5">{message}</p>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((item, num) => (
              <tr key={item.id}>
                <th scope="row">{num + 1}</th>
                <td>{item.categoryName}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={() => editCategoryRequest(item)}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CategoryEdit
        //call child component
        ref={editCategoryComponent}
        //send data to child from parent
        category={selectCategory}
        // recive data from child
        onUpdated={(c) => updateCategoryWatcher(c)}
      />

      <DeleteAlert
        ref={deleteCategoryComponent}
        message={"Delete"}
        onConfirmed={() => deleteCategory()}
      />
    </div>
  );
};

export { ViewCategory };
