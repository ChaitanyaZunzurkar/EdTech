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
        const res = await apiConnector('GET' , courses.GET_COURSE_DETAILS_URL , {
            courseId
        });

        if(!res?.data?.success) {
            throw new Error("Fail to fetch course details.");
        }

        result = res?.data;
        toast.success("Got Course Details.");

    } catch(error) {
        console.log("Fail to fetch course details." , error.message);
        toast.error("Fail to fetch course details.")
    }

    return result;
}

export const createSection = async (data , token) => {
    let result = null;

    try {
        // add loading
        const res = await apiConnector('POST' , courses.CREATE_SECTION_URL , data , {
            "Autorization" : `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to create section.");
        }

        result = res?.data;
        toast.success("Section created successfully.");

    } catch(error) {
        console.log("Fail to create section." , error.message);
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
            throw new Error("Fail to fetch all courses.");
        }

        result = res?.data;
        toast.success("Sub=section Created successfully.");
    } catch(error) {
        console.log("Fail to get the get all courses." , error.message);
        toast.error("Fail to load all courses.")
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
        console.log(result);
        toast.success("Course edited successfully.")
    } catch(error) {
        console.log("Fail to edit course details." , error.message);
        toast.error("Fail to edit course details.")
    }
}


export const getInstructorCourses = async (data , token) => {
    let result = null
    try {
        const res = await apiConnector('GET' , courses.GET_INSTRUCTOR_COURESES_API , null , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to edit courses.");
        }

        result = res?.data;
        toast.success("Course edited successfully.")

    } catch(error) {
        console.log("Fail to edit course details." , error.message);
        toast.error("Fail to edit course details.")
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
