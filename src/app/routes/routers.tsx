import { createBrowserRouter } from 'react-router'
import { Layout } from '../layout/Layout'
import { CursesPage } from '../../pages/courses'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/',
                Component: CursesPage
            }
        ]
    }
])
