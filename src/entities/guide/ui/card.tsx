import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, Bookmark, Share2 } from 'react-feather'
import markdownToTxt from 'markdown-to-txt'
import type { Guide } from '@gqlgen/graphql'
import { copyToClipboard } from '../lib'
import { useAuth } from '@shared/lib'
import { getGuideProgress } from 'src/entities/guide'

interface CardComponentProps {
    guide: Guide
    cardType?: 'default' | 'simple'
    isAuthenticated?: boolean
}

const Card: React.FC<CardComponentProps> = ({
    guide,
    cardType = 'default',
    isAuthenticated = false
}) => {
    const { setToast } = useAuth()
    const navigate = useNavigate()
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const coverImgUrl = `${import.meta.env.VITE_API_URL}images/${guide.id}`
    const readingTime = Math.ceil(
        (getGuideProgress(guide.body || '') * 60) / 100
    )

    useEffect(() => {
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
        <div
            onClick={(): void => navigate(`/${guide.id}`)}
            className="cursor-pointer grid grid-cols-1 grid-rows-subgrid  row-span-2 overflow-hidden bg-white rounded-2xl border-2 box-border border-gray-100 border-solid relative pb-11 gap-3"
        >
            <div className="flex overflow-hidden flex-col justify-center items-center w-full bg-blue-900 bg-gradient-to-b from-blue-900 to-black h-36">
                {imageSrc ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <img
                            loading="lazy"
                            src={imageSrc}
                            alt=""
                            className="object-cover w-full"
                        />
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full relative object-fit">
                        <img
                            src="/pattern.svg"
                            alt=""
                            className="object-fit w-full h-full opacity-50"
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
            <div className="grid auto-rows-auto grid-flow-row-dense p-4 w-full">
                {cardType === 'default' && (
                    <div className="w-full">
                        <div className="flex justify-between w-full min-h-[32px]">
                            <div>
                                {guide.user?.firstName} {guide.user?.lastName}
                            </div>
                            <p className="text-any-gray-500">
                                {readingTime} min
                            </p>
                        </div>
                    </div>
                )}
                <div className="text-2xl font-bold leading-tight text-gray-700 h-fit line-clamp-1">
                    {guide.title}
                </div>

                <p className="my-2 text-base tracking-normal leading-6 text-slate-500 h-[72px] line-clamp-3">
                    {markdownToTxt(guide.body ?? '')}
                </p>
                {!!guide.rating && guide.rating > 0 && (
                    <div className="flex items-center gap-2 absolute left-4 bottom-4">
                        <ThumbsUp
                            className="w-5 h-5"
                            fill={
                                typeof guide.liked === 'boolean' && guide.liked
                                    ? '#000'
                                    : '#fff'
                            }
                        />
                        <p className="h-full mt-1 flex items-center text-xs align-middle text-gray-500">
                            {guide.rating}% Positive
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-2 absolute bottom-4 right-4">
                    {isAuthenticated && (
                        <button>
                            <Bookmark
                                className="w-5 h-5"
                                fill={
                                    typeof guide.bookmark === 'boolean' &&
                                    guide.bookmark
                                        ? '#000'
                                        : '#fff'
                                }
                            />
                        </button>
                    )}
                    <button
                        onClick={async e => {
                            e.stopPropagation()
                            await copyToClipboard(
                                `${window.location.origin}/${guide.id}`
                            )
                            setToast({
                                visible: true,
                                message: 'Copied to clipboard'
                            })
                        }}
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { Card }
