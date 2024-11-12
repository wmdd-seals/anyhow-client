import { type ReactNode } from 'react'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { HeroSlider } from '@widgets/hero-slider'
import {
    PriceMenu,
    FeaturesSection,
    DescriptionSection,
    TeamIntroduction
} from '@widgets/about-us'

export function AboutUsPage(): ReactNode {
    return (
        <>
            <Header />
            <main className="flex flex-col gap-16">
                <HeroSlider />

                {/* "Learn or Share your Knowledge" */}
                <DescriptionSection />

                {/* "Choose a plan"*/}
                <PriceMenu />

                {/* "All the Knowledge at Your Own Pace" */}
                <FeaturesSection />

                {/* "Who Built This?" */}
                <TeamIntroduction />

                {/* "Buy This Project" */}
                <section className="flex flex-col gap-10 items-center py-16 px-5">
                    <h2 className=" text-3xl md:text-5xl font-bold">
                        Buy this project
                    </h2>
                    <p className="text-gray-600 md:w-1/2 lg:w-1/3 text-center">
                        This project is a part of Langara College's WMDD
                        program. If you're keen on investing in this platform,
                        reach out to us for more details!
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}
