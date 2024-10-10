import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { type ComponentPropsWithRef, type ReactNode } from 'react'

type DropdownButtonProps = {
    label: string
    options: { label: string; onClick: () => void }[]
} & ComponentPropsWithRef<'div'>

export function DropdownButton({
    label,
    options,
    ...rest
}: DropdownButtonProps): ReactNode {
    return (
        <Menu as="div" className="relative inline-block text-left" {...rest}>
            <MenuButton className="h-12 px-5 py-3 rounded-md justify-center items-center gap-2 inline-flex font-bold bg-slate-800 text-white">
                {label}
            </MenuButton>
            <MenuItems>
                <div className="py-1">
                    {options.map((option, index) => (
                        <MenuItem key={index}>
                            {() => (
                                <button
                                    onClick={option.onClick}
                                    className={
                                        'block w-full text-left text-black data-[focus]:bg-blue-100'
                                    }
                                >
                                    {option.label}
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}
