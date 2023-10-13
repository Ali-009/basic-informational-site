const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = '127.0.0.1' //localhost
const port = 8080 //default port number for HTTP

function routePage(res, filePathname){
    fs.readFile(filePathname, function(err, data){
        if(err) {
            res.writeHead(500, {'Content-Type' : 'text/html'})
            res.end('Failed To Deliver The Page')
        }
        //The header needs to be sent only once when the website is first visited
        if(!res.headersSent){
            res.writeHead(200, {'Content-Type': 'text/html'})
        }
        res.write(data)
        res.end()
    })
}

const server = http.createServer(function(req, res){
    requestURL = new URL(req.url, `http://${req.headers.host}`)
    //Routing
    const requestPath = requestURL.pathname
    if(requestPath === '/'){
        routePage(res, './index.html')
    } else if (requestPath === '/about'){
        routePage(res, './about.html')
    } else if (requestPath === '/contact-me'){
        routePage(res, './contact-me.html')
    } else if (requestPath.startsWith('/styles/') || requestPath.startsWith('/assets/')) {
        //Sending files requested by a webpage
        //Note that Content-Type need not be specified for files requested by an HTML
        fs.readFile('.' + requestPath, function(err, data){
            res.write(data)
            res.end()
        })
    } else {
        res.writeHead(404, {'Content-Type' : 'text/html'})
        res.end('404 Page Not Found!')
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
