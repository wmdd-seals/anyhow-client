import type { ReactNode } from 'react'
import { Button } from 'src/shared/ui'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { SliderGuideList } from '@widgets/guide-list'
import { PanelGuideList } from '@widgets/guide-list'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@shared/lib'
import { HeroSlider } from '@widgets/hero-slider'
import { Search } from 'react-feather'

export function HomePage(): ReactNode {
    const { isAuthenticated } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <div>
            <Header />
            {!location.state?.search ? (
                <section className="mx-auto md:px-0">
                    <HeroSlider />
                    <section className="flex flex-col my-16 mx-auto gap-y-16">
                        {!location.state?.onboarding && (
                            <div className="container mx-auto px-6 md:px-0">
                                <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold">
                                    Guides of the week
                                </h2>
                                <p className="text-center text-base text-slate-500">
                                    Collection of the top featured guides of the
                                    week
                                </p>
                                <SliderGuideList />
                            </div>
                        )}
                        {!isAuthenticated && (
                            <div className="mt-20 w-full aspect-square md:aspect-[3/2] lg:aspect-[3/1] xl:aspect-[4/1] max-h-[550px] relative mx-auto">
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
                                        We have 3434 guides available covering
                                        38 different topics for you to pick
                                        from.
                                    </p>
                                    <Button onClick={() => navigate('/signup')}>
                                        Create Account
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col container mx-auto px-6 md:px-0">
                            {location.state?.onboarding && (
                                <h2 className="flex justify-start text-xl sm:text-2xl md:text-3xl font-bold w-full">
                                    Recommended for you
                                </h2>
                            )}
                            <PanelGuideList />
                        </div>
                    </section>
                </section>
            ) : (
                <section className="container mx-auto px-6 md:px-0 flex flex-col gap-y-10 items-center min-h-screen">
                    <div className="flex items-center gap-2">
                        <Search className="w-6 h-6" />
                    </div>

                    <h2 className="text-center text-2xl sm:text-3xl md:text-5xl">
                        Search Results for{' '}
                        <span className="text-any-purple-800 font-bold">
                            "{location.state?.search}"
                        </span>
                    </h2>
                    <PanelGuideList
                        search={location.state?.search as string | null}
                    />
                </section>
            )}
            <Footer />
        </div>
    )
}
