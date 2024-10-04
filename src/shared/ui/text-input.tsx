import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Field, Input, Label } from '@headlessui/react'

type InputProps = {} & ComponentPropsWithRef<'input'>

export function TextInput(props: InputProps): ReactNode {
    const { ...rest } = props

    return (
        <Field>
            <Label></Label>
            <Input {...rest} />
        </Field>
    )
}
