import type { ReactNode } from 'react'
import { Button } from 'src/shared/ui'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { SliderGuideList } from '@widgets/guide-list'
import { PanelGuideList } from '@widgets/guide-list'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@shared/lib'
import { HeroSlider } from '@widgets/hero-slider'

export function HomePage(): ReactNode {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <section className="mx-auto md:px-0">
                <HeroSlider />
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
                    <PanelGuideList />
                </section>
            </section>
            <Footer />
        </>
    )
}
