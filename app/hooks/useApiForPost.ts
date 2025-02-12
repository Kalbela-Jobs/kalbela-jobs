import axiosInstance from "@/lib/axiosInstance"

interface ApiResponse<T> {
  data: T | null
  error: any | null
}

interface AxiosError {
  response?: {
    data: string | null
    status?: number
  }
  message: string
}

const useApiForPost = () => {
  const apiRequest = async <T, P = any>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
    data: P | null = null, // Use P for request payload
    isProtected: boolean = false
  ): Promise<ApiResponse<T>> => {
    try {
      // if (isProtected) {
      //   const accessToken = Cookies.get("accessToken");
      //   if (!accessToken) {
      //     throw new Error("Unauthorized: Access token is required");
      //   }
      // }

      const response = await axiosInstance({
        url,
        method,
        data,
      })

      return { data: response.data, error: null }
    } catch (error) {
      const axiosError = error as AxiosError
      return {
        data: null,
        error: axiosError.response
          ? axiosError.response.data
          : axiosError.message,
      }
    }
  }

  return { apiRequest }
}

export default useApiForPost
