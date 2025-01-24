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
