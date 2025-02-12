import Link from "next/link"

import MaxWidthWrapper from "../MaxWidthWrapper"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f2f2f2] py-8 text-[#616161] dark:border-t dark:border-t-gray-500 dark:bg-transparent">
      <MaxWidthWrapper className="z-40 divide-y">
        <div className="container mx-auto flex flex-col justify-between space-y-8 py-10 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <Link
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <div>
                <img className="h-auto w-48" src="/logo.png" alt="logo" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 text-sm sm:grid-cols-4 lg:w-2/3">
            <div className="space-y-3">
              <h3 className="uppercase">Useful Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Features
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase">More Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3>API Resources</h3>
              <ul className="space-y-1">
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Public API
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link rel="noopener noreferrer" href="#">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase">Follow us on:</div>
              <div className="flex justify-start space-x-3">
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <img
                    className="size-5"
                    src="/icons/facebook.svg"
                    alt="facebook icon"
                  />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  title="Twitter"
                  className="flex items-center p-1"
                >
                  <img
                    className="size-5"
                    src="/icons/twitter.svg"
                    alt="twitter icon"
                  />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  title="Instagram"
                  className="flex items-center p-1"
                >
                  <img
                    className="size-5"
                    src="/icons/instagram.svg"
                    alt="instagram icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
