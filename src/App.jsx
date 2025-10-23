import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav/Nav'
import { Footer } from './components/Footer/Footer' 
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={ <ItemListContainer/> }/>
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path='/detail/:id' element={<ItemDetailContainer/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
