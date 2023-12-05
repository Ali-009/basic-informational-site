const express = require('express')
const path = require('path')
const app = express()

//The default behavior of express.static is to send index.html
//when a request is made against the root directory '/'
app.use(express.static('public', { extensions: ['html']}))
//Sending a 404 page in case the requested page
//is not found in the 'public' directory
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public/page-404.html'))
})

app.listen(8080, '127.0.0.1', () => {
    console.log('Listening On Port 8080')
})