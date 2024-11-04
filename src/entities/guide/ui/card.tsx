import React from 'react'
// import { TagList } from './tag-list'
import { Link } from 'react-router-dom'
import { ThumbsUp, Bookmark, Share2 } from 'react-feather'
import markdownToTxt from 'markdown-to-txt'
import type { Guide } from '@gqlgen/graphql'

interface CardComponentProps {
    guide: Guide
    cardType?: 'default' | 'simple'
}

const Card: React.FC<CardComponentProps> = ({
    guide,
    cardType = 'default'
}) => {
    const [imageSrc, setImageSrc] = React.useState<string | null>(null)
    const coverImgUrl = `${import.meta.env.VITE_API_URL}/images/${guide.id}`

    React.useEffect(() => {
        const fetchImage = async (): Promise<void> => {
            try {
                const response = await fetch(coverImgUrl)
                if (response.ok) {
                    setImageSrc(coverImgUrl)
                } else {
                    setImageSrc(null)
                }
            } catch {
                setImageSrc(null)
            }
        }
        void fetchImage()
    }, [coverImgUrl])

    return (
        <Link
            className="flex overflow-hidden flex-col bg-white rounded-2xl border-2 box-border border-gray-100 border-solid w-full"
            to={`/${guide.id}`}
        >
            <div className="flex overflow-hidden flex-col justify-center items-center w-full bg-blue-900 bg-gradient-to-b from-blue-900 to-black h-36">
                {imageSrc ? (
                    <div className="flex justify-center items-center w-full">
                        <img
                            loading="lazy"
                            src={imageSrc}
                            alt=""
                            className="object-contain w-36 aspect-square"
                        />
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full relative object-fit">
                        <img
                            src="/pattern.svg"
                            alt=""
                            className="object-fit w-full h-full"
                        />
                        <img
                            loading="lazy"
                            src="/logo.svg"
                            alt=""
                            className="object-contain w-36 aspect-square absolute"
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col p-4 w-full">
                {cardType === 'default' && (
                    <div className="flex flex-col w-full">
                        <div className="flex w-full min-h-[32px]">
                            <div>
                                {guide.user?.firstName} {guide.user?.lastName}
                            </div>
                        </div>
                    </div>
                )}
                <h2 className="text-2xl font-bold leading-tight text-gray-700">
                    {guide.title}
                </h2>
                <p className="my-2 text-base tracking-normal leading-6 text-slate-500 line-clamp-3">
                    {markdownToTxt(guide.body ?? '')}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5" />
                        <p className="h-full mt-1 flex items-center text-xs align-middle text-gray-500">
                            98% Positive
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button>
                            <Bookmark className="w-5 h-5" />
                        </button>
                        <button>
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export { Card }
