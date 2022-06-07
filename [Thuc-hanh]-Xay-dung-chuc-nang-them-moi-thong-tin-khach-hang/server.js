const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer((req, res) => {
    if(req.method ==='GET') {
        fs.readFile('./templates/create.html', 'utf8', (err, data) => {
            res.setHeader('Content-Type', 'text/html')
            res.write(data);
            return res.end()
        })
    }else{
        fs.readFile('./templates/create.html','utf-8',(err, data) => {
            let dataHTML = ''
            req.on('data',chunk=>{
                dataHTML+=chunk
            })
            req.on('end',()=>{
                let name = qs.parse(dataHTML).name
                console.log(name)
                fs.writeFile('./data/data',name,err=>{
                    if(err){
                        console.log('err')
                        return
                    }
                    return res.end()
                })
            })
        })
    }
})
server.listen(3000, function (){
    console.log('Serve running port 3000')
})