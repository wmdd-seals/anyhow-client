import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Field, Input, Label } from '@headlessui/react'

type InputProps = {
    label?: string | JSX.Element
    disabled?: boolean
    suffix?: JSX.Element
    labelClassName?: string
} & ComponentPropsWithRef<'input'>

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
    function TextInput(props, ref): ReactNode {
        const { label, disabled, labelClassName, suffix, ...rest } = props

        return (
            <Field className="flex flex-col gap-2">
                {Boolean(label) && (
                    <Label className={labelClassName}>{label}</Label>
                )}
                <div className="relative">
                    <Input
                        ref={ref}
                        className={
                            'border border-any-purple-400 rounded-xl p-2 pr-6 hover:shadow focus:outline-none focus:border-any-green-600 disabled:bg-gray-100 w-full'
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
