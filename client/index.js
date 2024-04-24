const http = require('http')
const path = require('path')

const express = require('express')


const PORT = 8000;
const ROOT = path.join(__dirname)

const app = express()
const server = http.createServer(app)


app.use(express.static('./static'))

const endpoints = {
  '/': 'index.html',
  '/flowers': 'flowers.html',
  '/flowers/form': 'flowerForm.html',
  '/orders': 'orders.html',
  '/orders/form': 'ordersForm.html'
}

for (const endpoint in endpoints) {
  app.get(endpoint, (req, res) => {
    res.sendFile(`/static/html/${endpoints[endpoint]}`, { root: ROOT })
  })
}


server.listen(PORT, () => {
    console.log(`FloraShop web server listening on ${PORT}`)
})
