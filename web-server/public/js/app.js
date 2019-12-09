// console.log('Client side javascript file is loaded!')

// 57 Brower HTTP Requests with Fetch
// eg
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then(data => {
//         console.log(data)
//     })
// })

// const url = 'http://localhost:3000/weather?address=boston' 

// fetch(url).then((response) => {
//         response.json().then(({location,forecast,error}={}) => {
//             if (error){
//                 console.log({error})
//             } else {
//                 console.log({location,forecast})
//             }
            
//         })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value 
    const url = `http://localhost:3000/weather?address=${location}`

    messageOne.textContent = 'Loading...'

    fetch(url).then((response) => {
        response.json().then(({location,forecast,error}={}) => {
            if (error){
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
            
        })
    })
    
})


