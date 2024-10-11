import type { ComponentPropsWithRef, ReactNode } from 'react'
import cn from 'clsx'

export function Italic(props: ComponentPropsWithRef<'svg'>): ReactNode {
    const { className, ...rest } = props

    return (
        <svg
            className={cn('fill-current', className)}
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M9.5 4C9.5 3.44772 9.94772 3 10.5 3H19.5C20.0523 3 20.5 3.44772 20.5 4C20.5 4.55228 20.0523 5 19.5 5H15.5399L11.5399 19H14.5C15.0523 19 15.5 19.4477 15.5 20C15.5 20.5523 15.0523 21 14.5 21H5.5C4.94772 21 4.5 20.5523 4.5 20C4.5 19.4477 4.94772 19 5.5 19H9.4599L13.4599 5H10.5C9.94772 5 9.5 4.55228 9.5 4Z"
                fill=""
            />
        </svg>
    )
}
