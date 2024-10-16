import type { ReactNode } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import {
    HomePage,
    GuidePage,
    AccountPage,
    QuizPage,
    LoginPage,
    Dashboard
} from '../pages'

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
                <Route path="account" element={<AccountPage />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Route>
        </>
    )
)

export function Router(): ReactNode {
    return <RouterProvider router={router} />
}
