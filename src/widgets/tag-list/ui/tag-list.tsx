import React from 'react'

interface TagListProps {
    tags: string[]
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <div className="flex gap-4 items-start mt-6 w-full text-sm tracking-normal text-gray-700 whitespace-nowrap">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="gap-1.5 self-stretch px-2 py-1 rounded bg-slate-300"
                >
                    {tag}
                </span>
            ))}
        </div>
    )
}

export { TagList }
