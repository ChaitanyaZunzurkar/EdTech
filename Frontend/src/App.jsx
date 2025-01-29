import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
// import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import VerificationLayout from './Components/VerificationLayout'
import ResetPassword from './Components/ResetPassword'
import UpdatePassword from './Components/UpdatePassword'
import About from './Components/About'
import ContactPage from './Pages/ContactPage'
import MyProfile from './Components/MyProfile'
import Dashboard from './Components/Dashboard'

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/verify-email' element={<VerificationLayout />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/update-password/:id' element={<UpdatePassword />} />
            <Route path='/dashboard' element={<Dashboard />} >
              <Route path='/my-profile' element={<MyProfile />} />
            </Route>
        </Routes>
        {/* <Footer /> */}
    </div>
  )
}


export default App
