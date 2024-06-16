import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddBook } from '../../pages/admin/AddBook'
import { AddCategory } from '../../pages/admin/AddCategory'
import { EditBook } from '../../pages/admin/EditBook'
import Home from '../../pages/admin/Home'
import { Orders } from '../../pages/admin/Orders'
import UserDetails from '../../pages/admin/UserDetails'
import { ViewBook } from '../../pages/admin/ViewBook'
import { ViewCategory } from '../../pages/admin/ViewCategory'

const NavPage = () => {

    return (

        <div className=''>
            <Routes>
                <Route path='/home' element={<Home />}></Route>
                <Route path='addBook' element={<AddBook />}></Route>
                <Route path='viewBook' element={<ViewBook />}></Route>
                <Route path='editBook/:id' element={<EditBook />}></Route>
                <Route path='editBook' element={<EditBook />}></Route>
                <Route path='addCategory' element={<AddCategory />}></Route>
                <Route path='viewCategory' element={<ViewCategory />}></Route>
                <Route path='Orders' element={<Orders />}></Route>
                <Route path='user' elemen   t={<UserDetails />}></Route>
            </Routes>

        </div>

    )
}

export { NavPage };
