import dynamic from "next/dynamic"

import noVacancies from "../../../../public/assets/animation/no-vacancies.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const NoVacancies = () => {
  return (
    <div className="mx-auto h-48 w-48">
      <Lottie animationData={noVacancies} loop={true} />
    </div>
  )
}

export default NoVacancies
