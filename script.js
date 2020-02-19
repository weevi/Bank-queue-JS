let inputValue = '';
let customers = '';
let customer = '';
let selectedSpecialist = '';
let timeSpent = [];
let averageTimeSpent = [];
let average;

const clients = [{
    specialistNo: 1,
    name: 'Donny Joe',
    clientNo: 1001
},
{
    specialistNo: 2,
    name: 'Sally Muller',
    clientNo: 2001
},
{
    specialistNo: 3,
    name: 'John Duran',
    clientNo: 3001
},
{
    specialistNo: 4,
    name: 'Katy Spears',
    clientNo: 4001
},
{
    specialistNo: 1,
    name: 'Samanta Stukt',
    clientNo: 1002
},
{
    specialistNo: 2,
    name: 'Ross Macdey',
    clientNo: 2002
},
{
    specialistNo: 3,
    name: 'Laurent Michel',
    clientNo: 3002
},
{
    specialistNo: 4,
    name: 'Tierry Durpal',
    clientNo: 4002
}
]

function setInitialTime() {
    for (let i = 0; i < clients.length; i++) {
        let time = getCurrentTime();
        clients[i].startTime = time;
    }
}

loadDataToLocalSt = () => {
    if (window.localStorage.length == false) {
        setInitialTime();
        localStorage.setItem("customer", JSON.stringify(clients));
        localStorage.setItem("timeStorage", JSON.stringify(timeSpent));
        localStorage.setItem("AverageTimeStorage", JSON.stringify(averageTimeSpent));
    }
}

generateNewClientNo = () => {
    let displayNames = localStorage.getItem("customer");
    let retrievedNames = JSON.parse(displayNames);
    let largest = 0;
    for (let i = 0; i < retrievedNames.length; i++) {
        if (selectedSpecialist == retrievedNames[i].specialistNo) {
            if (retrievedNames[i].clientNo > largest)
                largest = retrievedNames[i].clientNo;
        }
    }
    return largest = largest + 1;
}

getCurrentTime = () => {
    let startTime = new Date()
    return startTime;
}

saveInputValue = () => {
    let displayNames = JSON.parse(localStorage.getItem("customer"));
    let newClientNo = generateNewClientNo();
    let time = getCurrentTime();
    if (displayNames == null) {
        displayNames = [];
    }
    inputValue = document.getElementById('myInput').value;
    let newCustomer = { "specialistNo": Number(selectedSpecialist), "name": inputValue, "clientNo": newClientNo, "startTime": time };
    displayNames.push(newCustomer);
    localStorage.setItem("customer", JSON.stringify(displayNames));
    alert('Uzregistruota sekmingai!');
    window.location.reload()
};

setSpecialist = () => {
    selectedSpecialist = document.getElementById('selectedSpecialist').value;
}

filterCustomers = () => {
    let displayNames = localStorage.getItem("customer");
    let retrievedNames = JSON.parse(displayNames);
    let specialistsSelect = document.getElementById('specSelect').value;
    for (let i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == specialistsSelect) {
            customers += '<li class="list-group-item">' + retrievedNames[i].name + ' ' + retrievedNames[i].clientNo + '</li>';
        }
        document.getElementById("clientsList").innerHTML = customers;
    }
    customers = "";
}

findSmallest = () => {
    let displayNames = localStorage.getItem("customer");
    let retrievedNames = JSON.parse(displayNames);
    let specialistsSelect = document.getElementById('specSelect').value;
    for (let i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == specialistsSelect) {
            return retrievedNames[i].clientNo;
        }
    }
}

findInitialTime = () => {
    let displayNames = localStorage.getItem("customer");
    let retrievedNames = JSON.parse(displayNames);
    let specialistSelect = document.getElementById('specSelect').value;
    for (let i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == specialistSelect) {
            return retrievedNames[i].startTime;
        }
    }
}

addToTimeStorage = totalSeconds => {
    let displayTime = localStorage.getItem("timeStorage");
    let retrievedTime = JSON.parse(displayTime);
    let specialistSelect = document.getElementById('specSelect').value;
    let totalTime = { "specialist": Number(specialistSelect), "totalTime": Number(totalSeconds) }
    retrievedTime.push(totalTime);
    localStorage.setItem("timeStorage", JSON.stringify(retrievedTime));
}
let retrievedAverageTime = [];
function addToAverageTimeStorage(name, allAverages, number) {
    let allAverageTimes = { "name": name, "average": allAverages, "number": Number(number) }
    retrievedAverageTime.push(allAverageTimes);
    localStorage.setItem("AverageTimeStorage", JSON.stringify(retrievedAverageTime));
}

deleteFirst = () => {
    let displayNames = localStorage.getItem("customer");
    let retrievedNames = JSON.parse(displayNames);
    let removeClient = retrievedNames.map(function (person) { return person.clientNo }).indexOf(findSmallest());
    let initialTime = findInitialTime();
    retrievedNames.splice(removeClient, 1);
    initialTime = new Date(initialTime);
    let nowTimeStamp = new Date();
    let startTime = (new Date(initialTime)).getTime();
    let deleteTimeStamp = nowTimeStamp.getTime();
    let microSecondsDiff = Math.abs(deleteTimeStamp - startTime);
    let timeDiff = Math.floor(microSecondsDiff / 1000);
    addToTimeStorage(timeDiff);
    localStorage.setItem("customer", JSON.stringify(retrievedNames));
    filterCustomers()
};

getSpecificClientInfo = () => {
    let displayAverageTimes = localStorage.getItem("AverageTimeStorage");
    let retrievedAverageTimes = JSON.parse(displayAverageTimes);
    window.customerInput = document.getElementById('customerNumber').value;
    for (i = 0; i < retrievedAverageTimes.length; i++) {
        if (retrievedAverageTimes[i].number == customerInput) {

            customerName = retrievedAverageTimes[i].name;
            initialSecs = retrievedAverageTimes[i].average;
            currentSecs = initialSecs;

            setTimeout(decrement, 1000);

            function decrement() {
                displayedSecs = currentSecs % 60;
                displayedMin = Math.floor(currentSecs / 60) % 60;

                if (displayedMin <= 9) displayedMin = "0" + displayedMin;
                if (displayedSecs <= 9) displayedSecs = "0" + displayedSecs;
                currentSecs--;
                document.getElementById("timerText").innerHTML = 'Sveiki, ' + customerName + '. Jums liko laukti: ' + displayedMin + ":" + displayedSecs;
                if (currentSecs !== -1) setTimeout(decrement, 1000);
            }
        } else if (retrievedAverageTimes[i].number !== customerInput) {
            setTimeout(() => {
                wrongNumber = 'Prašome patikslinti numerį.';
                document.getElementById('timerText').innerHTML = wrongNumber;
            }, 2000);
        }
    }
}