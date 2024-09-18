import { ReactNode } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import { HomePage } from '../pages'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
        </Route>
    )
)

export function Router(): ReactNode {
    return <RouterProvider router={router} />
}
