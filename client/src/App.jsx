import './App.css'
import { BrowserRouter, Routes, Route }  from 'react-router-dom'
import Home from './Pages/Home/Home'
import List from './Pages/List/List'
import Hotel from './Pages/Hotel/Hotel'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels' element={<List/>}/>
      <Route path='/hotels/:id' element = {<Hotel/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
