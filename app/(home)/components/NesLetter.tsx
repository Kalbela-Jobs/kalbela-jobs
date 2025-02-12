import React from "react"

const NesLetter = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border-2 bg-light-theme shadow dark:bg-dark-theme">
          <div className="absolute left-0 top-0">
            <img
              className="w-16 md:w-24 lg:w-32 xl:w-full"
              src="https://landingfoliocom.imgix.net/store/collection/saasui/images/newsletter/3/ring-pattern.svg"
              alt=""
            />
          </div>
          <div className="relative px-8 py-12 md:p-16 xl:p-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Subscribe to our newsletter
              </h2>
              {/* <p className="mt-4 text-base font-normal leading-7 text-slate-400 dark:text-slate-200 lg:text-lg lg:mt-6 lg:leading-8">
                                                Stay up to date with our new collections, latest deals and special
                                                offers! We announce a new job collection every week so be sure to stay
                                                tuned.
                                          </p> */}
            </div>
            <form className="mx-auto mt-12 flex max-w-3xl flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 xl:mt-16">
              <div className="flex-1">
                <label htmlFor="" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id=""
                  placeholder="Full name"
                  className="block w-full rounded-xl border border-slate-400 border-opacity-50 bg-transparent px-4 py-4 text-base font-normal text-black placeholder-white placeholder:text-black focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white dark:border-white dark:text-white placeholder:dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="" className="sr-only">
                  Email address{" "}
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Email address"
                  className="block w-full rounded-xl border border-slate-400 border-opacity-50 bg-transparent px-4 py-4 text-base font-normal text-black placeholder-white placeholder:text-black focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white dark:border-white dark:text-white placeholder:dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gray-900 px-10 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NesLetter
