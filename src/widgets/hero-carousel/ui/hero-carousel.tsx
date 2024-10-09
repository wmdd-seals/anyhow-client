import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useMediaQuery, mediaQuery } from 'src/shared/lib/mediaQuery'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
}

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

const PCCarousel = (): React.ReactNode => (
    <Carousel
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
        arrows={false}
    >
        {carouselItems.map((item, index) => (
            <div key={index} className="relative aspect-[2.84/1]">
                <a href="#" className="block absolute inset-0">
                    <img
                        src={item.imageUrl}
                        className="w-full h-full object-cover"
                        alt={item.title}
                    />
                </a>
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end pl-8 pb-8 w-2/3">
                    <h2 className="text-black font-bold mb-2 text-[56px]">
                        {item.title}
                    </h2>
                    <p className="text-[#717D96] text-[22px]">
                        {item.description}
                    </p>
                </div>
            </div>
        ))}
    </Carousel>
)

const MobileCarousel = (): React.ReactNode => (
    <Carousel
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
        arrows={false}
    >
        {carouselItems.map((item, index) => (
            <div key={index} className="relative aspect-[1/1.54]">
                <a href="#" className="block absolute inset-0">
                    <img
                        src={item.imageUrl}
                        className="w-full h-full object-cover"
                        alt={item.title}
                    />
                </a>
                <div className="absolute inset-x-0 bottom-1/4 flex flex-col justify-center p-4">
                    <h2 className="text-black font-bold mb-2 text-5xl">
                        {item.title}
                    </h2>
                    <p className="text-[#717D96] text-base">
                        {item.description}
                    </p>
                </div>
            </div>
        ))}
    </Carousel>
)

const HeroCarousel: React.FC = () => {
    const isMobile = useMediaQuery(mediaQuery.sp)

    return (
        <div className="pb-8 relative">
            {isMobile ? <MobileCarousel /> : <PCCarousel />}
        </div>
    )
}

export default HeroCarousel
