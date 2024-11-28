import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/layout'
import routes from './routes'
import { useContext, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'
import { SocketContext } from './context/SocketContext'

function App() {
    const { socketDispatch } = useContext(SocketContext)
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        if (!socketRef.current) {
            const newSocket = io('http://localhost:3000')
            socketRef.current = newSocket
            socketDispatch({ type: 'SET_SOCKET', payload: newSocket })
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
                socketRef.current = null
                socketDispatch({ type: 'SET_SOCKET', payload: null })
            }
        }
    }, [socketDispatch])

    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: routes,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
