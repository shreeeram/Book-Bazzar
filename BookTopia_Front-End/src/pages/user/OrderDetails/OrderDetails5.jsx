import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import bookService from "../../../service/book.service";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { BASE_API_URL } from "../../../common/constant";
import { useLocation, useNavigate } from 'react-router-dom'
import { Rating } from "@mui/material";
import orderService from "../../../service/order.service";




const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));
function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AccessTimeOutlinedIcon />,
    2: <LocalShippingIcon />,
    3: <DirectionsRunIcon />,
    4: <CheckCircleOutlineIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Order Placed', 'Order Dispatched', 'Out For Delivery', 'Delivered'];

export default function OrderDetails5(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  let date = new Date().toLocaleDateString();
  const [status, setStatus] = useState(0);
  const [statusReview, setStatusReview] = useState(false);
  const [review, setReview] = useState({
    custId: "",
    custName: "",
    content: "",
    bookId: "",
    rating: 0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setReview((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const reviewSubmit = () => {
    bookService.addReviewByBookUser(review);
    navigate('/orders')
  }
  useEffect(() => {
    bookService.reviewExist(location.state.user.id, location.state.book.id).then(res => {
      setStatusReview(res.data);
    })


    if (location.state.status == "Order Packed") {
      setStatus(1);
    }
    if (location.state.status == "Order Recieved" || location.state.status == "Order Processing") {
      setStatus(0);
    }
    else if (location.state.status == "Out for delivery") {
      setStatus(2);
    }
    else if (location.state.status == "Order delivered") {
      setStatus(3);
    }

    setReview({
      custId: location.state.user.id,
      custName: location.state.user.name,
      content: "",
      bookId: location.state.book.id,
      rating: "0"
    })
    if (location.state.paymentType != "COD")
      orderService.getPaymentDetails(location.state.id)
        .then(res => {
          setPayment(res.data)
        })
    setStatusReview()
  }, [])

  return (

    <div className="main-height-container" >

      <div className="" style={{ height: '100%' }}>
        <section className="">
          <MDBContainer className="mt-5">
            <MDBRow className="justify-content-center align-items-center">
              <MDBCol md="10" lg="8" xl="6">
                <MDBCard
                  className="card-stepper"
                  style={{ borderRadius: "16px" }}
                >
                 
                  <MDBCardHeader className="p-4">
                    <div className="d-flex justify-content-between align-items-center">

                      <div>
                        <p className="text-muted mb-2">
                          {" "}
                          Order ID{" "}
                          <span className="fw-bold text-body">{location.state.orderNumber}</span>

                        </p>

                        <p className="text-muted mb-0">
                          {" "}
                          Place On{" "}
                          <span className="fw-bold text-body">
                            {location.state.date}
                          </span>{" "}
                        </p>
                      </div>



                    </div>

                  </MDBCardHeader>

                  {location.state.paymentType != "COD" && <MDBCardHeader className="p-4">
                    <div className="d-flex justify-content-between align-items-center">

                      <div>
                        <p className="text-muted mb-2">
                          {" "}
                          Payment Id{"   "}&nbsp;
                          <span className="fw-bold text-body">{payment.razPaymentId}</span>

                        </p>

                        <p className="text-muted mb-0">
                          {" "}
                          Transaction Id{" "}&nbsp;
                          <span className="fw-bold text-body">
                            {payment.razOrderId}
                          </span>{" "}
                        </p>
                      </div>



                    </div>

                  </MDBCardHeader>}
                  <MDBCardBody className="p-4">
                    <div className="d-flex flex-row mb-4 pb-2">
                      <div className="flex-fill">
                        <MDBTypography tag="h5" className="bold">
                          {location.state.book.bookName}
                        </MDBTypography>
                        <p className="text-muted"> Description: {location.state.book.description} item</p>
                        <p className="text-muted"> Quantity: {location.state.quantity} item</p>
                      
                        <MDBTypography tag="h4" className="mb-3">
                          {" "}
                          ₹ {location.state.price}{" "}
                          <span className="small text-muted"> via {location.state.paymentType} </span>
                        </MDBTypography>
                        <p className="text-muted">
                          Tracking Status on:{" "}
                          <span className="text-body">{date}</span>
                        </p>
                      </div>
                      <div>
                        <MDBCardImage
                          fluid
                          className="align-self-center"
                          src={BASE_API_URL + "/" + location.state.book.img}
                          width="150"

                        />
                      </div>
                    </div>
                    <Stack sx={{ width: '100%' }} spacing={4}>

                      <Stepper alternativeLabel activeStep={status} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Stack>
                  </MDBCardBody>
                  <MDBCardFooter className="p-4">
                    {status == 3 && !statusReview &&
                      <form onSubmit={reviewSubmit}>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <h5 className="text-weight-bold">Review this product</h5>
                            <Rating name="rating" value={review.rating} onChange={(e) => handleChange(e)} />
                          </div>

                          <input
                            type="textbox"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            name="content"
                          />
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                          <button type="submit" className="btn btn-primary col-md-3" >
                            Submit
                          </button>
                        </div>
                      </form>
                    }

                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
  );
}