import React, { useReducer } from 'react'
import { SocketReducer } from '../../reducers/SocketReducer'
import { SocketContext } from '../SocketContext'

interface Props {
    children: React.ReactNode
}

const SocketContextProvider: React.FC<Props> = ({ children }) => {
    const [socket, socketDispatch] = useReducer(SocketReducer, null)
    return (
        <SocketContext.Provider value={{ socket, socketDispatch }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider
