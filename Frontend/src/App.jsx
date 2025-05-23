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
import DashboardSettings from './Components/DashboardSettings'
import CreateCourse from './Components/CreateCourse'
import MyCourse from './Components/MyCourse'
import CategoryPage from './Components/CategoryPage'
import CoursePage from './Components/CoursePage'
import EnrolledCourses from './Components/EnrolledCourses'
import ViewCourse from './Components/ViewCourse'
// import { useSelector } from "react-redux";
import VideoDetails from './Components/VideoDetails'

function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.profile)

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
            <Route path='catelog/:catalogName' element={<CategoryPage />} />
            <Route path='/courses/:courseId' element={<CoursePage />} />
            <Route element={<Dashboard />} >
              <Route path='/dashboard/my-profile' element={<MyProfile />} />
              <Route path='/dashboard/settings' element={<DashboardSettings />} />
              <Route path='/dashboard/add-course' element={<CreateCourse />} />
              <Route path='/dashboard/my-courses' element={<MyCourse />} />
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </Route>

            <Route element={<ViewCourse />} >
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
            </Route>
        </Routes>
        {/* <Footer /> */}
    </div>
  )
}

export default App
