import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreateGuideButton } from 'src/features/create-guide'
import { Button, Dialog, DialogPanel } from '@headlessui/react'
import { Edit, Clock, BarChart, User, LogOut } from 'react-feather'
import { useAuth } from '@shared/lib'
import { X, Menu as MenuIcon } from 'react-feather'
import { Button as AhButton } from '@shared/ui'

type User = {
    firstName: string
    lastName: string
    middleName: string
    email: string
    favoriteTopics: string[]
}

export function PopupMenuForMobile({ user }: { user: User }): ReactNode {
    const { isAuthenticated, logout } = useAuth()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <Button onClick={() => setOpen(true)} className="w-10 h-10">
                {isAuthenticated ? (
                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-200 text-slate-800 space-x-1">
                        {user.firstName[0].toUpperCase() +
                            user.lastName[0].toUpperCase()}
                    </div>
                ) : (
                    <MenuIcon className="w-6 h-6 text-slate-700" />
                )}
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="z-50 relative"
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 flex justify-center items-center">
                    <DialogPanel className="relative z-50 flex flex-col rounded-lg shadow-lg overflow-hidden py-3 w-[95vw] h-[95vh] bg-white ">
                        <div className="flex w-full justify-end px-8 mt-4">
                            <Button onClick={() => setOpen(false)}>
                                <X className="w-6 h-6 text-slate-700" />
                            </Button>
                        </div>
                        <ul className="">
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <CreateGuideButton
                                            kind="destructive"
                                            className="!justify-start hover:bg-any-gray-50 active:bg-any-gray-100 !px-7 !py-[1.175rem] !font-normal !w-full"
                                            children={
                                                <div className="flex items-center gap-3 font-normal">
                                                    <Edit />
                                                    Create Guide
                                                </div>
                                            }
                                        />
                                    </li>
                                    <li>
                                        <Link
                                            to={'/dashboard'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            <Clock />
                                            My learning progress
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/dashboard'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            <BarChart />
                                            My content creations
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/account'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            <User />
                                            Account
                                        </Link>
                                    </li>
                                    <li>
                                        <AhButton
                                            className="!justify-start hover:bg-any-gray-50 active:bg-any-gray-100 !px-7 !py-[1.175rem] !font-normal"
                                            onClick={() => {
                                                logout()
                                                setOpen(false)
                                            }}
                                            kind="destructive"
                                        >
                                            <LogOut />
                                            Sign Out
                                        </AhButton>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to={'/'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            Features
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={'/'}
                                            className="text-start w-full px-7 py-[1.175rem] justify-start items-center gap-3 hover:bg-any-gray-50 active:bg-any-gray-100 inline-flex font-normal"
                                        >
                                            Team
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        <div className="mt-auto flex flex-col">
                            {isAuthenticated ? null : (
                                <div className="flex flex-col mt-auto my-10">
                                    <ul className="flex flex-col gap-6 px-7">
                                        <li className="w-full flex justify-center">
                                            <Link
                                                to={'/login'}
                                                className="underline font-bold"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <AhButton
                                                className="!w-full"
                                                onClick={() => {
                                                    navigate('/signup')
                                                    setOpen(false)
                                                }}
                                            >
                                                Sign up
                                            </AhButton>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div className="flex w-full justify-start bottom-0 border-t border-slate-200 px-7 pt-5 pb-3">
                                <Link
                                    to={'/aboutus'}
                                    className="text-slate-700"
                                >
                                    About AnyHow
                                </Link>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
