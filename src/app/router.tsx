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
    EditGuidePage,
    Dashboard
} from '../pages'
import ProtectedRoute from './protectedroute'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route path="login" element={<LoginPage />} />
                <Route index element={<HomePage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/:id">
                        <Route index element={<GuidePage />} />
                        <Route path="edit">
                            <Route index element={<EditGuidePage />} />
                        </Route>
                        <Route path="quiz/:id" element={<QuizPage />} />
                        <Route path="account" element={<AccountPage />} />
                        <Route path="create" element={<CreateGuidePage />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Route>
            </Route>
        </>
    )
)

export function Router(): ReactNode {
    return <RouterProvider router={router} />
}
