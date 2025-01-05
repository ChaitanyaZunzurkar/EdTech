import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
        <Routes>
            <Route index element={<HomePage />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
