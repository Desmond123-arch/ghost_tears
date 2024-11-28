import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export const SocketContext = createContext<{
    socket: Socket | null
    socketDispatch: React.Dispatch<{ type: string; payload: Socket | null }>
}>({
    socket: null,
    socketDispatch: () => null,
})
