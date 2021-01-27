
const request= require('postman-request')

const forecast= (ladtitude, longitude, callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=bfb783fe47630546ef4a2a99836d818f&query=${ladtitude},${longitude}&unit=m`

    request({ url, json: true},(error, {body}={})=>{
        if (error){
            callback('Cant connect to forecast services');
        }  else if (body.error){
            callback('Cant find the location');
        }   else {
            callback(undefined,{
                location: body.location.name,
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0],
            })
        }
    })
}
module.exports=forecast;
