import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import VerificationLayout from './Components/VerificationLayout'

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/verify-email' element={<VerificationLayout />} />
        </Routes>
        <Footer />
    </div>
  )
}


export default App
