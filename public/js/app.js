


const weatherForm=document.querySelector('form');
const input=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent='Loading ..........';
    messageTwo.textContent='';
    fetch(`http://localhost:3000/weather?address=${input.value}`)
    .then(response =>{
        response.json()
            .then((data)=>{
                if (data.error)
                {
                    messageOne.textContent=`${data.error}`;
                } else {
                    messageOne.textContent=`Location: ${data.location}`;
                    messageTwo.textContent=`Temperature: ${data.temperature} , Forecast: ${data.description}`;
                }
            })
    })

})
