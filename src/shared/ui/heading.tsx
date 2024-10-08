import type { ComponentPropsWithRef, PropsWithChildren, ReactNode } from 'react'

type HeadingProps = {
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & ComponentPropsWithRef<'h1'>

export function Heading(props: PropsWithChildren<HeadingProps>): ReactNode {
    const { level, children, ...rest } = props
    const HeadingTag = level

    return <HeadingTag {...rest}>{children}</HeadingTag>
}

export default Heading
