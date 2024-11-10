import { type ReactNode, useState, useEffect } from 'react'
import type { Guide } from '@gqlgen/graphql'
import { Button } from '@shared/ui'

interface CardStripProps {
    guide: Guide
}

export function CardStrip({ guide }: CardStripProps): ReactNode {
    const { id, title } = guide
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const coverImgUrl = `${import.meta.env.VITE_API_URL}/images/${id}`

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
        <div className="flex items-center">
            <div className="w-16 h-16">
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
                    <div className="flex justify-center items-center w-full relative">
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
                <h3>{title}</h3>
            </div>
            <div>
                <p>tags</p>
                <p>date</p>
                <p>status</p>
            </div>
            <div>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>
        </div>
    )
}
