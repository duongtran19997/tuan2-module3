const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('qs')


let handlers = {}
handlers.calculator = (req, res) => {
    fs.readFile('./views/calculator.html', (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            let result = 0
            let data = '';
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', () => {
                const thisData = qs.parse(data)
                fs.readFile('./views/result.html', 'utf-8', ((err, data1) => {
                    if (err) {
                        console.log(err);
                    }

                    switch (thisData.select) {
                        case 'cong':
                            result = (+thisData.num1) + (thisData.num2 * 1)
                            break
                        case '-':
                            result = (+thisData.num1) - (thisData.num2 * 1)
                            break
                        case '*':
                            result = (+thisData.num1) * (thisData.num2 * 1)
                            break
                        case '/':
                            result = (+thisData.num1) / (thisData.num2 * 1)
                            break
                    }
                }))
                fs.readFile('./views/result.html', 'utf-8',(err1, data1) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        data1 = data1.replace('{result}', result)
                        res.writeHead(200, {'content-type': 'text/html'})
                        res.write(data1)
                        return res.end()
                    }
                })

            })
        }
    })
}
handlers.result = (req, res) => {
    fs.readFile('./views/result.html', (err, data) => {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(data)
        return res.end()
    })
}
handlers.notFound = (req, res) => {
    fs.readFile('./views/notFound.html', (err, data) => {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(data)
        return res.end()
    })
}

const router = {
    'calculator': handlers.calculator,
    'result': handlers.result,
}

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true)
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '')
    const chosenTrimPath = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenTrimPath(req, res)
})

server.listen(3000, () => {
    console.log('fuck you at 3000')
})