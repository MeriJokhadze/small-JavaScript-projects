
// 'use strict'

// export function checkWeather(){

    
// const apiKey = '48ffbdf5e960b115fa3084107715366f';
// const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey + '&q=';

// const searchBox = document.querySelector('.search input');
// const searchBtn = document.querySelector('.search button');
// const weatherIcon = document.querySelector('.weather-icon');

        
//     function weatherSearch(city){
            
//         axios.get(apiUrl+city)
//         .then((result) => {
//             console.log(result)
//             return result.data
//         })
//         .then(resultData =>{
//             console.log(resultData)

//             document.querySelector('.city').innerHTML = resultData.name;
//             document.querySelector('.temp').innerHTML = Math.round(resultData.main.temp )+'°C';
//             document.querySelector('.wind').innerHTML = resultData.wind.speed + 'km/h';
//             document.querySelector('.humidity').innerHTML = resultData.main.humidity + '%';
            
//             if(resultData.weather[0].main === "Clouds"){
//                 weatherIcon.src="images/clouds.png";
//             }else if(resultData.weather[0].main === "Clear"){
//                 weatherIcon.src="images/clear.png";}
//             else if(resultData.weather[0].main === "Rain"){
//                 weatherIcon.src="images/rain.png";}
//             else if(resultData.weather[0].main === "Drizzle"){
//                 weatherIcon.src="images/drizzle.png";}
//             else if(resultData.weather[0].main === "Mist"){
//                 weatherIcon.src="images/mist.png";}
//         })
//         .catch(function(error){
//             console.log(error)
//         });
//     }



//     searchBox.addEventListener('keyup', function (event) {
//         if (event.key === 'Enter') {
//         weatherSearch(searchBox.value);
//         }
//     });

    
//     searchBtn.addEventListener('click', () => {
//         weatherSearch(searchBox.value);
//     });

// }

