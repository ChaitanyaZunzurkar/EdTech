const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
    CATEGORIES_URL: BASE_URL + 'course/getCategory',
};

export const auth = {
    SIGNUP_URL: BASE_URL + 'auth/signup',
    SIGNIN_URL: BASE_URL + 'auth/signin',
    OTP_SENDER_URL: BASE_URL + 'auth/sendotp',
    RESET_PASSWORD_URL: BASE_URL + 'auth/reset-password-token',
    RESET_PASSWORD: BASE_URL + 'auth/update-password'
}

export const courses = {
    CREATE_COURSE_URL: BASE_URL + 'course/create-course',
    GET_ALL_COURSES_URL: BASE_URL + 'course/getCourse',
    GET_COURSE_DETAILS_URL: BASE_URL + 'course/getCourseDetials',

    CREATE_SECTION_URL: BASE_URL + 'course/create-section',
    UPDATE_SECTION_URL: BASE_URL + 'course/update-section',
    DELETE_SECTION_URL: BASE_URL + 'course/delete-section',

    CREATE_SUB_SECTION_URL: BASE_URL + 'course/create-subsection',
    UPDATE_SUB_SECTION_URL: BASE_URL + 'course/update-subsection',
    DELETE_SUB_SECTION_URL: BASE_URL + 'course/delete-subsection',

    EDIT_COURSE_API: BASE_URL + 'course/edit-course',
    GET_INSTRUCTOR_COURESES_API: BASE_URL + 'course/get-instructor-courses',
    DELETE_COURSE_API: BASE_URL + 'course/delete-course',
}

export const catelog = {
    CATELOG_PAGE_DETAILS: BASE_URL + 'course/categoryPageDetails'
}