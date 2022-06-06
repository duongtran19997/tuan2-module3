const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require('url')



let handlers = {}

handlers.products = function (req,res){
    fs.readFile('./views/product.html',(err,data)=>{
        res.writeHead(200,{'content-type':'text/html'})
        res.write(data)
        return res.end()
    })
}
handlers.users = (req,res)=>{
    fs.readFile('./views/user.html',((err, data) => {
        res.writeHead(200,{'content-type':'text/html'})
        res.write(data)
        return res.end()
    }))
}
handlers.notFound = (req,res)=>{
    fs.readFile('./views/notFound.html',((err, data) => {
        res.writeHead(404,{'content-type':'text/html'})
        return res.end()
    }))
}


const server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url,true)
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '')
    const chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req,res)
})
let router = {
    'user':handlers.users,
    'product':handlers.products,}

server.listen(3000,()=>{
    console.log('fuck you at 3000')
})