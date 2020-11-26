let socket=io()
let chatInp=document.getElementById('chatInp')
let chatOut=document.getElementById('chatOut')
let btn=document.getElementById('btn')

socket.on('serverMessage',(data)=>{
    let serverData=data
    let text=serverData.client + ": " + serverData.message
    let p=document.createElement('p')
    p.textContent=text
    document.getElementById('chatOut').append(p)
})

btn.onclick=()=>{
    let text=document.getElementById('chatInp').value
    let clientData={}
    clientData.message=text
  socket.emit('clientMessage',{clientData})
}

