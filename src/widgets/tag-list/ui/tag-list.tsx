import React from 'react'
import { Tag } from 'src/shared/ui'

interface TagListProps {
    tags: string[]
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <div className="flex gap-4 items-start mt-6 w-full text-sm tracking-normal text-gray-700 whitespace-nowrap">
            {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
            ))}
        </div>
    )
}

export { TagList }
