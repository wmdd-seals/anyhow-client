import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

type SliderProps = {
    children: React.ReactNode
    desktopItems?: number
    tabletItems?: number
    mobileItems?: number
    smallDesktopItems?: number
    sliderClass?: string
    showDots?: boolean
    itemClass?: string
}

function Slider({
    children,
    desktopItems = 1,
    tabletItems = 1,
    mobileItems = 1,
    smallDesktopItems = 1,
    sliderClass,
    itemClass,
    showDots = true
}: SliderProps): React.ReactNode {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: desktopItems
        },
        smallDesktop: {
            breakpoint: { max: 1500, min: 1024 },
            items: smallDesktopItems
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: tabletItems
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: mobileItems
        }
    }
    return (
        <div className="relative flex justify-center">
            <Carousel
                additionalTransfrom={0}
                autoPlaySpeed={3000}
                centerMode={false}
                containerClass="container"
                itemClass={itemClass}
                draggable
                focusOnSelect={false}
                infinite
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                dotListClass="absolute -bottom-8"
                renderButtonGroupOutside={false}
                renderDotsOutside={true}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={showDots}
                sliderClass={sliderClass}
                slidesToSlide={1}
                swipeable
                arrows={false}
            >
                {children}
            </Carousel>
        </div>
    )
}

export { Slider }
