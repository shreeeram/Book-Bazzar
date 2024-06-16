import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import Category from "../../model/Category";
import categoryService from "../../service/category.service";

const CategoryEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({

        showCategoryModel() {
            setShow(true);
        }

    }));


    const [show, setShow] = useState(false);
    const [category, setCategory] = useState(new Category("", "", ""));

    useEffect(() => {
        setCategory(props.category);
    }, [props.category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const updateCategory = (e) => {
        e.preventDefault();
        categoryService.updateCategory(category).then((response) => {
            props.onUpdated(response.data);
            setShow(false);
        }

        ).catch((error) => {
            console.log(error);
        });
    }


    return (
        <Modal show={show}>

            <div className="modal-header">
                <h5 className="modal-title">Category Details</h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                        setShow(false);
                    }}
                ></button>
            </div>
            <div className="modal-body">
                <form onSubmit={(e) => updateCategory(e)}>
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
                        Update
                    </button>

                    <div class="text-center p-3">
                        <button type="button" onClick={() => setShow(false)} class="btn btn-danger text-white">
                            Close
                        </button>
                    </div>
                </form>

            </div>

        </Modal>
    );

});

export { CategoryEdit };