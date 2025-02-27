"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { set_user_data, useUserData } from "@/utils/encript_decript"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"

import PrimaryBtn from "@/components/PrimaryBtn"
import SecondaryBtn from "@/components/SecondaryBtn"
import useApiForPost from "@/app/hooks/useApiForPost"

import AuthAnimation from "../components/AuthAnimation"
import { googleLogin } from "@/app/hooks/firebse"


const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface FormData {
      email: string
      password: string
}
const RegistrationPage = () => {
      const [isPasswordVisible, setPasswordVisible] = useState(false)
      const router = useRouter() // Next.js Router
      const [error_message, set_error_message] = useState("")
      const [loading, setLoading] = useState(false)
      const [user, setUserData] = useUserData()

      const [formData, setFormData] = useState<FormData>({
            email: "",
            password: "",
      })

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            setFormData((prevData) => ({
                  ...prevData,
                  [name]: value,
            }))
      }

      const { apiRequest } = useApiForPost()

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            setLoading(true)
            const { data, error } = await apiRequest<any>(
                  "api/v1/auth/signin-user",
                  "POST",
                  formData
            )

            setLoading(false)
            if (error) {
                  set_error_message(error.message)
                  return
            }
            if (data) {
                  set_user_data(data.data)
                  set_error_message("")

                  router.push("/user")
            }
      }

      const handleLogin = async () => {
            await googleLogin();
            const get_user = user
            if (get_user) {
                  router.push('/user');
            }
      };

      return (
            <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 mt-4">
                        <AuthAnimation />

                        <div className="flex items-center justify-center lg:border-2 lg:border-l-0 py-10 rounded-r-lg  sm:py-16 lg:py-24">
                              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                    <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                                          Login to Celebration
                                    </h2>
                                    <p className="mt-2 text-base text-gray-600 dark:text-slate-200">
                                          New here? Create an account
                                          <Link
                                                href="/registration"
                                                title=""
                                                className="pl-1 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                                          >
                                                Registration
                                          </Link>
                                    </p>
                                    <form
                                          onSubmit={handleSubmit}
                                          onChange={() => set_error_message("")}
                                          action="#"
                                          method="POST"
                                          className="mt-8"
                                    >
                                          <div className="space-y-5">
                                                <div>
                                                      <label htmlFor="" className="text-base font-medium">
                                                            {" "}
                                                            Email <span className="text-red-500">*</span>
                                                      </label>
                                                      <div className="relative mt-2.5 text-gray-400 focus-within:text-gray-600">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                  <svg
                                                                        className="h-5 w-5"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                  >
                                                                        <path
                                                                              strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              strokeWidth={2}
                                                                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                                        />
                                                                  </svg>
                                                            </div>
                                                            <input
                                                                  type="email"
                                                                  name="email"
                                                                  value={formData.email}
                                                                  onChange={handleChange}
                                                                  placeholder="Enter email to get started"
                                                                  className="block w-full rounded-md border border-gray-200 bg-gray-50 py-4 pl-10 pr-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                                                            />
                                                      </div>
                                                </div>
                                                <div>
                                                      <div className="flex items-center justify-between">
                                                            <label htmlFor="" className="text-base font-medium">
                                                                  {" "}
                                                                  Password <span className="text-red-500">*</span>
                                                            </label>
                                                            <a
                                                                  href="#"
                                                                  title=""
                                                                  className="text-sm font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                                                            >
                                                                  {" "}
                                                                  Forgot password?{" "}
                                                            </a>
                                                      </div>
                                                      <div className="relative mt-2.5 text-gray-400 focus-within:text-gray-600">
                                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                  <svg
                                                                        className="h-5 w-5"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                  >
                                                                        <path
                                                                              strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              strokeWidth={2}
                                                                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                                        />
                                                                  </svg>
                                                            </div>
                                                            <input
                                                                  type={isPasswordVisible ? "text" : "password"}
                                                                  name="password"
                                                                  value={formData.password}
                                                                  onChange={handleChange}
                                                                  placeholder="Enter your password"
                                                                  className="block w-full rounded-md border border-gray-200 bg-gray-50 py-4 pl-10 pr-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                                                            />
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                                                                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                                                            >
                                                                  {isPasswordVisible ? (
                                                                        <EyeOff className="h-5 w-5" />
                                                                  ) : (
                                                                        <Eye className="h-5 w-5" />
                                                                  )}
                                                            </button>
                                                      </div>
                                                </div>

                                                {error_message && (
                                                      <p className="mt-2 text-base text-red-600">{error_message}</p>
                                                )}
                                                <div>
                                                      <PrimaryBtn disabled={loading} className="w-full py-3">
                                                            {loading ? "Loading..." : "Sign in "}
                                                      </PrimaryBtn>
                                                </div>
                                          </div>
                                    </form>
                                    <div className="mt-3 space-y-3">
                                          <SecondaryBtn
                                                // onClick={handlerGoogleLogin}
                                                onClick={handleLogin}
                                                className="relative w-full py-3"
                                          >
                                                <div className="absolute inset-y-0 left-0 px-4 py-2">
                                                      <img
                                                            className="size-7 text-[#2563EB]"
                                                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                                                            alt=""
                                                      />
                                                </div>
                                                Sign in with Google
                                          </SecondaryBtn>


                                          <SecondaryBtn className="relative w-full py-3">
                                                <a
                                                      href="https://app.kalbelajobs.com/"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                >
                                                      <div className="absolute inset-y-0 left-0 px-4 py-2">
                                                            <img
                                                                  className="h-6 w-6 text-[#2563EB]"
                                                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcjpUKJa3emle2LZDQ9QfU0MzvmnCbN2i9A&s"
                                                                  alt=""
                                                            />
                                                      </div>
                                                      Sign In as a Employer
                                                </a>
                                          </SecondaryBtn>
                                    </div>
                                    <p className="mt-5 text-sm text-gray-600 dark:text-slate-200">
                                          This site is protected by reCAPTCHA and the Google{" "}
                                          <a
                                                href="#"
                                                title=""
                                                className="text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
                                          >
                                                Privacy Policy
                                          </a>{" "}
                                          &amp;
                                          <a
                                                href="#"
                                                title=""
                                                className="text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
                                          >
                                                Terms of Service
                                          </a>
                                    </p>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default RegistrationPage
