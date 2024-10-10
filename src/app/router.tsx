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
    OnboardingPage
} from '../pages'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/:id">
                <Route index element={<GuidePage />} />
                <Route path="quiz/:id" element={<QuizPage />} />
            </Route>
            <Route path="account" element={<AccountPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
        </Route>
    )
)

export function Router(): ReactNode {
    return <RouterProvider router={router} />
}
