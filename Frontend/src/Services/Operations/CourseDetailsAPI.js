import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courses } from '../apis'



export const getAllCourses = async () => {
    let result = []

    try {
        // add loading
        
        const res = await apiConnector('GET' , courses.GET_ALL_COURSES_URL);
        if(!res?.data?.success) {
            throw new Error("Fail to fetch all courses.");
        }

        result = res?.data;
        toast.success("Got all the courses successfully.");

    } catch(error) {
        console.log("Fail to get the get all courses." , error.message);
        toast.error("Fail to load all courses.")
    }

    return result;
}

export const createCourse = async (data , token) => {
    let result = null;
    try {
        const res = await apiConnector('POST' , courses.CREATE_COURSE_URL , data , {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        });


        if(!res?.data?.success) {
            throw new Error("Fail to create course.");
        }

        result = res.data;
        
        toast.success("Course Created successfully.");
    } catch(error) {
        console.log("Fail to create course." , error);
        toast.error("Fail to create course.");
    }

    return result;
}

export const getCourseDetails = async (courseId) => {
    let result = []

    try {
        // add loading
        console.log(courseId)
        const res = await apiConnector('POST' , courses.GET_COURSE_DETAILS_URL , {
            courseId
        });

        if(!res?.data?.success) {
            throw new Error("Fail to fetch course details.");
        }

        result = res?.data;
    } catch(error) {
        console.log("Fail to fetch course details." , error);
        toast.error("Fail to fetch course details.")
    }

    return result;
}

export const createSection = async (data , token) => {
    let result = null;
    try {
        // add loading
        const res = await apiConnector('POST' , courses.CREATE_SECTION_URL , data , {
            "Authorization" : `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to create section.");
        }

        result = res?.data;
        toast.success("Section created successfully.");

    } catch(error) {
        console.log("Fail to create section." , error);
        toast.error("Fail to create section.")
    }

    return result;
}

export const updatedSection = async (data , token) => {
    let result = null;

    try {
        // add loading
        const res = await apiConnector('PUT' , courses.UPDATE_SECTION_URL , data , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to update section.");
        }

        result = res?.data;
        toast.success("Section updated successfully.");

    } catch(error) {
        console.log("Fail to update section." , error.message);
        toast.error("Fail to update section.")
    }

    return result;
}

export const deleteSection = async (data , token) => {
    let result = null;

    try {
        // add loading
        const res = await apiConnector('DELETE' , courses.DELETE_SECTION_URL , data , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to delete section.");
        }

        result = res?.data;
        toast.success("Section deleted successfully.");
    } catch(error) {
        console.log("Fail to delete section." , error.message);
        toast.error("Fail to delete section.");
    }

    return result;
}

export const createSubSection = async (data , token) => {
    let result = []

    try {
        // add loading
        const res = await apiConnector('POST' , courses.CREATE_SUB_SECTION_URL , data  , {
            "Authorization" : `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail create sub section.");
        }
        result = res?.data;
        toast.success("Sub-section Created successfully.");
    } catch(error) {
        console.log("Fail create sub section." , error);
        toast.error("Fail create sub section.")
    }

    return result;
}

export const updateSubSection = async (data , token) => {
    let result = null

    try {
        // add loading
        const res = await apiConnector('PUT' , courses.UPDATE_SUB_SECTION_URL, data , {
            "Authorization" : `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to fetch all courses.");
        }

        result = res?.data;
        toast.success("Sub-Section updated successfully.");

    } catch(error) {
        console.log("Fail to get the get all courses." , error.message);
        toast.error("Fail to load all courses.")
    }

    return result;
}

export const deleteSubSection = async (data , token) => {
    let result = null

    try {
        // add loading
        const res = await apiConnector('DELETE' , courses.DELETE_SUB_SECTION_URL , data , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to delete courses.");
        }

        result = res?.data;
        toast.success("Sub-Section deleted successfully.");

    } catch(error) {
        console.log("Fail to delete sub-section." , error.message);
        toast.error("Fail to delete sub-section.")
    }

    return result;
}


export const editCourseDetails = async (data , token) => {
    try {
        let result = null
        const res = await apiConnector('POST' , courses.EDIT_COURSE_API , data , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to edit courses.");
        }

        result = res?.data;
        if(result) {
            toast.success("Course edited successfully.")
        }
    } catch(error) {
        console.log("Fail to edit course details." , error);
        toast.error("Fail to edit course details.")
    }
}


export const getInstructorCourses = async (token) => {
    let result = null
    try {
        const res = await apiConnector('GET' , courses.GET_INSTRUCTOR_COURESES_API , null , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to fetch courses");
        }

        result = res?.data;
    } catch(error) {
        console.log("Fail to fetch courses" , error);
    }
    return result
}

export const deleteCourse = async (data , token) => {
    try {
        let result = null
        const res = await apiConnector('DELETE' , courses.DELETE_COURSE_API , data , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to edit courses.");
        }

        result = res?.data;
        console.log(result);
        toast.success("Course edited successfully.")
    } catch(error) {
        console.log("Fail to edit course details." , error.message);
        toast.error("Fail to edit course details.")
    }
}

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST", courses.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false)); 
  return result
}

export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", courses.LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}