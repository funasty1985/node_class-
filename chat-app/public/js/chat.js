const socket = io()

// 'countUpdated' is the event has to be matched with the one in server side
// count is the attribute received from the 'countUpdated' event , the name dones't
// have to match up with the one emitted from the server , however 
// if there are multiple attributed , the order of them are important
socket.on('countUpdated', (count)=> {
    console.log('The count has been updated', count)
})

document.querySelector('#increment').addEventListener('click', ()=> {
    console.log('Clicked')
    socket.emit('increment')
})