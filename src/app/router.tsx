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
    OnboardingPage,
    EditGuidePage,
    Dashboard
} from '../pages'
import ProtectedRoute from './protectedroute'
import { PublicRoute } from './public-route'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="account" element={<AccountPage />} />
            </Route>
            <Route path="/:id">
                <Route index element={<GuidePage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="edit">
                        <Route index element={<EditGuidePage />} />
                    </Route>
                    <Route path="quiz/:id" element={<QuizPage />} />
                </Route>
            </Route>
        </Route>
    )
)

export function Router(): ReactNode {
    return <RouterProvider router={router} />
}
