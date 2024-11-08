import { Button as HeadlessButton } from '@headlessui/react'
import type { ComponentPropsWithRef, PropsWithChildren, ReactNode } from 'react'
import cn from 'clsx'

type ButtonKind =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'neutral'
    | 'destructive'
    | 'inverse'

type ButtonSize = 'small' | 'medium' | 'large'

type ButtonProps = {
    kind?: ButtonKind
    size?: ButtonSize
} & ComponentPropsWithRef<'button'>

export function Button(props: PropsWithChildren<ButtonProps>): ReactNode {
    const {
        children,
        kind = 'primary',
        size = 'medium',
        className,
        ...rest
    } = props

    return (
        <HeadlessButton
            className={cn(
                `justify-center items-center gap-2 inline-flex font-bold`,
                className,
                {
                    'btn-primary': kind === 'primary',
                    'btn-secondary': kind === 'secondary',
                    'btn-tertiary': kind === 'tertiary',
                    'btn-neutral': kind === 'neutral',
                    'btn-inverse': kind === 'inverse'
                },
                {
                    'btn-small': size === 'small',
                    'btn-medium': size === 'medium',
                    'btn-large': size === 'large'
                }
            )}
            {...rest}
        >
            {children}
        </HeadlessButton>
    )
}
