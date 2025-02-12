import { useEffect, useMemo, useState } from "react"
import axios, { AxiosResponse } from "axios"

interface UseApiRequestResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const useApiRequest = <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" = "GET",
  body?: any
): UseApiRequestResponse<T> => {
  const url = useMemo(
    () => `${process.env.NEXT_APP_BASE_URL}/api/v1/${endpoint}`,
    [endpoint]
  )

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response: AxiosResponse<T> = await axios.request<T>({
          url,
          method,
          data: body,
          signal: controller.signal,
        })
        setData(response.data)
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message)
          setLoading(false)
        } else {
          setError(
            err.response?.data?.message || err.message || "Something went wrong"
          )
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [url, method, JSON.stringify(body)])

  return { data , loading, error }
}

export default useApiRequest
