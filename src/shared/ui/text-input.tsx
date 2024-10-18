import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Field, Input, Label } from '@headlessui/react'

type InputProps = {
    label?: string | JSX.Element
} & ComponentPropsWithRef<'input'>

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
    function TextInput(props, ref): ReactNode {
        const { label, ...rest } = props

        return (
            <Field className={'flex flex-col gap-2'}>
                {Boolean(label) && <Label>{label}</Label>}
                <Input
                    ref={ref}
                    className={'border border-gray-300 rounded-lg'}
                    {...rest}
                />
            </Field>
        )
    }
)
