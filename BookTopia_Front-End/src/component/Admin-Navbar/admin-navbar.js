import './assets/css/style.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/img/apple-touch-icon.png';
import { Link } from 'react-router-dom';
import React from 'react';


const AdminNavbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg header fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-primary fw-bold"><i className="fa-solid fa-book"></i> BookTopia</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
         
          <div className='d-flex'><i className="bi bi-person-circle mx-2"/>  Admin </div>

          </div>
       
      </nav>

    </React.Fragment>
  );
}

export { AdminNavbar };