import { toast } from "react-hot-toast"
import { setLoading , setToken } from "../../Store/Slice/authSlice"
import { setUser } from '../../Store/Slice/profileSlice'
import { apiConnector } from '../apiConnector'
import { auth } from '../apis'

export const otpSender = (email , navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const res = await apiConnector("POST" , auth.OTP_SENDER_URL , {
                email
            })
            console.log("Response got after sending OTP." , res)

            if(!res.data.success) {
                toast.error("Fail to send OTP")
                throw new Error("Fail to send OTP.")
            }

            toast.success("OTP send successfully.")
            navigate('/verify-email')

        } catch(error) {
            console.log("Fail to send OTP.")
            console.log(error.message)
            toast.error("Fail to send OTP")
        }
    }
}

export const login = (email , password , navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        try {
            const res = await apiConnector("POST" , auth.SIGNIN_URL , {
                email,
                password
            })

            console.log("Response got after login" , res);

            if(!res.data.success) {
                toast.error("Fail to login")
                throw new Error(res.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(res.data.token))

            const userImage = res.data?.token ? 
            res.data.user.image : 
            `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstName} ${res.data.user.lastName}`

            dispatch(setUser({...res.data.user , image: userImage}))
            localStorage.setItem("token" , JSON.stringify(res.data.token))
            localStorage.setItem("user" , JSON.stringify(res.data.user))
            navigate('/dashboard/my-profile')
        } catch(error) {
            console.log("Error occured while login" , error.message)
            toast.error("Fail to login")

        }

        dispatch(setLoading(false))
    }
}

export const signup = (firstName , lastName , email , password , confirmPassword , accountType , contactNumber , otp , navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const res = await apiConnector("POST" , auth.SIGNUP_URL , {
                firstName , 
                lastName , 
                email , 
                password , 
                confirmPassword ,
                accountType,
                contactNumber,
                otp , 
            })

            console.log("Response got after signup" , res);

            if(!res.data.success) {
                toast.error("Fail to Signup.")
                throw new Error(res.data.message)
            }

            toast.success("Signup Successful.")
            navigate('/login')

        } catch(error) {
            console.log("Error occured while signup" , error.message)
            toast.error("Fail to signup")

        }

        dispatch(setLoading(false))
    }
}