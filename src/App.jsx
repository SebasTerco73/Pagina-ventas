import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav/Nav'
import { Footer } from './components/Footer/Footer' 
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { ProductProvider } from './context/ProductProvider'
import { ScrollButtons } from "./components/ScrollButtons/ScrollButtons";

function App() {

  return (
    <>
      <BrowserRouter>
      <ProductProvider>
        <Nav/>
        <Routes>
          <Route path='/' element={ <ItemListContainer/> }/>
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path='/detail/:id' element={<ItemDetailContainer/>}/>
        </Routes>
        {/* 👇 Colocá las flechas acá, así están disponibles en todas las rutas */}
        <ScrollButtons />
      </ProductProvider>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
