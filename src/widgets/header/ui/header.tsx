import { useAuth } from '@shared/lib'
import { useState, type ReactNode } from 'react'
import { CreateGuideButton } from 'src/features/create-guide'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/shared/ui'

function MobileMenu({
    isAuthenticated
}: {
    isAuthenticated: boolean
}): ReactNode {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
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
                        {isAuthenticated ? (
                            <>
                                <Button>About us</Button>
                                <Button>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                                <Button onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

function Header(): ReactNode {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    return (
        <header className="bg-white text-white p-4 sticky top-0">
            <div className="container box-border mx-auto w-full flex justify-between items-center">
                <div className="flex items-center">
                    <p className="text-2xl font-bold text-slate-800">Logo</p>
                </div>
                <div className="lg:hidden">
                    <MobileMenu isAuthenticated={isAuthenticated} />
                </div>
                <div className="hidden lg:flex lg:space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Button>About us</Button>
                            <Button>Logout</Button>
                            <CreateGuideButton />
                        </>
                    ) : (
                        <>
                            <Button onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button onClick={() => navigate('/signup')}>
                                Sign Up
                            </Button>
                            <CreateGuideButton />
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export { Header }
