//creating the calendar
const date = new Date();
console.log(`teh value for date is ${date}`)

const renderCalendar = () => {
    date.setDate(1);
    document.querySelector('#addEventModal').style.display = "none"
}
let monthDays = document.querySelector('.days')

const lastDay = new Date(date.getFullYear(),
date.getMonth()+1, 0).getDate()

const prevLastDay = new Date(date.getFullYear(),
date.getMonth(), 0).getDate()

let firstDayIndex = 4;


console.log(`first day index is ${firstDayIndex}`)


const lastDayIndex = new Date(date.getFullYear(),
date.getMonth()+1, 0).getDay()

console.log(lastDayIndex)



console.log(`previous last day is ${prevLastDay}`)




console.log(`the first day index is ${firstDayIndex}`)

const modalBackdrop = document.querySelector('#modalBackdrop')
const addEventModal = document.querySelector('#addEventPop')

const nextDays = 7 - lastDayIndex - 1;


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//let month = date.getMonth();

//let currentMonth = months[month]
//console.log(currentMonth);

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

let currentMonth = date.getMonth()
console.log(`current month is ${currentMonth}`)

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(currentMonth - 1);
    renderCalendar();
  });
  
  document.querySelector("#right").addEventListener("click", () => {
    date.setMonth(currentMonth + 1);
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
//get list of events on calendar
function getToDoList() {

    list.innerHTML = ''
    axios.get('http://localhost:8765/newEvent')
    .then(res => {
        res.data.forEach(elem => {
           
    let toDoListItem = `<div class = "to-do-list"><li class = "item">${elem.eventtitle}<i class="fa-solid fa-trash-can" id = "button" onclick = "deleteEvent(${elem['event_id']})"></i></li>`
    list.innerHTML += toDoListItem
    
    }
        )
})
}
 
 //toDoList functionality   
 let getToDoListBtn = document.querySelector('#todoList')
 getToDoListBtn.addEventListener('click', showToDoList)
 
 let closeToDoListBtn = document.querySelector('#closeToDoList')
 closeToDoListBtn.addEventListener('click', hideToDoList)
 
 let addToDoListBtn = document.querySelector('#addToDoListItem')
 let addToDoListModal = document.querySelector('#addToDoListModal')
 
 let closeToDoListButton = document.querySelector('#TDListcancelButton')
 closeToDoListButton.addEventListener('click', closeToDoListModal)

 //functions to show & hide to do list at bottom of screen
 function showToDoList(){
    toDoList.style.display = "block"
    getToDoList()
    console.log(dateInput)
}
function hideToDoList(){
    toDoList.style.display = "none"
}

//functions to generate the add to do list items modal


function closeToDoListModal(){
    addToDoListModal.style.display = "none"
}
function showAddToDoListModal(){
    addToDoListModal.style.display = "block"
}
addToDoListBtn.addEventListener('click', showAddToDoListModal)


let toDoListList = document.querySelector('#toDoListList')

let priorityList = document.getElementsByName('priorityList')
//document.querySelector('input[name = "priorityList"]:checked').value
let radioSelection = document.getElementsByName('priorityList')
let toDoListItemInput = document.querySelector('#toDoListItemInput')




function addToDoListItem (){
    let checked 
    for(let i = 0; i < radioSelection.length; i++){
    if(radioSelection[i].checked === true){
        checked = radioSelection[i]
    }
}
    let newItem = {
        //id attribute set equal to id from database
        
        item: toDoListItemInput.value,
        priority: checked.value
    }
    axios.post('http://localhost:8765/newItem', newItem)
                  .then((res) => {
                      console.log(res.data)
                      res.data.forEach(elem => {
                    let TDlistLI = document.createElement('li')
                      //TDlistLI.textContent = res.data[res.data.length-1].item
                    
                    let itemPriority = null;
                    let toDoListLI = `<li class = "item">${elem.item}<i id = "edit" class = "fa fa-pencil" style="font-size:10px" onclick = "editItem(${elem['item_id']})"></i><i class="fa-solid fa-trash-can" id = "button" onclick = "deleteItem(${elem['item_id']})"></i></li>`
                      
                    toDoListList.innerHTML += toDoListLI
                   document.querySelector('#editToDoListItemInput').value = ''
                 
                    console.log(itemPriority)
                    
                    
                    closeToDoListModal()
                    document.querySelector('#toDoListItemInput').value = ``
})
                  })}


let editToDoListModal = document.querySelector('#editToDoListModal')
let editListcancelButton = document.querySelector('#editListcancelButton')
editListcancelButton.addEventListener('click', hideEditToDoListModal)

function showEditToDoListModal(){
    editToDoListModal.style.display = "block"
         }

let createdEditSaveButton = document.querySelector('#createdEditSaveButton')
//createdEditSaveButton.addEventListener('click', editItem)

function hideEditToDoListModal(){
    editToDoListModal.style.display = "none"
}
                 // "editItem(${elem['item_id']})"
function getToDoListItems(){
    toDoListList.innerHTML = ``
    axios.get('http://localhost:8765/newItem')
    .then(res => {
        res.data.forEach(elem => {
            
                     let toDoListLI = `<li class = "item">${elem.item}<i id = "edit" class = "fa fa-pencil" style="font-size:10px" onclick = "editItem(${elem['item_id']})"></i><i class="fa-solid fa-trash-can" id = "button" onclick = "deleteItem(${elem['item_id']})"></i></li>`
                      
                    toDoListList.innerHTML += toDoListLI
                    let itemPriority = null;
                   
                    
                    document.querySelector('#eventTitleInput').value = ''
})
})
}
function crossOffItems(){
    toDoListClass.forEach(item => {
        item.parentNode.style = "text-decoration: line-through;"
    })
}
let toDoListClass = document.querySelectorAll('li')
toDoListClass.forEach(item => {
    item.addEventListener('click', crossOffItems)
})


saveItem.addEventListener('click', () => {
    addToDoListItem()
})

document.querySelector('#todoList').addEventListener('click', getToDoListItems)

let saveButton = document.querySelector('#SaveEditItem')
    //saveButton.addEventListener('click', editItem)

let editToDoListItemInput = document.querySelector('#editToDoListItemInput')
let editRadio = document.getElementsByName('editpriorityList')


function editItem(id){
    
    //conditional, if input is empty, don't send request. if it is then do axios put
    editToDoListModal.style.display = "block"

    
    

    
console.log(`the event id on the front end is ${id}`)
saveButton.addEventListener('click', () => {
    let checkededit
    for(let i = 0; i < editRadio.length; i++){
        if(editRadio[i].checked === true){
            checkededit = editRadio[i]
        }
    }
    console.log(checkededit)
    axios.put(`http://localhost:8765/newItem/${id}`, {
        newitem: editToDoListItemInput.value,
        newpriority: checkededit.value
    }) 
        
   
    .then((res) => {
            editToDoListItemInput.value = ''
            hideEditToDoListModal()
            getToDoListItems()

        })
    .catch(err=>console.log(err))
})

}

function deleteItem(id){
    
    console.log(id)
    console.log(`the event ID on front end is ${id}`)
    axios.delete(`http://localhost:8765/newItem/${id}`)
    
    .then((res) => {
        getToDoListItems()
    .catch(err=>console.log(err))
})
}
let editButton = document.querySelector('#editButton')
let SaveEditItem = document.querySelector('#SaveEditItem')
