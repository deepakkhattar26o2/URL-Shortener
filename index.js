const config = require('config')
const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const localURL = config.get('localURL')

server.listen(3000)

console.log(`Listening at Port: `+ localURL)