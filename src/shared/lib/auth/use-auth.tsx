import { useContext } from 'react'
import { UserContext, type UserContextType } from './provider'
import { useOutletContext } from 'react-router-dom'

export const useAuth = (): UserContextType => {
    const outletContext = useOutletContext<UserContextType | null | undefined>()
    const context = useContext(UserContext)

    return outletContext || context
}
