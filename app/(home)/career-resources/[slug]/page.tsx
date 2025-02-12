"use client"

import React from "react"
import { useParams } from "next/navigation"

import { formatDate } from "@/lib/utils"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import useApiRequest from "@/app/hooks/useApiRequest"
import Link from "next/link"

const SingleResourceContent = () => {
      const { slug } = useParams()
      const { data, loading, error } = useApiRequest<any>(
            `resource/single?id=${slug}`,
            "GET"
      )

      console.log("data", data)

      return (
            //     <MaxWidthWrapper className="mt-6 lg:mt-10">
            //       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            //         <div className="mx-auto max-w-xl text-center">
            //           <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            //             {data?.data?.name}
            //           </h1>
            //           <div className="mt-8 flex items-center justify-center space-x-2">
            //             <p className="text-base font-medium text-gray-500">
            //               {!loading &&
            //                 data?.data?.created_at &&
            //                 formatDate(data?.data?.created_at)}
            //             </p>
            //           </div>
            //         </div>
            //         <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6 mt-8 sm:mt-12 lg:mt-16">

            //         </div>
            //         <div className="mb-10 mt-4 grid grid-cols-1 gap-y-4 sm:mt-6 lg:mb-16 lg:mt-8 lg:grid-cols-12 lg:gap-x-12">
            //           <div className="hidden lg:col-span-2 lg:block" />
            //           <article className="prose prose-gray prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:lg:text-xl prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:border-gray-900 prose-blockquote:border-l-2 prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:bg-gray-100 prose-blockquote:text-lg prose-blockquote:leading-8 max-w-none lg:col-span-8">
            //             <p
            //               className="mt-4 text-gray-600"
            //               dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            //             ></p>
            //           </article>
            //         </div>
            //       </div>
            //     </MaxWidthWrapper>

            <MaxWidthWrapper>
                  <section className="py-6">
                        <div >
                              <div className=" mx-auto">
                                    <div className="max-w-5xl">
                                          <h1 className="text-4xl font-bold  sm:text-5xl"> {data?.data?.name}</h1>
                                          <p className="mt-2 text-base font-medium text-gray-500">{!loading &&
                                                data?.data?.created_at &&
                                                formatDate(data?.data?.created_at)}</p>
                                    </div>

                                    {/* <img
                                          className="mx-auto w-full h-[500px] object-cover border rounded"
                                          src={data?.data?.photo}
                                          alt={data?.data?.name}
                                    /> */}



                                    <div className="mt-12 sm:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-16 xl:gap-x-8">

                                          <article className="lg:col-span-9 lg:order-1   ">
                                                <div className="react-markdown-content">
                                                      <p
                                                            className="mt-4 text-gray-600"
                                                            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                                                      ></p>

                                                      <style>
                                                            {`
            p pre {
                  background-color: #1f2937; /* gray-700 */
                  color: #ffffff;
                  width: 100%;
                  overflow-x: auto;
                  padding: 1rem;
                  margin: 1rem 0;
                  border-radius: 0.375rem; /* rounded-md */
            }

            p code {
                  background-color: #e5e7eb; /* gray-200 */
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.375rem;
                  font-family: monospace;
            }

            p pre code {
                  background-color: transparent;
                  padding: 0;
            }
      `}
                                                      </style>

                                                      {/* <ReactMarkdown
                                                            components={{
                                                                  code({ node, inline, className, children, ...props }) {
                                                                        return !inline ? (
                                                                              <pre className="bg-gray-700 text-white w-[100%] overflow-scroll px-4 py-2 my-4 ">
                                                                                    <code className={className} {...props}>
                                                                                          {children}
                                                                                    </code>
                                                                              </pre>
                                                                        ) : (
                                                                              <code className={className} {...props}>
                                                                                    {children}
                                                                              </code>
                                                                        );
                                                                  },
                                                            }}
                                                      >
                                                            {project_data?.long_description}
                                                      </ReactMarkdown> */}
                                                </div>
                                          </article>

                                          <aside className="lg:col-span-3 lg:order-2 lg:self-start lg:sticky lg:top-20 flex-col-reverse mt-10 md:mt-0">
                                                <div className="overflow-hidden text-white bg-gray-800 rounded-xl">
                                                      <div className="px-4 py-5 sm:p-6">
                                                            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">On this page</h4>
                                                            <ul className="mt-8 space-y-5">
                                                                  {/* {blogs.map(project => (
                                                                  <li key={project.name}>
                                                                        <Link href={`/blogs/${project.slug}`} title="" className="flex text-base font-bold text-gray-200 hover:text-blue-500 hover:underline">
                                                                              {project.name}
                                                                        </Link>
                                                                  </li>
                                                            ))} */}
                                                            </ul>
                                                      </div>
                                                </div>
                                          </aside>
                                    </div>



                              </div>
                        </div>
                  </section>
            </MaxWidthWrapper>


      )
}

export default SingleResourceContent
