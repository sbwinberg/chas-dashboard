// FUNCTION LOAD FROM LOCAL STORAGE
///////////////////////////////////
window.addEventListener('load', addFromStorage);

function addFromStorage() {
    if(localStorage.getItem('title')){
        title.innerText = localStorage.getItem('title');
    }
    if(localStorage.getItem('links')){
        links = JSON.parse(localStorage.getItem('links'));
        links.forEach(obj => {
            displayLink(obj.link, obj.name)
        });
    }
    if(localStorage.getItem('notes')){
        text_area.value = localStorage.getItem('notes');
    }
    setDate();
    setTime();
    setInterval(setTime, 1000);
}

// FUNCTION SET TIME AND DATE
/////////////////////////////
const timeArea = document.querySelector('.time')
const dateArea = document.querySelector('.date')

function setTime() {
    const timeNow = new Date();
    const timeString = timeNow.toLocaleTimeString();
    timeArea.innerText = timeString;
}

function setDate() {
    const months = ['December','Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November']
    const dateNow = new Date();
    const day = dateNow.getDate();
    const monthIndex = dateNow.getMonth();
    const month = months[monthIndex]
    const year = dateNow.getFullYear();
    dateArea.innerText = `${day} ${month} ${year}`;
}

// FUNCTION CHANGE TITLE
/////////////////////////////////////////
const title = document.querySelector('.title');
const titleInput = document.querySelector('.title-input')

// HIDE TITLE AND SHOW INPUT ON DOUBLE CLICK
title.addEventListener('dblclick', () => {
    titleInput.classList.remove('hidden');
    title.classList.add('hide')
    titleInput.focus();
})

// WHEN ENTER IF PRESSED OR INPUT OUTFOCUSED SET AND SAVE TITLE
titleInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        updateTitle();
    }
})

titleInput.addEventListener('focusout', () => {
    updateTitle();
})

// UPDATE HTML AND LOCAL STORAGE + DEFAULT TITLE
function updateTitle(){
    let newTitle = titleInput.value;
    localStorage.setItem('title', newTitle)
    title.innerText = localStorage.getItem('title');
    titleInput.classList.add('hidden');
    title.classList.remove('hide')

    if(titleInput.value == ''){
        title.innerText = "John Doe's Dashboard"
    }
}

// FUNCTION ADD LINKS
/////////////////////
const linkList = document.querySelector('.links');
const addLinkBtn = document.querySelector('.add-link');
const linkInput = document.querySelector('.link-input');
const nameInput = document.querySelector('.name-input')
const regexURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
let links = [];
let url;

// DISPLAY INPUT ON DOUBLE CLICK
addLinkBtn.addEventListener('click', () => {
    linkInput.classList.remove('hidden');
    addLinkBtn.classList.add('hide')
    linkInput.focus();
})

// ON ENTER AND VALID INPUT SAVE URL VALUE AND DISPLAY NEXT INPUT
linkInput.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return

    url = linkInput.value.toLowerCase();
    if(url == ''){
        linkInput.classList.add('hidden');
        addLinkBtn.classList.remove('hide');
    } else if(!regexURL.test(url)){
        linkInput.value = '';
        alert('Invalid link format, try again!');
        addLinkBtn.classList.remove('hide')
    } else {
        linkInput.value = '';
        linkInput.classList.add('hidden')
        nameInput.classList.remove('hidden')
        nameInput.focus();
    }
})

// ON ENTER AND VALID INPUT SAVE URL AND NAME IN LOCAL STORAGE THEN DISPLAY LINK
nameInput.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return
    
    let name = nameInput.value;
    if(name == ''){
        nameInput.classList.add('hidden');
    } else {
        links = JSON.parse(localStorage.getItem('links'));
    
        let link = {
            'link' : `${url}`,
            'name' : `${name}`
        }
        links.push(link);
        storageLinks = JSON.stringify(links)
        localStorage.setItem('links', storageLinks)
        nameInput.value = ''
        nameInput.classList.add('hidden');
        displayLink(url, name)
    }    
})

// HIDE INPUT WHEN UNFOCUSING
// ONLY SHOW ADD BUTTON IF NAME INPUT IS NOT VISIBLE
linkInput.addEventListener('focusout', () => {
    if(nameInput.classList.contains('hidden')){
        linkInput.value = ''
        linkInput.classList.add('hidden');
        addLinkBtn.classList.remove('hide')
    }
})

nameInput.addEventListener('focusout', () => {
    nameInput.value = '';
    nameInput.classList.add('hidden');
    addLinkBtn.classList.remove('hide');
})

// GET FAVICON AND ADD HTML TEMPLATE FOR LINKS
function displayLink(url, name) {
    // WORKS BUT WITH LOW RESOLUTION
    // <img src="http://www.google.com/s2/favicons?domain_url=${url}" alt="${name} icon" class="icon">

    // WORKS WITH GENERIC LINKS (NOTHING AFTER .COM)
    // <img src="${url}/favicon.ico" alt="${name} icon" class="icon">

    const getDomain = new URL(url);
    const domainName = getDomain.hostname;

    const tmp = `
    <div class="link witem">
        <div class="icon-container">
        <img src="https://icon.horse/icon/${domainName}" class="icon">
        </div>
        <a href='${url}' target='_blank'>${name}</a>
        <i class="close" data-id=${url}>X</i>
    </div>
    `;
    linkList.innerHTML += tmp;
}

