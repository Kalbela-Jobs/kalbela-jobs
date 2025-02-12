import dynamic from "next/dynamic"
import animation from "@/public/assets/animation/log_in.json"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const AuthAnimation = () => {
      return (
            <div className="relative hidden lg:flex  items-end px-4 py-10 pt-60 sm:py-16 md:justify-center lg:py-24  sm:px-6 lg:px-8">
                  <div className="absolute inset-0 border lg:border-2 lg:border-r-0  rounded-l-2xl">
                        <img
                              className="object-cover rounded-l-2xl w-full h-full"
                              src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg"
                              alt=""
                        />
                  </div>
                  <div className="absolute rounded-l-2xl  overflow-hidden inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="relative">
                        <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                              <h3 className="text-4xl font-bold text-white">
                                    Join 35k+ Job Seekers & Recruiters.
                                    Build Your Career with Kalbela Jobs
                              </h3>
                              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    <li className="flex items-center space-x-3">
                                          <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                                <svg
                                                      className="w-3.5 h-3.5 text-white"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                      fill="currentColor"
                                                >
                                                      <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                      />
                                                </svg>
                                          </div>
                                          <span className="text-lg font-medium text-white">
                                                Commercial License
                                          </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                          <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                                <svg
                                                      className="w-3.5 h-3.5 text-white"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                      fill="currentColor"
                                                >
                                                      <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                      />
                                                </svg>
                                          </div>
                                          <span className="text-lg font-medium text-white">
                                                Unlimited Job Listings
                                          </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                          <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                                <svg
                                                      className="w-3.5 h-3.5 text-white"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                      fill="currentColor"
                                                >
                                                      <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                      />
                                                </svg>
                                          </div>
                                          <span className="text-lg font-medium text-white">
                                                120+ Job Categories
                                          </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                          <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                                <svg
                                                      className="w-3.5 h-3.5 text-white"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 20 20"
                                                      fill="currentColor"
                                                >
                                                      <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                      />
                                                </svg>
                                          </div>
                                          <span className="text-lg font-medium whitespace-nowrap text-white">
                                                Resume & Application Management
                                          </span>
                                    </li>
                              </ul>
                        </div>
                  </div>
            </div>
      )
}

export default AuthAnimation
