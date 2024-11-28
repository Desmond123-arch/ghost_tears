import React, { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SocketContext } from '../context/SocketContext'
import { useParams } from 'react-router-dom'

const Game = () => {
    const [text, setText] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)
    const [myTurn, setMyTurn] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)
    const { socket } = useContext(SocketContext)
    const roomId = useParams()
    const hasJoined = useRef(false)

    //animation
    const variants = {
        show: {
            opacity: 1,
            y: 0,
            transition: {
                ease: 'easeOut',
                duration: 0.5,
            },
        },
        hide: {
            y: -20,
            opacity: 0,
        },
    }

    const endTurn = (letter: string) => {
        if (!myTurn) return
        setTime(10)
        socket?.emit('letterEntered', { letter: letter, roomId: roomId })
        setDisabled(true)
        setMyTurn(false)
        console.log('ending turn')
    }

    const startTurn = (letter: string) => {
        setTime(10)
        setText(letter)
        setDisabled(false)
        setMyTurn(true)
        console.log('starting turn')
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!myTurn) return
        setText(e.target.value)
        endTurn(e.target.value)
    }
    //Entering a room with id
    // async function EnterRoom(roomId: string) {
    //   console.log("entering room: ", roomId);
    //   await new Promise((resolve) => setTimeout(resolve, 10000)); // simulating request, replace later
    // }

    useEffect(() => {
        if (!hasJoined.current && roomId) {
            socket?.off('joinGame')
            socket?.emit('joinGame', roomId)
            hasJoined.current = true
            console.log('user has joined game')
        }

        socket?.on('error', (data) => {
            alert(data.message)
        })

        socket?.on('beginGame', (data) => {
            console.log(data)
            const room = data.room
            console.log(room[1])
            if (room[1] === socket.id) {
                setTime(10)
                console.log(roomId)
                socket?.emit('letterEntered', {
                    letter: '',
                    roomId: { ...roomId },
                })
                setDisabled(true)
                setMyTurn(false)
            }
        })

        socket?.on('playerLeft', () => {
            alert('Player left the game')
            setTime(10)
            setDisabled(true)
            setMyTurn(false)
            console.log('Player left the game')
        })

        socket?.on('letterReceived', (letter: string) => {
            startTurn(letter)
        })

        socket?.on('roundEnded', () => {
            setDisabled(true)
            setMyTurn(false)
            setTime(-1)
        })

        return () => {
            socket?.off('joinGame')
            socket?.off('letterReceived')
            socket?.off('beginGame')
            socket?.off('roundEnded')
        }
    }, [roomId, socket])

    useEffect(() => {
        if (time > 0) {
            const interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1 && myTurn) {
                        console.log('Time ran out, ending turn.')
                        socket?.emit('letterEntered', {
                            letter: text,
                            roomId: roomId,
                        })
                        setDisabled(true)
                        setMyTurn(false)
                        setTime(10)
                        clearInterval(interval)
                    }
                    return prevTime - 1
                })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [myTurn, roomId, socket, text, time])

    const handleSubmit = () => {
        setMyTurn(false)
        setDisabled(true)
        socket?.emit('submit', text)
        socket?.off('submit')
    }

    return (
        <div>
            {!disabled && time > 0 && (
                <AnimatePresence>
                    <motion.div
                        className={`mx-auto w-max mt-10 font-bold text-4xl p-3 ${
                            time > 2 ? 'text-green-500' : 'text-red-500'
                        }`}
                        key={time}
                        variants={variants}
                        animate={'show'}
                        initial="hide"
                    >
                        {!disabled && <p> {time} </p>}
                    </motion.div>
                </AnimatePresence>
            )}
            {disabled && (
                <p
                    className={`mx-auto w-max mt-10 font-bold text-4xl p-3`}
                    style={{ color: time > 2 ? 'green' : 'red' }}
                >
                    Waiting for opponent
                </p>
            )}
            <div className="center w-full flex justify-center gap-2">
                <input
                    type="text"
                    name="text"
                    value={text}
                    onChange={handleInput}
                    disabled={disabled}
                    className="disabled:bg-yellow-900 text-4xl font-bold text-center border rounded-xl shadow-lg py-2"
                />
            </div>
            <button
                className="center top-[50%] border border-yellow-800 text-xl p-3 rounded-md"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default Game
