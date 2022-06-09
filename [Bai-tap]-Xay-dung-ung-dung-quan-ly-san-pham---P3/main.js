const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require('url')
const sql = require('mysql')



let store = []
const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    console.log(urlPath)
    switch (urlPath.pathname){
        case '/add':
    if(req.method ==='GET'){
        fs.readFile('./views/addNew.html','utf-8',(err, data) => {
            if(err){
                console.log(err.message);
            }else{
                res.writeHead(200,'success',{'content-type':'text/html'})
                res.write(data)
                return res.end()
            }
        })
    }else{
        let data=''
        let dataHTML=''
        req.on('data',chunk => {
            data+=chunk
        })
        req.on('end',()=>{
            dataHTML = qs.parse(data)
            store.push(dataHTML)
            fs.writeFile('./data/data.json',JSON.stringify(store),err=>{
                if(err){
                    console.log('err');
                    return
                }
                let html = ''
                fs.readFile('./views/index.html','utf-8',(err1, data1) => {
                    store.forEach((value, index) => {
                        html+=`<tr>`
                        html+=`<td>${value.id}</td>`
                        html+=`<td>${value.name}</td>`
                        html+=`<td>${value.price}</td>`
                        html+=`</tr>`
                    })
                    data1=data1.replace('{list}',html)
                    res.writeHead(200,'success',{'content-type':'text/html'})
                    res.write(data1)
                    return res.end()
                })

            })
        })
    }
    break;
        case '/':
            fs.readFile('./views/index.html','utf8', ((err, data) => {
                if (err) {
                    throw new Error(err.message)
                }
                let html = ''
                store.forEach((value, index) => {
                    html+=`<tr>`
                    html+=`<td>${value.id}</td>`
                    html+=`<td>${value.name}</td>`
                    html+=`<td>${value.price}</td>`
                    html+=`</tr>`
                })
                data = data.replace('{list-user}', html)
                res.writeHead(200,'success', {'Content-type': 'text/html'})
                res.write(data)
                res.end()
            }))
            break;

}})
server.listen(3000,()=>{
    console.log('run 3000')
})