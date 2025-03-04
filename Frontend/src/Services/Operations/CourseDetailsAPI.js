import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const {
    CREATE_COURSE_URL,
    GET_ALL_COURSES_URL,
    GET_COURSE_DETAILS_URL, 
    CREATE_SECTION_URL,
    UPDATE_SECTION_URL,
    DELETE_SECTION_URL,
    CREATE_SUB_SECTION_URL,
    UPDATE_SUB_SECTION_URL,
    DELETE_SUB_SECTION_URL
} = '../apis.js'



export const getAllCourses = async () => {
    let result = []

    try {
        // add loading
        const res = await apiConnector('POST' , GET_ALL_COURSES_URL);
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
        // add loading
        const res = await apiConnector('POST' , CREATE_COURSE_URL , data , {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to create course.");
        }

        result = res.data;
        toast.success("Course Created successfully.");

    } catch(error) {
        console.log("Fail to create course." , error.message);
        toast.error("Fail to create course.");
    }

    return result;
}

export const getCourseDetails = async (courseId) => {
    let result = []

    try {
        // add loading
        const res = await apiConnector('POST' , GET_COURSE_DETAILS_URL , {
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
        const res = await apiConnector('POST' , CREATE_SECTION_URL , data , {
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
        const res = await apiConnector('POST' , UPDATE_SECTION_URL , data , {
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
        const res = await apiConnector('POST' , DELETE_SECTION_URL , data , {
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
        const res = await apiConnector('POST' , CREATE_SUB_SECTION_URL , data  , {
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
        const res = await apiConnector('POST' , UPDATE_SUB_SECTION_URL, data , {
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
        const res = await apiConnector('POST' , DELETE_SUB_SECTION_URL , data , {
            "Authorization": `Bearer ${token}`
        });

        if(!res?.data?.success) {
            throw new Error("Fail to delete courses.");
        }

        result = res?.data;
        toast.success("Sub-Section deleted successfully.");

    } catch(error) {
        console.log("Fail to delete courses." , error.message);
        toast.error("Fail to delete courses.")
    }

    return result;
}
