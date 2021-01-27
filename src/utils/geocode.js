const request=require('postman-request')

const geocode=(address,callback)=>{
    
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWluaGhvYW5nMTMyMDAxIiwiYSI6ImNra2IyY3FqZTA4bXkyb25hZTdzaG1mbG8ifQ.c1XO1nxV2HF_HcYeJzCyNg&limit=1'
    request({ url, json: true}, (error, {body})=>{
        if (error){
            callback('Cant connect to location services');
        } else if (body.features.length===0){
            callback('Cant find location, try another')
        } else {
            callback(undefined,{
                ladtitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports=geocode;