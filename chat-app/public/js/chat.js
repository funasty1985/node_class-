const socket = io()

// Elements 
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('#submitButton')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#message')

// Template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-message-template').innerHTML

socket.on('message', (msg) => {
    console.log(msg)
    const html = Mustache.render(messageTemplate, {
        message: msg.text,
        createAt: moment(message.createAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', ({url,createAt})=>{
    console.log(createAt)
    const html = Mustache.render(locationTemplate, {
        url,
        createAt: moment(message.createAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})



$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault() // prevent the submit of html form to reload the page
  
    $messageFormButton.setAttribute('disabled','disabled')

    // disable send button
    const clientMsg = e.target.elements.message.value
    
    socket.emit('clientMsg', clientMsg, (error) => {  // defining an acknowledgements function
        // enable send button
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {                                    
            return console.log(error)
        }
        
        console.log('The message was delivered')  
    })
})

$sendLocationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolacation is not support by your browser')
    }
    
    $sendLocationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((Position) => {

        $sendLocationButton.removeAttribute('disabled')
    
        socket.emit('sendLocation', {
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
        }, () => {
            console.log('Location is shared')
        })
    })
})
