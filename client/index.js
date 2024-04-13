const http = require('http')
const path = require('path')

const express = require('express')


const PORT = 8000;
const ROOT = path.join(__dirname)

const app = express()
const server = http.createServer(app)


app.use(express.static('./static'))


app.get('/', (req, res) => {
    res.sendFile('static/html/index.html', { root: ROOT })
})


app.get('/flowers', (req, res) => {
  res.sendFile('static/html/flowers.html')
})


server.listen(PORT, () => {
    console.log(`Chat server listening on ${PORT}`)
})
