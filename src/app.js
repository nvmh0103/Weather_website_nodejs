const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();
const port=process.env.PORT || 3000;

// define paths
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const publicDirPath=path.join(__dirname, '../public');

// set up handlebars
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory 
app.use(express.static(publicDirPath));

// routes
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Me',
    });
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About page',
        name: 'Me'
    });
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help page',
        name: 'Me',
        helpText: 'sth helpful'
    });
})


app.get('/weather', ( req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide address',
        })
    }
    console.log(req.query.address);
    geocode(req.query.address, (error, {ladtitude, longitude, location}= {}) =>{
        if (error){
            return res.send({
                error,
            })
        } 
        forecast(ladtitude,longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error,
                })
            }
            res.send({
                location: location,
                temperature: forecastData.temperature,
                description: forecastData.description,
            })
        })

    })
})


app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'Please provide query!',
        })
    }
    console.log(req.query.search);
    res.send({
        product: [],
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error',{
        title:"Error page",
        errorMessage: 'Help article not found!',
        name: 'Me',
    })
})

app.get('*', (req, res) =>{
    res.render('error',{
        errorMessage: 'Page not found!',
        name: 'Me',
    })
})


// startup server
app.listen( port, () => {
    console.log('successfully!');
})