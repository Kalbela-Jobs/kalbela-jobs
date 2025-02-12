import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
  timeout: 10000,
})

// Request interceptor to add authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    //     const accessToken = Cookies.get("accessToken");
    //     if (accessToken) {
    //       config.headers["Authorization"] = ⁠ Bearer ${accessToken} ⁠;
    //     }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // token refresh logic Optional
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
