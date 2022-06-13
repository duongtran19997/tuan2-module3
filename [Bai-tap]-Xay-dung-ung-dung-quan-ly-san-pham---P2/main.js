const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require('url')
let store = []
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/addnew.html', 'utf-8', (err, data) => {
            if(err){
                console.log(err.message);
                console.log('fuck')
            }else{  res.writeHead(200, 'success', {'content-type': 'text/html'})
                res.write(data)
                console.log("lon")
                return res.end()

            }})

    } else {
        let dataHTML = ''
        req.on('data', chunk => {
            dataHTML += chunk
        })
        req.on('end', () => {
            let product = qs.parse(dataHTML)
            store.push(product)
            console.log(store)
            fs.writeFile('./data/data.json', JSON.stringify(store), (err) => {
                if (err) {
                    console.log('err');
                    return
                }
                let html = ''
                fs.readFile('./views/index.html', 'utf-8', (err1, data) => {
                    store.forEach((value, index) => {
                        html += `<tr>`
                        html += `<td>${value.id}</td>`
                        html += `<td>${value.name}</td>`
                        html += `<td>${value.price}</td>`
                        html += `</tr>`
                    })
                    data = data.replace('{list-user}', html)
                    res.writeHead(200, 'success', {'content-type': 'text/html'})
                    res.write(data)
                    return res.end()
                })
            })
        })
    }
})
server.listen(3000, () => {
    console.log('run at 3000')
})