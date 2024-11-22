import createGame from "./controllers/createGame.js"
import express from 'express'

const app = express()

//middleware
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world")
})

export default app