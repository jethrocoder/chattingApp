let express=require('express')
let app=express()
let http=require('http')
let server=http.createServer(app)
let socketio=require('socket.io')
let io=socketio(server)
app.use('/',express.static(__dirname+'/public'))

let id_to_num={}
let cnt=1
io.on('connection',(socket)=>{
    console.log(socket.id,' connected')
    id_to_num[socket.id]=cnt++
    socket.on('clientMessage',(data)=>{
        let {clientData}=data
        console.log(`Client ${id_to_num[socket.id]}: `,clientData.message)
        let serverData={}
        serverData.message=clientData.message
        serverData.client=id_to_num[socket.id]
        io.emit('serverMessage',serverData)
    })
})

let PORT=process.env.PORT || 4444
server.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})