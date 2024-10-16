import { useContext } from 'react'
import { UserContext, type UserContextType } from './provider'

export const useAuth = (): UserContextType => {
    const context = useContext(UserContext)
    console.log(context)
    return context
}
