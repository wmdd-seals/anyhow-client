import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CreateGuideButton } from 'src/features/create-guide'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Edit, Clock, BarChart, User, LogOut } from 'react-feather'

type DropdownMenuProps = {
    thumbnail: ReactNode
}

export function DropdownMenuForDesktop({
    thumbnail
}: DropdownMenuProps): ReactNode {
    return (
        <Menu>
            <MenuButton>{thumbnail}</MenuButton>
            <MenuItems
                anchor={{ to: 'bottom end', gap: 10, offset: 10 }}
                className="z-50 flex flex-col rounded-lg shadow-lg bg-white top-4 overflow-hidden py-3"
            >
                <MenuItem>
                    <CreateGuideButton
                        kind="destructive"
                        className="!justify-start hover:bg-any-gray-50 active:bg-any-gray-100 !px-7 !py-[1.175rem] !font-normal"
                        children={
                            <div className="flex items-center gap-3 font-normal">
                                <Edit />
                                Create Guide
                            </div>
                        }
                    />
                </MenuItem>
                <MenuItem>
                    <Link
                        to={'/'}
                        className="text-start px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                    >
                        <Clock />
                        My learning progress
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        to={'/'}
                        className="text-start px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                    >
                        <BarChart />
                        My content creations
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        to={'/'}
                        className="text-start px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                    >
                        <User />
                        Account
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        to={'/'}
                        className="text-start px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                    >
                        <LogOut />
                        Sign Out
                    </Link>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
