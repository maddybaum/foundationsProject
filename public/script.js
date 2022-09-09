//creating the calendar
let clicked = null;

const date = new Date();
console.log(date)

const renderCalendar = () => {
    date.setDate(1);
    document.querySelector('#addEventModal').style.display = "none"
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
    days+=  `<div id='${i}' class = "daySquare">${i}</div>`
    
}}

//daySquare
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

let cancelButton = document.querySelectorAll('#cancelButton')

cancelButton.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        document.querySelector('#addEventModal').style.display = 'none'
    })
})


let eventTitle = document.querySelector('#eventTitleInput')

let addEventButton = document.querySelector('#addEvent')
addEventButton.addEventListener('click', displayModal)

function displayModal(){
    document.querySelector('#addEventModal').style.display = 'block'
}
function createEvent(){
    let newEvent = {
        eventDate: eventDate.value,
        eventTitle: eventTitle.value
    }
    axios.post('http://localhost:8765/newEvent', newEvent)
                  .then((res) => {
                      console.log(res.data)
                      // How we would access the day we just clicked.
                      
                      let eventDate = document.querySelector('#dates')
                        console.log(`the selected date is ${eventDate.value}`)
                        let dateToSplit = eventDate.value;
                        console.log(`date to split is ${dateToSplit}`)
                        let splitArr = dateToSplit.split('-')
                        console.log(splitArr)
                        
                        
                      //make text element to hold our string coming back from the backend
                      //data is called eventtitle
                      //make new p tag
                      const pEvent = document.createElement('p');
                      //p tag text is new event title
                      //due to sequelize, res.data is an array. last event added is going to be the one I am interested in

                      pEvent.textContent = res.data[res.data.length-1].eventtitle;
                    //attach pEvent to the div
                    console.log(pEvent)
                    let newEventDate = splitArr[2]
                    //document.querySelector('#dayNumber').value
                    let dateBox = document.getElementById(`${newEventDate}`)
                      dateBox.appendChild(pEvent) 
                    /*let deleteBtn = document.createElement('button')
                    deleteBtn.setAttribute('id', 'deleteButton')
                      deleteBtn.innerHtml = 'x'
                    dateBox.appendChild(deleteBtn)
                    deleteBtn.onclick = deleteEvent
                    //newEventDate=null;*/
                    document.querySelector('#addEventModal').style.display = 'none'
                   

                  })}

function deleteEvent(id){
    axios.delete(`http://localhost:8765/newEvent/${id}`)
        .then(() => getEvents())
        .catch(err=>console.log(err))

}

let daySquare = document.querySelector('.daySquare')
let saveEventButton = document.querySelector('#saveEvent')

saveEventButton.addEventListener('click', createEvent)
let dateInput = document.querySelector('#dates')

//TO DO LIST CODE
let toDoList = document.querySelector('#toDoList')

function getToDoList() {

    list.innerHTML = ''
    axios.get('http://localhost:8765/newEvent')
    .then(res => {
        res.data.forEach(elem => {
    let toDoListItem = `<div class = "to-do-list"><li class = "item">${elem.eventtitle}<button on click = "deleteEvent"(${elem['event_id']})X</button></li>`
    list.innerHTML += toDoListItem
        })
})
    }
function showToDoList(){
    toDoList.style.display = "block"
    getToDoList()
    console.log(dateInput)
}
function hideToDoList(){
    toDoList.style.display = "none"
}
let getToDoListBtn = document.querySelector('#todoList')
getToDoListBtn.addEventListener('click', showToDoList)

let closeToDoListBtn = document.querySelector('#closeToDoList')
closeToDoListBtn.addEventListener('click', hideToDoList)

