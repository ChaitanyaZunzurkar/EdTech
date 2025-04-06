import { apiConnector } from '../apiConnector'
import { profileEndpoints } from '../apis'
import { toast } from 'react-hot-toast'
import { setLoading , setUser } from '../../Store/Slice/profileSlice';
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API , GET_USER_ENROLLED_COURSES_API , GET_INSTRUCTOR_DATA_API } = profileEndpoints;

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const res = await apiConnector('GET' , GET_USER_ENROLLED_COURSES_API , null ,  {
            Authorization: `Bearer ${token}`,
        })

        if(!res?.data.success) {
            throw new Error("Fail to get enrolled courses.")
        }

        result = res.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export function getUserDetails(token , navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const res = await apiConnector('GET' , GET_USER_DETAILS_API , null , {
                Authorization: `Bearer ${token}`,
            })

            if(!res.data.success) {
                throw new Error("Fail to get user details.")
            }

            const userImg = res.data.data.image ? res.data.data.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.data.firstName} ${res.data.data.lastName}`

            setUser({...res.data.data} , userImg)

        } catch(error) {
            dispatch(logout(navigate))
            console.log("Error occured while fetching enrolled courses" , error);
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const res = await apiConnector('GET' , GET_INSTRUCTOR_DATA_API , null , {
            Authorization: `Bearer ${token}`,
        })

        if(!res.data.success) {
            throw new Error("Fail to get instructor data.")
        }

        result = res?.data?.courses
    } catch(error) {
        console.log("GET_INSTRUCTOR_API ERROR", error);
        toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
}

