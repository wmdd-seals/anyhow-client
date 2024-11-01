import type { ReactNode } from 'react'
import { Slider } from 'src/shared/ui'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { SliderGuideList } from '@widgets/guide-list'
import { PanelGuideList } from '@widgets/guide-list'

const carouselItems = [
    {
        title: 'Dive into quick learning',
        description:
            'Got a few minutes? Jump into bite-sized guides that fit your schedule and help you grow, one quick lesson at a time!',
        imageUrl:
            'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        link: '/onboarding',
        linkText: 'Start Exploring'
    },
    {
        title: 'Dive into quick learning',
        description:
            'Got a few minutes? Jump into bite-sized guides that fit your schedule and help you grow, one quick lesson at a time!',
        imageUrl:
            'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        link: '/onboarding',
        linkText: 'Start Exploring'
    },
    {
        title: 'Dive into quick learning',
        description:
            'Got a few minutes? Jump into bite-sized guides that fit your schedule and help you grow, one quick lesson at a time!',
        imageUrl:
            'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        link: '/onboarding',
        linkText: 'Start Exploring'
    }
]

export function HomePage(): ReactNode {
    return (
        <>
            <Header />
            <section className="px-6 md:px-0">
                <Slider>
                    {carouselItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative aspect-[1/1.54] md:aspect-[2.84/1] mx-auto rounded-3xl overflow-hidden p-5"
                        >
                            <div className="block absolute inset-0">
                                <img
                                    src={item.imageUrl}
                                    className="w-full h-full object-cover object-center"
                                    alt={item.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 from-5% via-transparent via-70% to-green-200/50 to-95% w-full h-full" />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 md:bottom-8 gap-3 flex flex-col justify-end pl-11 pb-8 w-full md:w-2/3 lg:w-1/2">
                                <h2 className="font-bold mb-2 text-[48px] md:text-6xl text-white w-full">
                                    {item.title}
                                </h2>
                                <p className="text-[22px] md:text-base text-white">
                                    {item.description}
                                </p>
                                <a
                                    href={item.link}
                                    className="bg-white w-fit px-4 py-2 rounded-full text-black"
                                >
                                    {item.linkText}
                                </a>
                            </div>
                        </div>
                    ))}
                </Slider>
                <section className="my-16 mx-auto px-4">
                    <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold">
                        Guides of the week
                    </h2>
                    <p className="text-center text-base text-slate-500">
                        Collection of the top featured guides of the week
                    </p>
                    <SliderGuideList />
                    <div className="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        <PanelGuideList />
                    </div>
                </section>
            </section>
            <Footer />
        </>
    )
}
