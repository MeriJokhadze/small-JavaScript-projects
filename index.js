"use strict"

const axios = require('axios');

// IMPORT FILES // 


// import { checkWeather } from "./weather";
// checkWeather();

// preloader


// LOADER
function loader() {
    let loader = document.getElementById("preloader");

    const delay = 1000;

    function hideLoader() {
        loader.style.display = "none";
    }

    // Add a "load" event listener to the window
    window.addEventListener("load", function () {
        // Use setTimeout to hide the loader after a delay
        setTimeout(hideLoader, delay);
    });
}

loader();

// DRAG AND DROP
function DragAndDrop() {
    let lists = document.getElementsByClassName("list");
    let rightBox = document.getElementById("right");
    let leftBox = document.getElementById("left");

    for (let list of lists) {
        // Drag start event listener for each list item
        list.addEventListener("dragstart", function (e) {
            let selected = e.target;

            // Dragover and drop event listeners for the right box
            rightBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            rightBox.addEventListener("drop", function (e) {
                rightBox.appendChild(selected);
                selected = null;
            });

            // Dragover and drop event listeners for the left box
            leftBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            leftBox.addEventListener("drop", function (e) {
                leftBox.appendChild(selected);
                selected = null;
            });
        });
    }
}

DragAndDrop();




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
            weatherIcon.src="./src/images/clouds.png";
        }else if(resultData.weather[0].main === "Clear"){
            weatherIcon.src="./src/images/clear.png";}
        else if(resultData.weather[0].main === "Rain"){
            weatherIcon.src="./src/images/rain.png";}
        else if(resultData.weather[0].main === "Drizzle"){
            weatherIcon.src="./src/images/drizzle.png";}
        else if(resultData.weather[0].main === "Mist"){
            weatherIcon.src="./src/images/mist.png";}
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


// QUIZZ

function quiz() {
    const apiQuizUrl = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple';

    
    axios.get(apiQuizUrl)
        .then((result) => {
            let data = result.data.results;
            console.log(data);

            let currentQuestionIndex = 0;
            let score = 0;
            let container = document.getElementById("quizzSection");
            let next = document.getElementById("nextBtn");
            let scoreDisplay = document.getElementById("scoreDisplay");
            let answered = false;

            // Function to handle the "Next" button
            function nextFunction() {
                next.addEventListener('click', function (e) {
                    if (answered) {
                        // If an answer has been chosen, proceed to the next question
                        currentQuestionIndex++;
                        resetAnswerButtons();
                        answered = false;
                        if (currentQuestionIndex < data.length) {
                            displayQuestion();
                        } else {
                            container.innerHTML = "Quiz Completed! Your Score: " + score;
                        }
                    } else {
                        alert("Please choose an answer before proceeding to the next question.");
                    }
                });
            }

            // Function to reset the answer buttons
            function resetAnswerButtons() {
                let answers = document.querySelectorAll('.btn');
                for (let j = 0; j < answers.length; j++) {
                    answers[j].style.backgroundColor = '';
                    answers[j].disabled = false;
                }
            }

            // Function to display the current question
            function displayQuestion() {
                let question = document.getElementById("questionValue");
                let answers = document.querySelectorAll('.btn');

                question.innerHTML = data[currentQuestionIndex].question;

                let answerChoices = [
                    data[currentQuestionIndex].correct_answer,
                    data[currentQuestionIndex].incorrect_answers[0],
                    data[currentQuestionIndex].incorrect_answers[2],
                    data[currentQuestionIndex].incorrect_answers[1],
                ];

                // Shuffle answer choices for randomness
                for (let i = answerChoices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [answerChoices[i], answerChoices[j]] = [answerChoices[j], answerChoices[i]];
                }

                for (let i = 0; i < answers.length; i++) {
                    answers[i].innerHTML = answerChoices[i];

                    answers[i].addEventListener("click", function (e) {
                        if (!answered) {
                            // If an answer hasn't been chosen yet
                            answered = true;
                            const targetBtn = e.target;

                            if (targetBtn.innerHTML === data[currentQuestionIndex].correct_answer) {
                                targetBtn.style.backgroundColor = "#98FB98"; 
                                score++;
                                scoreDisplay.innerHTML = "Score: " + score;
                            } else {
                                targetBtn.style.backgroundColor = "#D9544D";
                                scoreDisplay.innerHTML = "Score: " + score;
                            }

                            // Disable all answer choices after an answer is chosen
                            for (let j = 0; j < answers.length; j++) {
                                answers[j].disabled = true;
                            }
                        }
                    });
                }
            }

            // Start the quiz
            nextFunction();
            displayQuestion();
        })
        .catch((error) => {
            console.log("Error while fetching quiz data:", error);
        });
}

quiz();
