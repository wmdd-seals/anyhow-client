import type { ReactNode } from 'react'
import { Slider } from 'src/shared/ui'
import { Header } from 'src/widgets/header'
import { Footer } from 'src/widgets/footer/ui/footer'
import { Card } from 'src/entities/guide/ui'

const carouselItems = [
    {
        title: "Explore Nature's Beauty",
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae orci vitae nib venenatis tincidunt. Nunc eget velit vitae nisl faucibus varius.',
        imageUrl:
            'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    {
        title: 'Urban Adventures Await',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nisl vitae nib venenatis tincidunt. Nunc eget velit vitae nisl faucibus varius.',
        imageUrl:
            'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
        title: 'Discover Hidden Gems',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        imageUrl:
            'https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    {
        title: 'Embrace New Horizons',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageUrl:
            'https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    {
        title: 'Experience Unforgettable Moments',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imageUrl:
            'https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    }
]

export function HomePage(): ReactNode {
    return (
        <>
            <Header />

            <Slider>
                {carouselItems.map((item, index) => (
                    <div
                        key={index}
                        className="relative aspect-[1/1.54] md:aspect-[2.84/1] mx-auto"
                    >
                        <a href="#" className="block absolute inset-0">
                            <img
                                src={item.imageUrl}
                                className="w-full h-full object-cover object-center"
                                alt={item.title}
                            />
                        </a>
                        <div className="absolute inset-x-0 bottom-0 md:bottom-1/4 flex flex-col justify-end pl-8 pb-8 md:p-4 w-2/3">
                            <h2 className="text-black font-bold mb-2 text-[56px] md:text-5xl">
                                {item.title}
                            </h2>
                            <p className="text-[#717D96] text-[22px] md:text-base">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
            <section className="my-16 mx-auto px-4">
                <h2 className="text-center text-3xl font-bold">Our Services</h2>
                <p className="text-center text-base text-slate-500">
                    Collection of the top featured guides of the week
                </p>
                <Slider desktopItems={4} tabletItems={2} mobileItems={1}>
                    {Array.from({ length: 16 }, (_, index) => (
                        <div
                            key={index}
                            className="my-16 flex justify-items-center justify-center mx-auto w-[250px]"
                        >
                            <Card
                                imageUrl={`https://example.com/${index}.jpg`}
                                title={`Card Title ${index + 1}`}
                                description={`This is a description for card ${index + 1}.`}
                                tags={['tag1', 'tag2', 'tag3']}
                                cardType="simple"
                            />
                        </div>
                    ))}
                </Slider>
                <div className="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {Array.from({ length: 16 }, (_, index) => (
                        <div key={index}>
                            <Card
                                key={index}
                                imageUrl={`https://example.com/${index}.jpg`}
                                title={`Card Title ${index + 1}`}
                                description={`This is a description for card ${index + 1}.`}
                                tags={['tag1', 'tag2', 'tag3']}
                            />
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}
