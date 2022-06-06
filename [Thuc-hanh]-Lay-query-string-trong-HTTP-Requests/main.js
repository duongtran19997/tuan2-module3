const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {

    const parseURL = url.parse(req.url, true)
    const queryStringObject = parseURL.query

    res.end('HelloNodeJs');
    console.log(queryStringObject)
})
server.listen(3000, () => {
    console.log('running')
})
