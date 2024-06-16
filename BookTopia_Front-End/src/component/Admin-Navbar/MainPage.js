import React from 'react'
import { AuthGuard } from '../../guard/auth.guard';
import { AdminNavbar } from './admin-navbar'
import { NavPage } from './NavPage';
import { Sidebar } from './Sidebar';


const MainPage = () => {
    return (

        <div>
            <AdminNavbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                       
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                    
                        <NavPage />
                    </div>
                </div>
            </div>
        </div>

    )
}

export { MainPage };
