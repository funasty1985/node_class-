const socket = io()

socket.on('message', (msg) => {
    console.log(msg)
})

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault() // prevent the submit of html form to reload the page
    
    const clientMsg = e.target.elements.message.value
    
    socket.emit('clientMsg', clientMsg, (error) => {
        if (error) {                                    // defining an acknowledgements function
            return console.log(error)
        }
        
        console.log('The message was delivered')  
    })
})

document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolacation is not support by your browser')
    }

    navigator.geolocation.getCurrentPosition((Position) => {
    
        socket.emit('sendLocation', {
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
        }, () => {
            console.log('Location is shared')
        })
    })
})
