import { type PropsWithChildren, type ReactNode } from 'react'
import cn from 'clsx'

interface TagProps {
    active?: boolean
    prefix?: JSX.Element
    suffix?: JSX.Element
}

export function Tag(props: PropsWithChildren<TagProps>): ReactNode {
    const { active, children, suffix, prefix } = props

    return (
        <span
            className={cn(
                'flex items-center gap-1.5 rounded-2xl p-2',
                active ? 'bg-any-green-200' : 'bg-any-purple-50'
            )}
        >
            {prefix}
            <span>{children}</span>
            {suffix}
        </span>
    )
}
