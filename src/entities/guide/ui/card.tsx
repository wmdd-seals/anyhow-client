import React from 'react'
import { TagList } from './tag-list'

interface CardComponentProps {
    imageUrl: string
    title: string
    description: string
    tags: string[]
    cardType?: 'default' | 'simple'
}

const Card: React.FC<CardComponentProps> = ({
    imageUrl,
    title,
    description,
    tags,
    cardType = 'default'
}) => {
    return (
        <article className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-700 border-solid max-w-[402px] min-w-[304px]">
            <div className="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full rounded-lg border-2 border-gray-700 border-solid bg-slate-100">
                <img
                    loading="lazy"
                    src={imageUrl}
                    alt=""
                    className="object-contain w-10 aspect-square"
                />
            </div>
            <div className="flex flex-col p-8 w-full">
                {cardType === 'default' && (
                    <div className="flex flex-col w-full">
                        <div className="flex w-full min-h-[32px]">
                            <div className="flex flex-1 shrink h-8 rounded basis-0 bg-slate-500 w-[113px]" />
                            <div className="flex flex-1 shrink w-28 h-8 rounded-none basis-0 bg-slate-500" />
                            <div className="flex flex-1 shrink h-8 rounded basis-0 w-[113px]" />
                        </div>
                    </div>
                )}
                <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-700">
                    {title}
                </h2>
                <p className="mt-6 text-base tracking-normal leading-6 text-slate-500">
                    {description}
                </p>
                {cardType === 'default' && <TagList tags={tags} />}
            </div>
        </article>
    )
}

export { Card }
