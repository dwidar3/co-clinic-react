export const baseURL = "https://co-clinic.vercel.app"

// export const baseURL = "http://localhost:3000"


const baseAuthUrl = `${baseURL}/api/auth/users`

const baseUserUrl = `${baseURL}/api/users`

const baseBooksUrl = `${baseURL}/api/books`

const baseCommentUrl = `${baseURL}/api/comments`

const baseAdminUrl = `${baseURL}/api/admin`

const baseAppointmentUrl = `${baseURL}/api/appointment`

const baseUploadUrl = `${baseURL}/api`


const baseAiChat = `${baseURL}/api`
// const baseAiChat = `http://localhost:3000/api`

export const UploadUrls = {
    uploadFile: `${baseUploadUrl}/upload`
}

export const AuthUrls = {
    signUp: `${baseAuthUrl}/signup`,
    verifyEmail: `${baseAuthUrl}/verify-email`,
    signIn: `${baseAuthUrl}/signin`,
    verifyEmail: `${baseAuthUrl}/verify`,
    forgetPass: `${baseAuthUrl}/send-reset-password-code`,
    resetPass: `${baseAuthUrl}/reset-password-verify`,
    passwordReset: `${baseAuthUrl}/password-reset`,
    signOut: `${baseAuthUrl}/signout`,
    google: `${baseAuthUrl}/google`,
}

export const UserUrls = {
    update: `${baseUserUrl}/update`,
    uploadImage: `${baseUserUrl}/profileImage`,
    delete: `${baseUserUrl}/delete`,
    getAll: `${baseUserUrl}/getusers`,
    searchOne: `${baseUserUrl}/search-user`,
    getDetails: `${baseUserUrl}/user-details`,
    getById: `${baseUserUrl}`,
}
export const BookUrl = {
    upload: `${baseBooksUrl}/upload`,
    create: `${baseBooksUrl}/create`,
    delete: `${baseBooksUrl}/delete`,
    update: `${baseBooksUrl}/update`,
    getAllBooks: `${baseBooksUrl}/get`,
    getById: `${baseBooksUrl}/get`,
}
export const CommentUrls = {
    create: `${baseCommentUrl}/create`,
    getPostComments: `${baseCommentUrl}/getPostComments`,
    likeOne: `${baseCommentUrl}/like`,
    editOne: `${baseCommentUrl}/edit`,
    deleteOne: `${baseCommentUrl}/delete`,
    getAll: `${baseCommentUrl}/get`,
}

export const AdminUrls = {
    toggle_approve: `${baseAdminUrl}/toggle-approve`,
}
export const AppointmentUrls = {
        checkout: `${baseAppointmentUrl}/create-checkout-session`, // New endpoint
    verifyPayment: `${baseAppointmentUrl}/verify-payment`,
    // create: `${baseAppointmentUrl}/create`,
    patient: `${baseAppointmentUrl}/patient-appointments`,
    doctor: `${baseAppointmentUrl}/doctor-appointments`,
    doctors: `${baseAppointmentUrl}/doctors`,
    status: `${baseAppointmentUrl}/status`,
    delete: `${baseAppointmentUrl}/delete`,
}


export const AiCahtUrls = {
    create: `${baseAiChat}/chatbot/create`,
    getChat: `${baseAiChat}/chatbot/chat`,
}
