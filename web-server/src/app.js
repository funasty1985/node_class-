const path = require('path')
const express = require('express')
//49 Advance Templating
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup static directory to serve 
// 45. Serving up Static Asset
// we can access to the html files in the directory my localhost/<filename>.html
app.use(express.static(publicDirectoryPath))

// Setup handlers engine and views location
// 48. Customizing the views Directory 
// By default, res.render() in app.get() will looking for .hbs file at /views folder
// We can directly the command to look for .hbs at other folder by the following:
app.set('views',viewsPath)

// 47 Dynamic Pages with Template 
// deploying hbs, we don't use require() but app.set()
app.set('view engine', 'hbs')

// Advanced Templating
hbs.registerPartials(partialsPath)


//　render function is used to render index.hbs
// here we just need to specify the name of the .hbs file
// render() will search for it at the view folder.
// make sure there is no a same name file @ the public folder 
// as app.use(express.static(publicDirectoryPath)) is used 

app.get('', (req, res) =>{
    res.render('index', {
        title:"Weather App",
        name:"Liang Fu"
    })                                   
})    

app.get('/about', (req,res) => {
    res.render('about', {
        title:"About Me",
        name:"Liang Fu"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name:'Liang Fu',
        helpText: "This is a help message"
    })
})
// 43. Hello Express! 
// 44. Serving up HTML and JSON 

// root route
// when app.use(express.static(publicDirectoryPath)) is used, app.get @root, @/help, @/about will not in used 
// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>') //
// })

// app.com/help
// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Andrew',
//         age:27              // this object will converted to a JSON and sent out 
//     })
// })

// app.com/about
// app.get('/about', (req, res)=> {
//     res.send('<h1>About</h1>')
// })

// app.com/weather
app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({
            error:'Address should be provided'
        })
    }                                     
    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({ error })
        } 
        forecast(latitude,longitude, (error, forcastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forcastData,
                location:location,
                address:req.query.address
            })   
        })
    })
})

//50 404 pages.
// wide card is used 
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Liang Fu',
        errorMsg: 'Help article note found'
    })
    
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Liang Fu',
        errorMsg: 'My 404 page'
    })
    
})


// 54 The Query String
// e.g 
// app.get('/products',(req,res)=>{
//     if (!req.query.search) {
//         // this return is needed as in express one request can only have one response 
//         // if there isn't a return, the following codes will run and there are further 
//         // repsonse to send to the client, there will be error on the server side.
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })


app.listen(3000, ()=>{
    console.log('Sever is up on port 3000')
})