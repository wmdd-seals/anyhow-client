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
import { Button } from '@shared/ui'

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
                <section className="text-any-purple-500 flex flex-col gap-10 items-center py-20 px-5 md:px-12 md:py-28 lg:px-32 lg:py-28">
                    <h2 className=" text-3xl md:text-5xl font-bold">
                        Dive into Our Project Proposal
                    </h2>
                    <p className="md:w-1/2 lg:w-1/3 text-center">
                        Curious about how this platform came to life?. Download
                        our Project Proposal and explore every detail.
                        <br />
                        <span className="font-bold">
                            Who knows, it might just spark your next big
                            investment idea! 😉
                        </span>
                    </p>
                    <Button size="large">Download the Blueprint</Button>
                </section>
            </main>
            <Footer />
        </>
    )
}
