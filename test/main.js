const fs = require('fs')
let loadData = ''
const data = 'i am a super man'+'with a super woman'

const writerStream = fs.createWriteStream('./test.json','utf-8')

writerStream.write(data)
writerStream.end()
writerStream.on('finish',()=>{
    console.log('success')
})
writerStream.on('error',(err)=>{
    console.log(err)
    }
)

