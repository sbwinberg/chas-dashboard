// TODO

    
// ADD FUNCTION TO LOAD ALL ELEMENTS FROM LOCAL STORAGE
// SET LINKS, NOTES, TITLE ETC
window.addEventListener('load', addFromStorage);

function addFromStorage() {
    // If there's a value in localStorage, set title accordingly
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


// FUNCTION FOR SETTING TIME AND DATE
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


// FUNCTION CHANGE TITLE ON DOUBLE CLICK
const title = document.querySelector('.title');
const titleInput = document.querySelector('.title-input')

title.addEventListener('dblclick', () => {
    titleInput.classList.remove('hidden');
    title.classList.add('hide')
    titleInput.focus();
})

titleInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        updateTitle();
    }
})

titleInput.addEventListener('focusout', () => {
    updateTitle();
})

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
const linkList = document.querySelector('.links');
const addLinkBtn = document.querySelector('.add-link');
const linkInput = document.querySelector('.link-input');
const regexURL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
let links = [];


addLinkBtn.addEventListener('click', () => {
    linkInput.classList.remove('hidden');
    addLinkBtn.classList.add('hide')
    linkInput.focus();
})

// FIX MESSY ASS IF STATEMENTS
linkInput.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return
    url = linkInput.value.toLowerCase();
    
    if(url == ''){
        linkInput.classList.add('hidden');
        return
    }
    
    if(regexURL.test(url)){
        linkInput.value = '';
        linkInput.placeholder = 'Enter a name:'
        
    }else if(linkInput.placeholder == 'Enter a name:'){
        links = JSON.parse(localStorage.getItem('links'));

        let name = linkInput.value;
        let link = {
            'link' : `${url}`,
            'name' : `${name}`
        }
        links.push(link);
        storageLinks = JSON.stringify(links)
        localStorage.setItem('links', storageLinks)
        linkInput.value = ''
        linkInput.classList.add('hidden');
        displayLink(url, name)
        linkInput.placeholder = 'Enter URL:'
    }
})

linkInput.addEventListener('focusout', () => {
    linkInput.value = ''
    linkInput.placeholder = 'Enter URL:'
    linkInput.classList.add('hidden')
})


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
// NOT AN OPTION TO HAVE TWO IDENTICAL LINKS
linkList.addEventListener('click', (e) => {
    if(e.target.classList.contains('close')){
        links = JSON.parse(localStorage.getItem('links'));
        links = links.filter((obj) => {
            return obj.link != e.target.getAttribute('data-id')
        })
        console.log(links);
        links = JSON.stringify(links);
        localStorage.setItem('links', links)
        e.target.parentElement.remove();
    }
});


// NOTES
// SAVES ON FOCUS OUT, UPDATING VIA KEYBOARD LOSES EVERYTHING WRITTEN
const text_area = document.querySelector('.text-area');
text_area.addEventListener('focusout', () => {
    const notes = text_area.value;
    localStorage.setItem('notes', notes);
})


// FUNCTION WEATHER
///////////////////

// Get position via geolocation api
navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon)
});


async function getWeather(lat = 0, lon = 0, url = `https://api.weatherapi.com/v1/forecast.json?key=25a21f44ab1f402584c160402232711&q=${lat},${lon}&days=3&lang=sv`){
    const response = await fetch(url)
    const data = await response.json();
    displayWeather(data)
}

const city = document.querySelector('.location-input');
city.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return
    const newPlace = city.value;
    getWeather(0, 0, `https://api.weatherapi.com/v1/forecast.json?key=25a21f44ab1f402584c160402232711&q=${newPlace}&days=3&lang=sv`)
})

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
let data;
async function getImage(url = `https://api.unsplash.com/photos/random?query=wallpaper&count=1&orientation=landscape&client_id=eTEJDG-hpE5fzr60ehDGE_qEifMHQXo1Da67SzTYRr4`) {
    const response = await fetch(url);
    data = await response.json();
    displayBackground(data)
}


function displayBackground(data) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const index = Math.floor(Math.random() * data.length);
    const bg = `url('${data[index].urls.raw}&h=${h}&w=${w}&dpr=2')`;
    document.body.style.setProperty('--bg-img', bg);
}


const bgBtn = document.querySelector('.new-background');
bgBtn.addEventListener('click', () => {
    getImage();
})


// FUNCTION BG QUERY
// UNBSPLASH RATE LIMIT 50 PICS/HOUR
const queryBtn = document.querySelector('.query-btn');
const queryInput = document.querySelector('.query-input')


queryBtn.addEventListener('click', () => {
    queryInput.classList.remove('hidden');
    queryBtn.classList.add('hide');
    queryInput.focus();
})

queryInput.addEventListener('focusout', () => {
    queryInput.value = '';
    queryInput.classList.add('hidden');
    queryBtn.classList.remove('hide');
})


queryInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        if(queryInput.value == ''){
            queryInput.classList.add('hidden')
        } else {
            let query = queryInput.value;
            // change count to 1 to not overload my api limit :(
            let url = `https://api.unsplash.com/photos/random?query=${query}&count=1&orientation=landscape&client_id=eTEJDG-hpE5fzr60ehDGE_qEifMHQXo1Da67SzTYRr4`
            getImage(url);
        
            queryInput.value = '';
            queryInput.classList.add('hidden');
        }
    }
})


// FUNCTION CAT FACTS API
async function getCatFact() {
    const response = await fetch('https://cat-fact.herokuapp.com/facts');
    const data = await response.json();
    displayCatFact(data)
}
getCatFact();


function displayCatFact(data) {
    const factP = document.querySelector('.cat-fact');
    const index = Math.floor(Math.random() * data.length);
    const fact = `${data[index].text}`
    factP.innerText = fact;
}