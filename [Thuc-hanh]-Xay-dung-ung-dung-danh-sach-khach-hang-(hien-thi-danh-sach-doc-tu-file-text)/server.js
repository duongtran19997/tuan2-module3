const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let dataFile =''
    let html= ''
    fs.readFile('./data/data','utf-8',(err, data) =>{
        if(err){
            console.log(err.message);
        }else{
            dataFile = data.split(',')
            dataFile.forEach((value, index) => {
                html +='<tr>'
                html += `<td>${index+1}</td>`
                html += `<td>${value}</td>`
                html += `<td><button>delete</button></td>`
                html +='</tr>'
            })
        }
    } )
    fs.readFile('./templates/index.html','utf-8',(err, data) => {
        res.writeHead(200,'success',{'content-type':'text/html'})
        data = data.replace('{list-user}',html)
        res.write(data)
        res.end()
    })
})
server.listen(3000,()=>{
    console.log('server is running at 3000')
})