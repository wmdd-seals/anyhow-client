import { useAuth } from '@shared/lib'
import { type ReactNode } from 'react'
import { CreateGuideButton } from 'src/features/create-guide'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/shared/ui'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen/gql'
import { DropdownMenuForDesktop } from '@widgets/menu'
import { PopupMenuForMobile } from '@widgets/menu'
const FETCH_USER = graphql(`
    query User {
        user {
            email
            favoriteTopics
            firstName
            id
            lastName
            middleName
        }
    }
`)

function Header(): ReactNode {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const { data, loading } = useQuery(FETCH_USER)
    const user = data?.user

    if (loading) return <div>Loading...</div>

    return (
        <header className="bg-white text-white p-4 sticky top-0 z-[1]">
            <div className="container box-border mx-auto w-full flex justify-between items-center">
                <div className="flex items-center">
                    <Link to={'/'} className="block md:hidden">
                        <img
                            src="/logo-book.svg"
                            alt="Logo"
                            className="w-9 h-9"
                        />
                    </Link>
                    <Link to={'/'} className="hidden md:block">
                        <img
                            src="/primary-logo.svg"
                            alt="Logo"
                            className="w-36"
                        />
                    </Link>
                </div>
                <div className="lg:hidden">
                    <PopupMenuForMobile user={user} />
                </div>
                <div className="hidden lg:flex lg:space-x-4 items-center">
                    {isAuthenticated && user ? (
                        <>
                            <CreateGuideButton kind="tertiary">
                                Create a new guide
                            </CreateGuideButton>
                            <DropdownMenuForDesktop
                                thumbnail={
                                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-200 text-slate-800 space-x-1">
                                        {user.firstName[0].toUpperCase() +
                                            user.lastName[0].toUpperCase()}
                                    </div>
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Button className="bg-none text-slate-700 underline">
                                About us
                            </Button>
                            <Button
                                className="bg-none text-slate-700 underline"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}
                                className="bg-ah-green-primary py-3 px-6 rounded-full font-bold text-ah-font-primary"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export { Header }
