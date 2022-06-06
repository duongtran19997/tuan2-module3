const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require('url')

let handlers = {}

handlers.home = (req, res) => {
    fs.readFile('./views/home.html', (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            res.writeHead(200,{'content-type':'text/html'})
            res.write(data)
            return res.end()
        }
    })
}
handlers.login =(req,res)=>{
    fs.readFile('./views/login.html',((err, data) => {
        if(err){
            console.log(err.message);
        }else{
            res.writeHead(200,{'content-type':'text/html'})
            res.write(data)
            return res.end()
        }
    }))
}
handlers.profile = (req,res)=>{
    fs.readFile('./views/profile.html',((err, data) => {
        if(err){
            console.log(err.message);
        }else{
            res.writeHead(200,{'content-type':'text/html'})
            res.write(data)
            return res.end()
        }
    }))
}
handlers.notFound = (req,res)=>{
    fs.readFile('./views/notFound.html',(err, data)=>{
        res.writeHead(404,{'content-type':'text/html'})
        res.write(data)
        return res.end()
    })
}


const router ={
'login':handlers.login,
'profile':handlers.profile,
    'home':handlers.home
}
const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url,true)
    let path = parseUrl.pathname
let trimPath =path.replace(/^\/+|\/+$/g, '')
const chosenTrimpath =(typeof (router[trimPath])!=='undefined') ? router[trimPath]:handlers.notFound
chosenTrimpath(req,res)
})
server.listen(3000,()=>{
    console.log('fuck you at 3000')
})