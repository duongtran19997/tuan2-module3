const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer((req, res) => {
    fs.readFile('./views/addnew.html','utf-8',(err, data) => {
        if(err){
            console.log(err.message);
            console.log('fuck')
        }else{
            res.writeHead(200,'success',{'content-type':'text/html'})
            res.write(data)
            return res.end()
        }
    })
})
server.listen(2000,()=>{
    console.log('server run 2000')
})