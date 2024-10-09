import type { ReactNode } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import { HomePage, GuidePage, AccountPage, QuizPage } from '../pages'
import LoginPage from '../pages/login'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route path="login" element={<LoginPage />} />
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
