import { type ReactNode } from 'react'

export function FeaturesSection(): ReactNode {
    return (
        <section
            className=" bg-any-purple-500 text-white flex flex-col gap-10 items-center py-16 px-5"
            style={{
                backgroundImage: `url('/features-bg-pattern.png')`
            }}
        >
            <h2 className="text-center text-3xl md:text-5xl font-bold">
                All the knowledge at your own pace
            </h2>
            <div className="flex flex-col gap-8 items-center lg:max-w-7xl">
                {/* 1st Feature */}
                <div className="flex flex-col lg:flex-row lg:justify-center  rounded-lg">
                    <div className="relative lg:w-1/2">
                        <img
                            src="/feature1.webp"
                            alt="user photo"
                            className="h-auto object-cover rounded-lg relative clip-path-bottom-right lg:clip-path-top-right"
                        />
                    </div>
                    <div className="flex flex-col gap-3 items-start py-8 px-2 rounded-lg w-full lg:w-1/2">
                        <h3 className="text-3xl md:text-4xl font-bold">
                            AI tools for content creation and learning
                        </h3>
                        <p className="text-gray-300">
                            Leverage the power of AI to streamline your learning
                            and content creation. Our intelligent tools help you
                            generate engaginh, high-quality content quickly and
                            provide personalized learning suggestions to
                            optimize your study path. Whether you're creating
                            tutorials or brushing up on new skills, AI is here
                            to enhance your experience.
                        </p>
                    </div>
                </div>

                {/* 2nd Feature */}
                <div className="flex flex-col-reverse lg:flex-row lg:justify-center  rounded-lg">
                    <div className="flex flex-col gap-3 items-start py-8 px-2 rounded-lg">
                        <h3 className="text-3xl md:text-4xl font-bold">
                            Create and monetize content
                        </h3>
                        <p className="text-gray-300">
                            Share your expertise by creating bite-sized
                            monetization system. Build your brand, grow your
                            audience, and turn your knowledge into a sustanable
                            revenue stream. With easy- to use tools, you can
                            quickly create content that resonates with learners
                            worldwide.
                        </p>
                    </div>
                    <img
                        src="/feature2.webp"
                        alt="user photo"
                        className="h-auto object-cover rounded-lg clip-path-bottom-right lg:clip-path-bottom-left lg:w-1/2"
                    />
                </div>

                {/* 3rd Feature */}
                <div className="flex flex-col lg:flex-row lg:justify-center rounded-lg">
                    <img
                        src="/feature3.webp"
                        alt="user photo"
                        className="lg:w-1/2 h-auto object-cover rounded-lg clip-path-bottom-right lg:clip-path-top-right"
                    />
                    <div className="flex flex-col gap-3 items-start py-8 px-2 rounded-lg">
                        <h3 className="text-3xl md:text-4xl font-bold">
                            Save and track your progress
                        </h3>
                        <p className="text-gray-300">
                            Stay on top of your learning journey. Save guides,
                            track your progress, and pick up right wheter you
                            left off. Our platform helps you monitor your
                            achievements and recommends what to study next based
                            on your goals and interests. Never lose track of
                            your leaning path again.
                        </p>
                    </div>
                </div>

                {/* 4th Feature */}
                <div className="flex flex-col-reverse lg:flex-row lg:justify-center rounded-lg">
                    <div className="flex flex-col gap-3 items-start py-8 px-2 rounded-lg">
                        <h3 className="text-3xl md:text-4xl font-bold">
                            Interactive quizzes and challenges
                        </h3>
                        <p className="text-gray-300">
                            Put your knowledge to the test with interactive
                            quizzes that reinforce what you've learned. Face
                            engaging challenges designed to deepen your
                            understanding and solifdify your skills. Keep
                            learning fun and dynamic, and watch your skills grow
                            with every quiz you take.
                        </p>
                    </div>
                    <img
                        src="/feature4.webp"
                        alt="user photo"
                        className="lg:w-1/2 h-auto object-cover rounded-lg clip-path-bottom-right lg:clip-path-bottom-left"
                    />
                </div>
            </div>
        </section>
    )
}
