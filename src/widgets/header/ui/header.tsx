import React, { useState } from 'react'
import { Button } from '../../../shared/ui'
import { mediaQuery, useMediaQuery } from 'src/shared/lib/mediaQuery'

const MobileMenu: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-800 focus:outline-none"
                aria-label="Menu"
            >
                {/* TODO: need to put icon here */}
                {isOpen ? 'CloseIcon' : 'MenuIcon'}
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-white">
                    <div className="flex flex-col items-center justify-center h-full">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-800 focus:outline-none"
                            aria-label="Close"
                        >
                            CloseIcon
                        </button>
                        {isLoggedIn ? (
                            <>
                                <Button buttonType="light">Profile</Button>
                                <Button buttonType="default">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button buttonType="light">Login</Button>
                                <Button buttonType="default">Sign Up</Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

const Header: React.FC = () => {
    const isMobile = useMediaQuery(mediaQuery.sp)
    const [isLoggedIn] = useState(false)

    return (
        <header className="bg-white text-white p-4">
            <div className=" container mx-auto w-full flex justify-between items-center">
                <div className="flex items-center">
                    <p className="text-2xl font-bold text-slate-800">Logo</p>
                </div>
                {isMobile ? (
                    <MobileMenu isLoggedIn={isLoggedIn} />
                ) : (
                    <div className="flex space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Button buttonType="light">Profile</Button>
                                <Button buttonType="default">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button buttonType="light">Login</Button>
                                <Button buttonType="default">Sign Up</Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export { Header }
