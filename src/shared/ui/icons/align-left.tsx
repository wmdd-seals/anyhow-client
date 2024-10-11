import type { ComponentPropsWithRef, ReactNode } from 'react'
import cn from 'clsx'

export function AlignLeft(props: ComponentPropsWithRef<'svg'>): ReactNode {
    const { className, ...rest } = props

    // className={cn('fill-current', className)}
    // {...rest}
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
                d="M3.5 5C2.94772 5 2.5 5.44772 2.5 6C2.5 6.55228 2.94772 7 3.5 7H21.5C22.0523 7 22.5 6.55228 22.5 6C22.5 5.44772 22.0523 5 21.5 5H3.5Z"
                fill=""
            />
            <path
                d="M3.5 9C2.94772 9 2.5 9.44772 2.5 10C2.5 10.5523 2.94772 11 3.5 11H17.5C18.0523 11 18.5 10.5523 18.5 10C18.5 9.44772 18.0523 9 17.5 9H3.5Z"
                fill=""
            />
            <path
                d="M2.5 14C2.5 13.4477 2.94772 13 3.5 13H21.5C22.0523 13 22.5 13.4477 22.5 14C22.5 14.5523 22.0523 15 21.5 15H3.5C2.94772 15 2.5 14.5523 2.5 14Z"
                fill=""
            />
            <path
                d="M3.5 17C2.94772 17 2.5 17.4477 2.5 18C2.5 18.5523 2.94772 19 3.5 19H17.5C18.0523 19 18.5 18.5523 18.5 18C18.5 17.4477 18.0523 17 17.5 17H3.5Z"
                fill=""
            />
        </svg>
    )
}
