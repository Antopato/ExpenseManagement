export const BASE_URL = "https://expensemanagement-is8w.onrender.com"; //PRODUCTION
//export const BASE_URL = "https://localhost:8000";  //DEVELOP

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        SIGNUP: "/api/auth/register",
        GET_USER_INFO: "/api/auth/user",
    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard",
    },
    INCOME:{
        ADD_INCOME: "/api/income/add",
        GET_ALL_INCOME: "api/income/get",
        DELETE_INCOME: (income) => {`/api/income/${income}`},
        DOWNLOAD_INCOME: "api/income/downloadexcel",
    },
    EXPENSE:{
        ADD_EXPENSE: "/api/expense/add",
        GET_ALL_EXPENSE: "api/expense/get",
        DELETE_EXPENSE: (expense) => {`/api/expense/${expense}`},
        DOWNLOAD_EXPENSE: "api/expense/downloadexcel",
    },
    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image",
    }
}