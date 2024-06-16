import { Modal } from "react-bootstrap";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const DeleteAlert = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({

        showDeleteModel() {
            setShow(true);
        }
    }))


    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const deleteCategory = () => {
        props.onConfirmed();
        setShow(false);
    }
    useEffect(()=>{
        setMessage(props.message)
    },[props.message])

    return (
        <Modal show={show}>
            <div className="modal-header">
                <h5 className="modal-tittle"></h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">

                <div className="text-center">
                    <h5>Are you Sure you want to {message}</h5>
                    <button className="btn btn-primary" onClick={() => deleteCategory()}>Yes</button>
                    <button className="btn btn-danger ms-2" onClick={() => setShow(false)}>No</button>
                </div>
            </div>
        </Modal>
    );


})

export { DeleteAlert };