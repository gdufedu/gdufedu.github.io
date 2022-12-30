module.exports = function (server) {
  const io = require('socket.io')(server)
  io.on('connection', function (socket) {
    console.log('有一个客户端连接上了服务器')
    socket.on('sendMsg', function (data) {
      console.log('服务器接收到客户端发送的消息', data)
      data.name = data.name.toUpperCase()
      socket.emit('receiveMsg', data)
      console.log('服务器向客户端发送消息', data)
    })
  })
}
