import { Button as HeadlessButton } from '@headlessui/react'
import type { ComponentPropsWithRef, PropsWithChildren, ReactNode } from 'react'

type ButtonProps = {} & ComponentPropsWithRef<'button'>

export function Button(props: PropsWithChildren<ButtonProps>): ReactNode {
    const { children, ...rest } = props

    return <HeadlessButton {...rest}>{children}</HeadlessButton>
}
