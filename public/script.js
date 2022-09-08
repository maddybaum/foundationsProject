//creating the calendar
let clicked = null;

const date = new Date();
console.log(date)

const renderCalendar = () => {
    date.setDate(1);
}
let monthDays = document.querySelector('.days')

const lastDay = new Date(date.getFullYear(),
date.getMonth()+1, 0).getDate()

const lastDayIndex = new Date(date.getFullYear(),
date.getMonth()+1, 0).getDay()

const prevLastDay = new Date(date.getFullYear(),
date.getMonth(), 0).getDate()

let firstDayIndex = date.getDay()+1;

const modalBackdrop = document.querySelector('#modalBackdrop')
const addEventModal = document.querySelector('#addEventPop')
const nextDays = 7-lastDayIndex -1

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month = date.getMonth();

let currentMonth = months[month]
console.log(currentMonth);

let days = "";

document.querySelector('.date h2').innerHTML = months[date.getMonth()];
document.querySelector('.date p').innerHTML = new Date().toDateString();


for(let x = firstDayIndex ; x>0; x--){
    days += `<div class = prev-date>${prevLastDay - x + 1 } </div>`
}

for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div id='${i}' class = "today">${i}</div>`
    } else{
    days+= `<div id = '${i}' class = "daySquare">${i}</div>`
  
}}

for(let j = 1; j <= nextDays; j++){
    days += `<div class = "next-date">${j}</div>`;

}
monthDays.innerHTML = days;

document.querySelector("#left").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
  
  document.querySelector("#right").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });

  //Adding and modifying events to calendar
let day = document.querySelectorAll('.daySquare')

day.forEach((elem) => {
    let dateToAdd = elem.id;
    elem.addEventListener('click', (event) => {
        // Storing the date that we just clicked.
        //let dateToAdd = event.target.id;

        // Show the modal.
        document.querySelector('#addEventModal').style.display = 'block' 
      
        let addEventButton = document.querySelector('#addButton')
        addEventButton.addEventListener('click', (e) => {
            
             let newEvent = {
                  //date: clicked,
                  eventTitle: eventTitle.value
              }
              axios.post('http://localhost:8765/newEvent', newEvent)
                  .then((res) => {
                      console.log(res.data)
                      // How we would access the day we just clicked.
                      console.log(document.getElementById(`${dateToAdd}`))
                      const newEventDate = document.getElementById(`${dateToAdd}`);
                      //make text element to hold our string coming back from the backend
                      //data is called eventtitle
                      //make new p tag
                      const pEvent = document.createElement('p');
                      //p tag text is new event title
                      //due to sequelize, res.data is an array. last event added is going to be the one I am interested in
                      pEvent.textContent = res.data[res.data.length-1].eventtitle;
                    //attach pEvent to the div
                    console.log(pEvent)
                      newEventDate.innerHTML = `<div class="daySquare">${dateToAdd} ${res.data[res.data.length-1].eventtitle}</div>`
                      console.log(`#${dateToAdd}`)

                    //newEventDate=null;
                  //getEvents()  
                  document.querySelector('#addEventModal').style.display = 'none'

                  
                  })
                  
        })
        newEventDate=null
    })
    })


let cancelButton = document.querySelectorAll('#cancelButton')

cancelButton.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        document.querySelector('#addEventModal').style.display = 'none'
    })
})
let eventTitle = document.querySelector('#eventTitleInput')

let addEventButton = document.querySelector('#addButton')

//addEventButton.addEventListener('click', createEvent)
    
/*function createEvent() {
    let newEvent = {
        //date: clicked,
        eventTitle: eventTitle.value
    }
    axios.post('http://localhost:8765/newEvent', newEvent)
        .then((res) => {
            console.log(res.data)
        getEvents()  
        })

}*/

function getEvents() {

    axios.get('http://localhost:8765/newEvent')
    .then(res => {
    res.data.forEach(elem => {
    let eventCard = 
`div class = "event-card"><h4> ${elem.eventTitle}</h4></div>`
})
    })
}

let deleteButton = document.querySelectorAll('#deleteButton')

/*function deleteEvent(id) {
    axios.delete(`http://localhost:8765/newEvent/${id}`)
        .then(() => getEvents())
        .catch(err => console.log(err))
}

deleteButton.forEach((elem) => {
    elem.addEventListener('click', deleteEvent
}))*/




