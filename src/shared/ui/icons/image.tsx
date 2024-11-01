import type { ComponentPropsWithRef, ReactNode } from 'react'
import cn from 'clsx'

export function Image(props: ComponentPropsWithRef<'svg'>): ReactNode {
    const { className, ...rest } = props

    return (
        <svg
            className={cn('fill-current', className)}
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 6.5C4.5 5.11929 5.61929 4 7 4C8.38071 4 9.5 5.11929 9.5 6.5C9.5 7.88071 8.38071 9 7 9C5.61929 9 4.5 7.88071 4.5 6.5ZM7 6C6.72386 6 6.5 6.22386 6.5 6.5C6.5 6.77614 6.72386 7 7 7C7.27614 7 7.5 6.77614 7.5 6.5C7.5 6.22386 7.27614 6 7 6Z"
                fill=""
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.5 3C0.5 1.34315 1.84315 0 3.5 0H17.5C19.1569 0 20.5 1.34315 20.5 3V17C20.5 18.6569 19.1569 20 17.5 20H3.5C1.84315 20 0.5 18.6569 0.5 17V3ZM3.5 2C2.94772 2 2.5 2.44772 2.5 3V17C2.5 17.4288 2.76993 17.7946 3.14914 17.9367L13.793 7.29289C14.1835 6.90237 14.8167 6.90237 15.2072 7.29289L18.5 10.5857V3C18.5 2.44772 18.0523 2 17.5 2H3.5ZM18.5 13.4141L14.5001 9.41421L5.91429 18H17.5C18.0523 18 18.5 17.5523 18.5 17V13.4141Z"
                fill=""
            />
        </svg>
    )
}
