import React from 'react'
import { TagList } from './tag-list'
import { Link } from 'react-router-dom'

interface CardComponentProps {
    imageUrl: string
    title: string
    description: string
    tags?: string[]
    cardType?: 'default' | 'simple'
    id: string
    userName?: string
}

const Card: React.FC<CardComponentProps> = ({
    imageUrl,
    title,
    description,
    tags,
    cardType = 'default',
    id,
    userName
}) => {
    const [imageSrc, setImageSrc] = React.useState<string | null>(null)

    React.useEffect(() => {
        const fetchImage = async (): Promise<void> => {
            const defaultImageUrl = '/logo.svg'
            try {
                const response = await fetch(imageUrl)
                if (response.ok) {
                    setImageSrc(imageUrl)
                } else {
                    setImageSrc(defaultImageUrl)
                }
            } catch {
                setImageSrc(defaultImageUrl)
            }
        }
        void fetchImage()
    }, [imageUrl])

    return (
        <Link
            className="flex overflow-hidden flex-col bg-white rounded-2xl border-2 box-border border-gray-100 border-solid w-full"
            to={id}
        >
            <div className="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full bg-blue-900 bg-gradient-to-b from-blue-900 to-black">
                <img
                    loading="lazy"
                    src={imageSrc ?? '/logo.svg'}
                    alt=""
                    className="object-contain w-36 aspect-square"
                />
            </div>
            <div className="flex flex-col p-8 w-full">
                {cardType === 'default' && (
                    <div className="flex flex-col w-full">
                        <div className="flex w-full min-h-[32px]">
                            <div>{userName}</div>
                        </div>
                    </div>
                )}
                <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-700">
                    {title}
                </h2>
                <p className="mt-2 text-base tracking-normal leading-6 text-slate-500">
                    {description}
                </p>
                {cardType === 'default' && tags && tags.length > 0 && (
                    <TagList tags={tags} />
                )}
            </div>
        </Link>
    )
}

export { Card }
