"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"

interface CarouselProps {
      images: any
      orgName: string
      orgLogo: string
}

export function ImageCarousel({ images, orgName, orgLogo }: CarouselProps) {
      return (
            // <Carousel className="w-full h-[80px] mb-4 border rounded">
            //       <CarouselContent>
            //             {images.map((src: any, index: number) => (
            //                   <CarouselItem key={index} className="relative ">
            //                         <Image src={src} alt={`Carousel image ${index + 1}`} fill className="object-cover border" />
            //                         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
            //                               <Image
            //                                     src={orgLogo}
            //                                     alt={`${orgName} logo`}
            //                                     width={60}
            //                                     height={60}
            //                                     className="rounded-full"
            //                               />
            //                               <h2 className="text-white text-xl font-bold">{orgName}</h2>
            //                         </div>
            //                   </CarouselItem>
            //             ))}

            //       </CarouselContent>

            // </Carousel>
            <div className="w-full h-[100px] mb-4 border rounded-xl relative">
                  <Image src={images[0]} alt={`Carousel image ${1}`} fill className="object-cover      border w-full rounded-xl h-[100px]" />
                  <div className="absolute rounded-xl  inset-0 bg-black bg-opacity-50 flex items-center gap-4 px-4">
                        <Image
                              src={orgLogo}
                              alt={`${orgName} logo`}
                              width={60}
                              height={60}
                              className="rounded-full"
                        />
                        <h2 className="text-white text-xl font-bold">{orgName}</h2>
                  </div>
            </div>
      )
}
