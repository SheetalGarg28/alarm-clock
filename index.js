// This line selects an HTML element with the ID 'clock', this element is where the current time will be displayed.
const clock = document.getElementById('clock');

// Clock Update Interval: This code sets up a timer that updates the clock display every (1 second). 
setInterval(function(){
    let date = new Date();
     // Extract current hour, minute, second, and period (AM/PM)

    //  Current Time Displa With the help of date.toLocaleTimeString() function
    clock.innerHTML = date.toLocaleTimeString();
    
    // Extract current hour, minute, second, and period (AM/PM)
    let hou = date.getHours();
    let min = date.getMinutes();
    let alarmCount = 0;
    let sec = date.getSeconds();
    let pe = hou >= 12 ? 'PM' : 'AM';
    hou = (hou % 12 || 12).toString().padStart(2, '0'); // Zero-pad the hour
    min = min.toString().padStart(2, '0'); // Zero-pad the minute
    sec = sec.toString().padStart(2, '0'); // Zero-pad the second

// for condition checking everytime if alarmListArr is equals to the currect time or not
    for (let i = 0; i < alarmListArr.length; i++) {
        if (alarmListArr[i] == `${hou}:${min}:${sec} ${pe}`) {
            console.log("Alarm ringing...");
            showAlert(`Alarm ${i+1} time has come! It's Ringing`);
        }
    }
}, 1000);

// show alert message function This function displays an alert message with the given text.
function showAlert(message) {
    alert(message);
}

// assigning the variables: Several variables are initialized to manage alarms and select elements from the HTML document.
let alarmTime;
let alarmCount = 0;
let alarmListArr = [];
const selectMenu =  document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");


// set alarm section: Three loops create dropdown menus for selecting hours, minutes, and AM/PM options. These menus are inserted into the corresponding HTML elements.
// it's for hours
for(let i=12; i>0; i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
// it's for minutes
for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
// it's for time zone
for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
// add alarm function section it's called when setAlarm button is clicked its then validate currect time and then add it to the alarmlist 
function setAlarm(){
    document.querySelector("#alarm-row3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
        <span id="span${alarmCount}">${time}</span>
        <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }
}
    // function invoking via click using event listener
    setAlarmBtn.addEventListener("click",setAlarm);

// delete alarm function called when delete bbutton is clicked and it remove the alarm from the alarm list
    function deleteAlarm(click_id){
        var element = document.getElementById("alarm"+click_id);
        var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
        alarmListArr.splice(deleteIndex,1);
        element.remove();
    }
