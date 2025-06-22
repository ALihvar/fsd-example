import { createBrowserRouter } from 'react-router'
import { Layout } from '../layout/Layout'
import { HomePage } from '../../pages/home'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/',
                Component: HomePage
            }
        ]
    }
])
