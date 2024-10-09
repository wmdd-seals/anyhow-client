import { Button as HeadlessButton } from '@headlessui/react'
import type { ComponentPropsWithRef, PropsWithChildren, ReactNode } from 'react'

type ButtonProps = {
    buttonType?: 'default' | 'dark' | 'light'
} & ComponentPropsWithRef<'button'>

export function Button(props: PropsWithChildren<ButtonProps>): ReactNode {
    const { children, ...rest } = props

    const buttonStyles = {
        default: {
            backgroundColor: 'bg-slate-800',
            textColor: 'text-white'
        }
    }

    // TODO: Dynamically change the button's style
    const { backgroundColor, textColor } = buttonStyles['default']

    return (
        <HeadlessButton
            className={`h-12 px-5 py-3 rounded-md justify-center items-center gap-2 inline-flex font-bold ${backgroundColor} ${textColor}`}
            {...rest}
        >
            {children}
        </HeadlessButton>
    )
}
