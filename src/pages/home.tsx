import type { ReactNode } from 'react'
import { Button, Slider } from 'src/shared/ui'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { SliderGuideList } from '@widgets/guide-list'
import { PanelGuideList } from '@widgets/guide-list'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@shared/lib'

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
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <section className="mx-auto md:px-0">
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
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 from-5% via-transparent via-70% to-green-200/50 to-95% w-full h-full" />
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
                                        className="bg-white w-fit px-4 py-2 rounded-full text-black"
                                    >
                                        {item.linkText}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <section className="my-16 mx-auto">
                    <div className="container mx-auto px-6 md:px-0">
                        <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold">
                            Guides of the week
                        </h2>
                        <p className="text-center text-base text-slate-500">
                            Collection of the top featured guides of the week
                        </p>
                        <SliderGuideList />
                    </div>
                    {!isAuthenticated && (
                        <div className="mt-20 w-full aspect-square md:aspect-[3/2] lg:aspect-[3/1] xl:aspect-[4/1] relative max-w-[1500px] mx-auto">
                            <img
                                src="/bg-img4.jpeg"
                                alt="bg-img"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="w-full h-full bg-any-purple-800/70 absolute inset-0"></div>
                            <div className="absolute inset-0 px-7 flex flex-col justify-center items-center gap-6">
                                <h2 className="text-white text-4xl font-bold">
                                    Explore
                                </h2>
                                <p className="text-white text-base">
                                    We have 3434 guides available covering 38
                                    different topics for you to pick from.
                                </p>
                                <Button onClick={() => navigate('/signup')}>
                                    Create Account
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className="container px-6 md:px-0 mx-auto my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10">
                        <PanelGuideList />
                    </div>
                </section>
            </section>
            <Footer />
        </>
    )
}