// FUNCTION CLOSE BUTTON
////////////////////////
// REMOVE ELEMENT AND FILTER LOCAL STORAGE
// NOT AN OPTION TO HAVE TWO IDENTICAL LINKS
linkList.addEventListener('click', (e) => {
    if(e.target.classList.contains('close')){
        links = JSON.parse(localStorage.getItem('links'));
        links = links.filter((obj) => {
            return obj.link != e.target.getAttribute('data-id')
        })
        links = JSON.stringify(links);
        localStorage.setItem('links', links)
        e.target.parentElement.remove();
    }
});

// FUNCTION NOTES
/////////////////
// SAVES ON FOCUS OUT, UPDATING VIA KEYBOARD LOSES EVERYTHING NOT SAVED
const text_area = document.querySelector('.text-area');
text_area.addEventListener('focusout', () => {
    const notes = text_area.value;
    localStorage.setItem('notes', notes);
})

// SAVES EVERY KEYPRESS BUT MISSES LAST KEY
text_area.addEventListener('keydown', () => {
    const notes = text_area.value;
    localStorage.setItem('notes', notes);
})

// FUNCTION WEATHER
///////////////////
// GET POSITION VIA BROWSER API
navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon)
});

// FETCH WEATHER FORECAST FROM WEATHER API 
async function getWeather(lat = 0, lon = 0, url = `https://api.weatherapi.com/v1/forecast.json?key=25a21f44ab1f402584c160402232711&q=${lat},${lon}&days=3&lang=sv`){
    const response = await fetch(url)
    const data = await response.json();
    displayWeather(data)
}

// GET WEATHER WITH NEW LOCATION ON ENTER
const city = document.querySelector('.location-input');
city.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return
    const newPlace = city.value;
    getWeather(0, 0, `https://api.weatherapi.com/v1/forecast.json?key=25a21f44ab1f402584c160402232711&q=${newPlace}&days=3&lang=sv`)
})

// DISPLAY WEATHER FROM WEATHER API
function displayWeather(data){
    const weekdays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
    const container = document.querySelector('.all-weathers')
    container.innerHTML = ''
    city.value = data.location.name;
    let short = data.forecast.forecastday;
    
    for(let obj in data.forecast.forecastday){
        const fullWeather = short[obj].day.condition.text.split(' ');
        let shortWeather = fullWeather[fullWeather.length -1]
        shortWeather = shortWeather[0].toUpperCase() + shortWeather.slice(1)
        let day;

        if(obj == 0){ day = 'Idag'}
        else if (obj == 1){ day = 'Imorgon'}
        if (obj == 2){
            const currentDay = new Date(short[obj].date);
            day = weekdays[currentDay.getDay()]
        }
        let tmp = 
        `<div class="weater-today weather-container witem">
                <div class='image-container'> 
                    <img src=${short[obj].day.condition.icon} alt=${short[obj].day.condition.text} class="weather-image">
                </div>
                <div class="weather-info">
                    <div class="day">${day}</div>
                    <div class="temp-and-such">
                        <div class="temp">${short[obj].day.avgtemp_c}&deg;C</div>
                        <div class="such">${shortWeather}</div>
                    </div>
                </div>
            </div>`
        container.innerHTML += tmp
    }
}

// FUNCTION BACKGROUND IMAGE
////////////////////////////
// GET DATA FROM UNSPLASH API
async function getImage(url = `https://api.unsplash.com/photos/random?query=wallpaper&count=1&orientation=landscape&client_id=eTEJDG-hpE5fzr60ehDGE_qEifMHQXo1Da67SzTYRr4`) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayBackground(data)
}

// CUT IMAGE TO CORRECT DIMENSIONS BASED ON WINDOW SIZE AND UPDATE CSS ROOT VARIABLE
function displayBackground(data) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bg = `url('${data[0].urls.raw}&h=${h}&w=${w}&dpr=2')`;
    document.body.style.setProperty('--bg-img', bg);
}

// GET NEW IMAGE ON CLICK
const bgBtn = document.querySelector('.new-background');
bgBtn.addEventListener('click', () => {
    getImage();
})

// FUNCTION BG QUERY
// UNBSPLASH RATE LIMIT 50 PICS/HOUR
////////////////////////////////////
const queryBtn = document.querySelector('.query-btn');
const queryInput = document.querySelector('.query-input')

// SHOW INPUT ON CLICK
queryBtn.addEventListener('click', () => {
    queryInput.classList.remove('hidden');
    queryBtn.classList.add('hide');
    queryInput.focus();
})

// REMOVE INPUT WHEN UNFOCUS
queryInput.addEventListener('focusout', () => {
    queryInput.value = '';
    queryInput.classList.add('hidden');
    queryBtn.classList.remove('hide');
})

// ON ENTER AND VALID INPUT GET NEW IMAGE FROM API WITH INPUT QUERY
queryInput.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return 

    if(queryInput.value == ''){
        queryInput.classList.add('hidden')
    } else {
        let query = queryInput.value;
        let url = `https://api.unsplash.com/photos/random?query=${query}&count=1&orientation=landscape&client_id=eTEJDG-hpE5fzr60ehDGE_qEifMHQXo1Da67SzTYRr4`
        queryInput.value = '';
        queryInput.classList.add('hidden');
        getImage(url);
    }
})

// FUNCTION CAT FACTS API
/////////////////////////
// GET DATA FROM API
async function getCatFact() {
    const response = await fetch('https://cat-fact.herokuapp.com/facts');
    const data = await response.json();
    displayCatFact(data)
} getCatFact();

// DISPLAY RANDOM ONE OF AVAILABLE CAT FACTS
function displayCatFact(data) {
    const factP = document.querySelector('.cat-fact');
    const index = Math.floor(Math.random() * data.length);
    const fact = `${data[index].text}`
    factP.innerText = fact;
}