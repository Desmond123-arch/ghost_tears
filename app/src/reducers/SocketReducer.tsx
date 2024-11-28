import { Socket } from 'socket.io-client'

export const SocketReducer = (
    state: Socket | null,
    action: { type: string; payload: Socket | null }
) => {
    switch (action.type) {
        case 'SET_SOCKET':
            return action.payload
        case 'CLEAR_SOCKET':
            return null
        default:
            return state
    }
}
