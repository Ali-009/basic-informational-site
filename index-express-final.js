const express = require('express')
const path = require('path')
const app = express()

function routePage(route, pageName){
    app.get(route, function(req, res, next){
            res.sendFile(path.join(__dirname, 'pages/' + pageName + '.html'))
    })
}

//Basic routing: urlPaths correspond to pageNames
urlPaths = ['/', '/about', '/contact-me']
pageNames = ['index', 'about', 'contact-me']

for(let i =0; i < urlPaths.length; i++){
    routePage(urlPaths[i], pageNames[i])
}

app.use(express.static(path.join(__dirname,'public')))

app.listen(3000, '127.0.0.1', () => {
    console.log('Listening on Port 3000')
})