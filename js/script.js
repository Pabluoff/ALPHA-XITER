function updateLocation(location) {
    const locationElement = document.getElementById('cidade');
    locationElement.textContent = location;
}

function getIPLocation() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://wtfismyip.com/json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            const location = data.YourFuckingLocation.replace(/\,.+/g, "$'");
            updateLocation(location);
        } else {
            updateLocation("Cidade Desconhecida");
        }
    };

    request.onerror = function () {
        updateLocation("Erro na requisição");
    };

    request.send();
}

getIPLocation();



function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


function updateProgramDate() {
    const programDateElement = document.getElementById('data');

    
    const brazilTimeZone = 'America/Sao_Paulo';
    const now = luxon.DateTime.local().setZone(brazilTimeZone);

    
    const currentMonth = now.month;
    const currentYear = now.year;

    
    let maxDays = 30; 

    if (currentMonth === 2) { 
        maxDays = isLeapYear(currentYear) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(currentMonth)) {
        maxDays = 30;
    } else {
        maxDays = 31;
    }

    const formattedStartDate = now.toFormat('dd/MM/yyyy');

    programDateElement.textContent = formattedStartDate;
}

window.addEventListener('load', updateProgramDate);


// Scrolling effect
const scrollers = document.querySelectorAll(".scroller");
  addAnimation();

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
