import React from 'react'
import {Routes , Route} from 'react-router-dom'
import CreateBooks from './pages/createBooks'
import ShowBooks from './pages/showBooks'
import UpdateBooks from './pages/updateBooks'
import DeleteBooks from './pages/deleteBook'
import Home from './pages/home'
import DeleteAll from './pages/DeleteAll';


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element = { <Home/> }></Route>
      <Route path='/books/create' element = {<CreateBooks/>}></Route>
      <Route path='/books/update/:id' element = {<UpdateBooks/>}></Route>
      <Route path='/books/details/:id' element = {<ShowBooks/>}></Route>
      <Route path='/books/delete/:id' element = {<DeleteBooks/>}></Route>
      <Route path='/books/delete/' element = {<DeleteAll/>}></Route>
    </Routes>
    </>
  )
}

export default App
