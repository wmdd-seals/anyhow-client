import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Field, Input, Label } from '@headlessui/react'

type InputProps = {
    label?: string | JSX.Element
    disabled?: boolean
    suffix?: JSX.Element
} & ComponentPropsWithRef<'input'>

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
    function TextInput(props, ref): ReactNode {
        const { label, disabled, suffix, ...rest } = props

        return (
            <Field className="flex flex-col gap-2">
                {Boolean(label) && <Label>{label}</Label>}
                <div className="relative">
                    <Input
                        ref={ref}
                        className={
                            'border-2 border-gray-300 rounded-md p-2 pr-24 hover:shadow focus:outline-none focus:border-green-500 disabled:bg-gray-100 w-full'
                        }
                        disabled={disabled}
                        {...rest}
                    />
                    {suffix && (
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                            {suffix}
                        </div>
                    )}
                </div>
            </Field>
        )
    }
)
