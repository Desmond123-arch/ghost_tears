import pathConstants from "./pathConstants";
import React from "react"

const Home = React.lazy(() => import("../pages/Home"))
const Game = React.lazy(() => import("../pages/Game"))

const routes = [
    {path: pathConstants.HOME, element: <Home/>},
    {path: pathConstants.GAME, element: <Game/>}
]
export default routes;