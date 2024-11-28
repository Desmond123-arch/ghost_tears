import { useContext, useEffect, useState } from 'react'
import GameForm, { newGameForms } from '../components/gameForm'
import GameLink from '../components/game_link'
import { SocketContext } from '../context/SocketContext'

const Home = () => {
    const [IsOpen, setIsOpen] = useState(false)
    const [roomId, setRoomId] = useState<number>(0)
    const [gettingLink, setGettingLink] = useState(false)
    const { socket } = useContext(SocketContext)

    const handleShowChange = (newShow: boolean) => {
        setIsOpen(newShow)
    }
    const createGame = (category: newGameForms) => {
        // console.log("game created")
        //maybe change difficulties here or something
        socket?.off('createGame')
        socket?.emit('createGame')
        console.log(category)
    }

    useEffect(() => {
        socket?.off('createdGame')
        socket?.on('createdGame', (data) => {
            //function that gets invite link from api(room id)
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            const createdRoomId = data.roomId
            setRoomId(createdRoomId)
            setGettingLink(true)
            setIsOpen(false)
        })

        return () => {
            socket?.off('createdGame')
        }
    }, [roomId, socket])

    return (
        <div data-theme="cyberpunk">
            <div className="card-body border w-[90%] md:w-max center bg-yellow-200 rounded-3xl shadow-lg text-center">
                <h2 className="card-title text-6xl line-clamp-2">👻</h2>
                <h2 className="card-title text-6xl line-clamp-2">
                    Ghost Tears
                </h2>
                <p>A spooky multiplayer experience</p>
                <div className="card-actions justify-center">
                    <button
                        className="btn rounded-xl"
                        onClick={() => {
                            setIsOpen(!IsOpen)
                        }}
                    >
                        Play now
                    </button>
                </div>
            </div>
            <div className="">
                {/** If GameForm is open hide the Game link and vice versa */}
                {/*   */}

                {gettingLink ? (
                    <GameLink
                        gameInviteLink={`${roomId}`}
                    />
                ) : (
                    <GameForm
                        show={IsOpen}
                        onShowChange={handleShowChange}
                        createGame={createGame}
                    />
                )}
            </div>
            <div className="mt-8 flex space-x-4 center top-[75%] md:top-[65%]">
                {['😱', '💀', '🎃'].map((emoji, index) => (
                    <div
                        key={index}
                        className="text-4xl animate-pulse"
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
