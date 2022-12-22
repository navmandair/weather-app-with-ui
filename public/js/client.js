console.log("Client JS loaded");

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    const location = document.querySelector('input').value;
    const weatherText = document.querySelector('#weather-text');
    const weatherError = document.querySelector('#weather-error');
    weatherText.textContent = "Loading...";
    weatherError.textContent = "";
    
    //console.log(location)
    fetch('/weather?location=' + location).then((response) =>{
        response.json().then((data)=> {
            if(data.error){
                console.log(data.error)
                weatherText.textContent = "";
                weatherError.textContent = data.error;
            } else {
                console.log(data);
                weatherText.textContent = data.forecast
                weatherError.textContent = "";
            }
        })
    })
})
