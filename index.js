// TODO
//     Extra utmaning: Hämta länkens favicon och visa som bild i dashboarden.
    
// 4. Här ska vädret i närtid visas. Denna behöver inte se ut exakt som i skissen men det ska vara data som hämtas från något öppet API. För att avgöra vilken stad vädret ska visas för ska browserns geolocation-api användas.
    
//     Extra utmaning: Gör så att användaren kan anpassa orten som visas
    
// 5. Denna del får du fritt bestämma vad den ska innehålla. Det ska dock vara data från ett externt API och exempelvis kan det vara senaste nyheterna eller aktiekurser.
// 6. I den här delen ska användaren kunna skriva snabba anteckningar. Tänk en stor textarea bara där det som skrivs sparas hela tiden. Det ska inte finnas flera olika anteckningar utan bara just en yta.
// 7. När användaren klickar på denna knapp ska en randomiserad bild från Unsplash API hämtas och läggas in som bakgrund på dashboarden.
    
//     Extra utmaning: Låt användaren fylla i ett sökord som används för att hitta en randomiserad bild så att det blir inom ett tema som användaren önskar.

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
            console.log(obj)
            displayLink(obj.link, obj.name)
        });
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
    const timeString = timeNow.toLocaleTimeString()
    timeArea.innerText = timeString;
}


function setDate() {
    const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
    const dateNow = new Date();
    const day = dateNow.getDate();
    const monthIndex = dateNow.getMonth();
    const month = months[monthIndex]
    const year = dateNow.getFullYear();
    const todaysDate = `${day} ${month} ${year}`;
    dateArea.innerText = todaysDate;
}


// CHANGE TITLE ON DOUBLE CLICK
const title = document.querySelector('.title');
const titleInput = document.querySelector('.title-input')

// Show input box on double click
title.addEventListener('dblclick', () => {
    titleInput.classList.remove('hidden');
    titleInput.focus();
})


// When enter is pressed get input value, update local storage and title then remove input box
titleInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        let newTitle = titleInput.value;
        localStorage.setItem('title', newTitle)
        title.innerText = localStorage.getItem('title');
        titleInput.classList.add('hidden');
    }
    if(titleInput.value == ''){
        title.innerText = "John Doe's Dashboard"
    }
})


// FUNCTION ADD LINKS
const linkList = document.querySelector('.links');
const addLinkBtn = document.querySelector('.add-link');
const linkInput = document.querySelector('.link-input');
const regexURL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
let links = [];

//Show input box on double click
addLinkBtn.addEventListener('click', () => {
    linkInput.classList.remove('hidden');
    linkInput.focus();
})


// Check for enter-key
// Check if input field is empty
// Check if input is valid URL (with regex)
// Add link to array

// FIX MESSY ASS IF STATEMENTS
let url;
linkInput.addEventListener('keydown', (e) => {
    if(e.keyCode != 13) return
    
    if(linkInput.placeholder != 'Enter a name:'){
        url = linkInput.value.toLowerCase();
        console.log(url)
    }

    if(url == '' && linkInput.placeholder != 'Enter a name:'){
        linkInput.classList.add('hidden');
        return
    }
    
    if(regexURL.test(url) && linkInput.placeholder != 'Enter a name:'){
        linkInput.value = '';
        linkInput.placeholder = 'Enter a name:'
        
    } else if(linkInput.placeholder == 'Enter a name:'){
        // UPDATE LINKS ARRAY AND LOCAL STORAGE
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


function displayLink(url, name) {
    const tmp = `
    <div class="link">
        <a href='${url}' target='_blank'>${name}</a>
        <i class="close" data-id=${url}>X</i>
    </div>
    `;
    linkList.innerHTML += tmp;
}


// FUNCTION CLOSE BUTTON
linkList.addEventListener('click', (e) => {
    if(e.target.classList.contains('close')){
        links = links.filter((obj) => {
            return obj.link != e.target.getAttribute('data-id')
        })
        localStorage.setItem('links', links)
        e.target.parentElement.remove();
    }
});





