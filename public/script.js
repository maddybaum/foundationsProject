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
console.log(`previous last day is ${prevLastDay}`)

let firstDayIndex = date.getDay()-2;


console.log(`the first day index is ${firstDayIndex}`)
const modalBackdrop = document.querySelector('#modalBackdrop')
const addEventModal = document.querySelector('#addEventPop')

const nextDays = 7 - lastDayIndex - 1;


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month = date.getMonth();

let currentMonth = months[month]
console.log(currentMonth);

let days = "";

document.querySelector('.date h2').innerHTML = months[date.getMonth()];
document.querySelector('.date h3').innerHTML = new Date().toDateString();


for(let x = firstDayIndex; x>0; x--){
    days += `<div class = prev-date>${prevLastDay - x + 1} </div>`
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
let eventDate = document.querySelector('#dates')
let addEventButton = document.querySelector('#addEvent')
addEventButton.addEventListener('click', displayModal)

function displayModal(){
    document.querySelector('#addEventModal').style.display = 'block'
}
function createEvent(){
    let newEvent = {
        eventTitle: eventTitle.value,
        eventDate: eventDate.value
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
                    pEvent.textContent = res.data[res.data.length-1].eventtitle;
                    //attach pEvent to the div
                    console.log(pEvent)
                    let newEventDate = splitArr[2]
                    let dateBox = document.getElementById(`${newEventDate}`)
                    dateBox.appendChild(pEvent) 
                    document.querySelector('#eventTitleInput').value=``
                    document.querySelector('#addEventModal').style.display = 'none'
                   getToDoList()
    //list.innerHTML += toDoListItem
        })
        }

            

function deleteEvent(id){
    axios.delete(`http://localhost:8765/newEvent/${id}`)
        .then(() => getToDoList())
        .catch(err=>console.log(err))

}

let daySquare = document.querySelector('.daySquare')
let saveEventButton = document.querySelector('#saveEvent')

saveEventButton.addEventListener('click', createEvent)
let dateInput = document.querySelector('#dates')

//TO DO LIST CODE
let toDoList = document.querySelector('#toDoList')
let list = document.querySelector('#list')
function struck(ele){
    ele.style="text-decoration:line-through";
}
function getToDoList() {

    list.innerHTML = ''
    axios.get('http://localhost:8765/newEvent')
    .then(res => {
        res.data.forEach(elem => {
           
    let toDoListItem = `<div class = "to-do-list"><li class = "item">${elem.eventtitle}<i class="fa-solid fa-trash-can" id = "button" onclick = "deleteEvent(${elem['event_id']})"></i></li>`
    list.innerHTML += toDoListItem
        })
        })
}


 //toDoList functionality   
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

let addToDoListBtn = document.querySelector('#addToDoListItem')
let addToDoListModal = document.querySelector('#addToDoListModal')

let closeToDoListButton = document.querySelector('#TDListcancelButton')
closeToDoListButton.addEventListener('click', closeToDoListModal)
function closeToDoListModal(){
    addToDoListModal.style.display = "none"
}
function showAddToDoListModal(){
    addToDoListModal.style.display = "block"
}
addToDoListBtn.addEventListener('click', showAddToDoListModal)

let toDoListList = document.querySelector('#toDoListList')
//let toDoListItem = document.querySelector('#toDoListItem')
let radioSelection = document.getElementsByName('priorityList')
let toDoListItemInput = document.querySelector('#toDoListItemInput')
//let prioritySelection = document.querySelector('input[name="priorityList":checked]').value

function addToDoListItem (){
    let newItem = {
        item: toDoListItemInput.value,
        priority: radioSelection.value
    }
    axios.post('http://localhost:8765/newItem', newItem)
                  .then((res) => {
                      console.log(res.data)
                      
                    let TDlistLI = document.createElement('li')
                      TDlistLI.textContent = res.data[res.data.length-1].item
                    toDoListList.appendChild(TDlistLI)
                    let itemPriority = null;
                    
                    let editButton = document.createElement('button');
                    editButton.innerHTML = `<i id = "edit" class="fa fa-pencil" style="font-size:10px"></i>`
                    toDoListList.appendChild(editButton)
                    console.log(itemPriority)
                    document.querySelector('#eventTitleInput').value = ''
                    
                    closeToDoListModal()
                    
})}

/*function getToDoListItems(){
    toDoListList.innerHTML = ``
    axios.get('http://localhost:8765/newItem')
    .then(res => {
        res.data.forEach(elem => {
            console.log(res.data)
            
                      //TDlistLI.textContent = res.data[res.data.length-1].item
                      let toDoListLI = `<li class = "item">${elem.eventtitle}<i id = "edit" fa fa-pencil" style="font-size:10px" onclick = "deleteEvent(${elem['item']})"></i></li>`
                    toDoListList.innerHTML += toDoListLI
                    let itemPriority = null;
                    //<i id = "edit" class="fa fa-pencil" style="font-size:10px"></i>
                    //let editButton = document.createElement('button');
                    //editButton.innerHTML = ``
                    //toDoListList.appendChild(editButton)
                    
                    document.querySelector('#eventTitleInput').value = ''
})
})
}*/

saveItem.addEventListener('click', () => {
    addToDoListItem()
    //getToDoListItems()
})
let editButton = document.querySelector('#edit')
//editButton.addEventListener('click', editItem)

//function editItem(){

//}