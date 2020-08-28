const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const pathToDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')


app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partials)

app.use(express.static(pathToDirectory))
app.get('',(req, res)=>{
   res.render('index',{
       title:'Weather',
       name:'Saurabh Srivastava'
   }) 
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Saurabh Srivastava'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helptext:'this is some helpfull text',
        title:'Help',
        name:'Saurabh Srivastava'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
       return res.send("kindly provide an address")
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude, longitude, (error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcastdata:forcastdata,
                location,
            })
        })
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Saurabh Srivastava',
        errormessage:'Help article not found'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Saurabh Srivastava',
        errormessage:'page not found'
    })
})


//starting the server
app.listen(3000,()=>{
    console.log("server starting at post 3000")
})