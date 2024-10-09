import type { ReactNode } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import { HomePage, GuidePage, AccountPage, QuizPage } from '../pages'
import LoginPage from 'src/pages/login'
import ProtectedRoute from './protectedroute'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute />}>
                <Route index element={<HomePage />} />
                <Route path="/:id">
                    <Route index element={<GuidePage />} />
                    <Route path="quiz/:id" element={<QuizPage />} />
                </Route>
                <Route path="account" element={<AccountPage />} />
            </Route>
        </>
    )
)

export function Router(): ReactNode {
    return <RouterProvider router={router} />
}
