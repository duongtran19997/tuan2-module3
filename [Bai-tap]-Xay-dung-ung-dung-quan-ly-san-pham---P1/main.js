const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer((req, res) => {
    let dataJSON = ''
    let html = ''
    fs.readFile('./data1/data.json', "utf-8", (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            dataJSON =JSON.parse(data)
            dataJSON.forEach((value,index)=>{
                html += '<tr>'
                html += `<td>${value.id}</td>`
                html += `<td>${value.name}</td>`
                html += `<td>${value.price}</td>`
                html += `<td><button>delete</button></td>`
                html += `<td><button>update</button></td>`
                html += '</tr>'
            })
        }
    })
    fs.readFile('./views/index.html','utf-8',((err, data) => {
        res.writeHead(200,'success',{'content-type':'text/html'})
        data = data.replace('{list-user}',html)
        res.write(data)
        res.end()
    }))
})
server.listen(3000)