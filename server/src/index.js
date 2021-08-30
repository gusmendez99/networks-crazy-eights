const app = require('express')();
const cors = require('cors');

app.use(cors({origin: null}))

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on("connection", (socket) => {
    console.log('connected')

    socket.on("set_color", color => {
        console.log('set_color', color)
        io.sockets.emit("color", color)
    })
})

http.listen(4000, () => {
    console.log("Listening in", 4000)
})
