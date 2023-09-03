import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`user connected with: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
  })

  socket.on('send-message', (data) => {
    socket.to(data.room).emit('receive_message', data.message, data.own)
    socket.emit('show_message', data.message, data.own)
  })
})

server.listen(3001, () => {
  console.log('server is running on port 3001')
})
