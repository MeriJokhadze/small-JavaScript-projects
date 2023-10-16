"use strict"

// IMPORT FILES // 


// import { checkWeather } from "./weather";
// checkWeather();



function DragAndDrop(){
    let lists = document.getElementsByClassName("list");
    let rightBox = document.getElementById("right");
    let LeftBox = document.getElementById("left");

    for (let list of lists){
        list.addEventListener("dragstart", function (e){
            let selected = e.target;
            rightBox.addEventListener("dragover", function (e){
                e.preventDefault();
            });

            rightBox.addEventListener("drop", function(e){
                rightBox.appendChild(selected);
                selected = null;
            });

            LeftBox.addEventListener("dragover", function (e){
                e.preventDefault();
            })

            LeftBox.addEventListener("drop", function(e){
                LeftBox.appendChild(selected);
                selected = null;
            })
        })
    }
}

DragAndDrop();

function loader(){
    let loader = document.getElementById("preloader");

    const delay = 1000;

    function hideLoader(){
        loader.style.display = "none";
    }

    window.addEventListener("load", function(){
       this.setTimeout(hideLoader, delay);
    })
}

loader();


//  WEATHER APP


const apiKey = '6e8b7e7b6e7c57da51cca48bdffa9771';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey + '&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');



function weatherSearch(city){
        
    axios.get(apiUrl+city)
    .then((result) => {
        console.log(result)
        return result.data
    })
    .then(resultData =>{
        console.log(resultData)

        document.querySelector('.city').innerHTML = resultData.name;
        document.querySelector('.temp').innerHTML = Math.round(resultData.main.temp )+'°C';
        document.querySelector('.wind').innerHTML = resultData.wind.speed + 'km/h';
        document.querySelector('.humidity').innerHTML = resultData.main.humidity + '%';
        
        if(resultData.weather[0].main === "Clouds"){
            weatherIcon.src="images/clouds.png";
        }else if(resultData.weather[0].main === "Clear"){
            weatherIcon.src="images/clear.png";}
        else if(resultData.weather[0].main === "Rain"){
            weatherIcon.src="images/rain.png";}
        else if(resultData.weather[0].main === "Drizzle"){
            weatherIcon.src="images/drizzle.png";}
        else if(resultData.weather[0].main === "Mist"){
            weatherIcon.src="images/mist.png";}
    })
    .catch(function(error){
        console.log(error)
    });
}
searchBox.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      weatherSearch(searchBox.value);
    }
  });

  
searchBtn.addEventListener('click', () => {
    weatherSearch(searchBox.value);
  });

