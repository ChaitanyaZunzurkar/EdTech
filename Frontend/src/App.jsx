import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'

function App() {
  return (
    <div>
        <Routes>
            <Route index element={<HomePage />} />
        </Routes>
    </div>
  )
}

export default App
