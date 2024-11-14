import { type ReactNode } from 'react'

export function DescriptionSection(): ReactNode {
    return (
        <section className="flex flex-col gap-8">
            <div className="md:text-center flex flex-col gap-2 px-5">
                <h2 className="text-3xl md:text-5xl font-bold">
                    Learn or Share your knowledge
                    <span></span>
                </h2>
                <p>
                    Become an avid learner with our bite-sized guides or create
                    new content to share on the community to monetize your
                    knowledge
                </p>
            </div>
            <section className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 px-5">
                {/* 1st image */}
                <div className="flex-1 relative overflow-hidden rounded-lg">
                    <img
                        src="/bg-img5.webp"
                        alt="Quick learning"
                        className="w-full object-cover aspect-[2/3] md:aspect-[7/5] lg:aspect-[6/5] lg:clip-path-top-right clip-path-bottom-right"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-any-purple-500/50 to-any-purple-800/80 from-0% to-80% lg:clip-path-top-right clip-path-bottom-right"></div>
                    <div className="absolute inset-6 right-1/3 justify-start lg:justify-end flex flex-col gap-3">
                        <p className="text-3xl text-white  font-bold">
                            Quick, focused learning for any schedule
                        </p>
                        <p className="text-white text-sm">
                            Short on time but eager to grow? Our guides are
                            designed for people who need to learn efficiently
                            without long commitments. Master new skills in
                            minutes and get back to your day.
                        </p>
                    </div>
                </div>

                {/* 2nd image */}
                <div className="flex-1 relative">
                    <img
                        src="/bg-img6.webp"
                        alt="Share knowledge"
                        className="rounded-lg w-full object-cover aspect-[2/3] md:aspect-[7/5] lg:aspect-[6/5] clip-path-top-left lg:clip-path-bottom-left"
                    />
                    <div className="absolute inset-6 left-1/3 flex flex-col gap-3 justify-end items-right">
                        <p className="text-white text-3xl font-bold text-right">
                            Share what you know, earn as you grow
                        </p>
                        <p className="text-white text-right text-sm">
                            Share your expertise and build a reputation. Help
                            others learn while you grow.
                        </p>
                    </div>
                </div>
            </section>
        </section>
    )
}
