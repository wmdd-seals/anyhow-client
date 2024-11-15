import type { ReactNode } from 'react'
import { Slider } from 'src/shared/ui'

const carouselItems = [
    {
        title: 'Dive into quick learning',
        description:
            'Got a few minutes? Jump into bite-sized guides that fit your schedule and help you grow, one quick lesson at a time!',
        imageUrl: '/bg-img1.png',
        link: '/onboarding',
        linkText: 'Start Exploring'
    },
    {
        title: 'Get Full Access, Go Further!',
        description:
            'Want more? Unlock all guides, create your own learning paths, and access exclusive content by subscribing. Let’s level up!',
        imageUrl: '/bg-img2.jpeg',
        link: '/onboarding',
        linkText: 'Start Exploring'
    },
    {
        title: 'Meet AnyHow',
        description:
            'Curious about who we are? Check out our story and learn how we’re changing the way people learn, one bite at a time!',
        imageUrl: '/bg-img3.jpeg',
        link: '/aboutus',
        linkText: 'About Us'
    }
]

export function HeroSlider(): ReactNode {
    return (
        <div className="container mx-auto px-6 md:px-0">
            <Slider>
                {carouselItems.map((item, index) => (
                    <div
                        key={index}
                        className="container px-6 md:px-0 relative aspect-[1/1.54] md:aspect-[1.5/1] lg:aspect-[2.3/1] xl:aspect-[2.84/1]  mx-auto rounded-3xl overflow-hidden p-5"
                    >
                        <div className="block absolute inset-0">
                            <img
                                src={item.imageUrl}
                                className="w-full h-full object-cover object-center"
                                alt={item.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-any-purple-800/60 to-white/10 from-0%  to-80%"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-any-purple-800/80 via-transparent to-any-green-300/70 from-10% via-50% to-90% w-full h-full"></div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 md:bottom-8 gap-6 flex flex-col justify-end p-6 pb-8 md:pl-11 md:pb-8 w-full md:w-2/3 lg:w-1/2">
                            <h2 className="font-bold text-3xl md:text-6xl text-white w-full text-wrap">
                                {item.title}
                            </h2>
                            <p className="text-base md:text-lg text-white">
                                {item.description}
                            </p>
                            <a
                                href={item.link}
                                className="bg-white w-fit px-4 py-2 rounded-full font-bold"
                            >
                                {item.linkText}
                            </a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
