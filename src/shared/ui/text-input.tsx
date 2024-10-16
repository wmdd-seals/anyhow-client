import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Field, Input, Label } from '@headlessui/react'

type InputProps = {
    label?: string | JSX.Element
} & ComponentPropsWithRef<'input'>

export function TextInput(props: InputProps): ReactNode {
    const { label, ...rest } = props

    return (
        <Field>
            {Boolean(label) && <Label>{label}</Label>}
            <Input {...rest} />
        </Field>
    )
}
