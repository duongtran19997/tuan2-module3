const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

const server = http.createServer((req, res) => {
    let buffer = ''
    req.on('data',chunk => {
        buffer += chunk
    })
    req.on('end',()=>{

        res.end('hello Nodejs')
        console.log('done')
        console.log(buffer)
    })

})
server.listen(3000,()=>{
    console.log('server running at 3000')
})