import type { ComponentPropsWithRef, ReactNode } from 'react'
import cn from 'clsx'

export function Underline(props: ComponentPropsWithRef<'svg'>): ReactNode {
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
                d="M7.5 3C7.5 2.44772 7.05228 2 6.5 2C5.94772 2 5.5 2.44772 5.5 3V10C5.5 11.8565 6.2375 13.637 7.55025 14.9497C8.86301 16.2625 10.6435 17 12.5 17C14.3565 17 16.137 16.2625 17.4497 14.9497C18.7625 13.637 19.5 11.8565 19.5 10V3C19.5 2.44772 19.0523 2 18.5 2C17.9477 2 17.5 2.44772 17.5 3V10C17.5 11.3261 16.9732 12.5979 16.0355 13.5355C15.0979 14.4732 13.8261 15 12.5 15C11.1739 15 9.90215 14.4732 8.96447 13.5355C8.02678 12.5979 7.5 11.3261 7.5 10V3Z"
                fill=""
            />
            <path
                d="M4.5 20C3.94772 20 3.5 20.4477 3.5 21C3.5 21.5523 3.94772 22 4.5 22H20.5C21.0523 22 21.5 21.5523 21.5 21C21.5 20.4477 21.0523 20 20.5 20H4.5Z"
                fill=""
            />
        </svg>
    )
}
