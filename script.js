
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


const nextDays = 7-lastDayIndex -1

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month = date.getMonth();

let currentMonth = months[month]
console.log(currentMonth);

let days = "";

document.querySelector('.date h2').innerHTML = months[date.getMonth()];
document.querySelector('.date p').innerHTML = new Date().toDateString();


for(let x = firstDayIndex +1; x>0; x--){
    days += `<div class = prev-date>${prevLastDay - x + 1 } </div>`
}

for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class = "today">${i}</div>`
    } else{
    days+= `<div>${i}</div>`
  
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
  
  renderCalendar();


