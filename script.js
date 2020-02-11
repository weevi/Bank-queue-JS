var inputValue = '';
var customers = '';
var customer = '';
var selectedSpecialist = '';
var selectClientForDelete = '';
var names = '';
var test = '';
var timeSpent = [];
var averageTimeSpent = [];
var average;
var specificAverage = '';
var clientName = '';
var clients = [{
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
    for (var i = 0; i < clients.length; i++) {
        var time = getCurrentTime();
        clients[i].startTime = time;
    }
}

function loadData() {
    if (window.localStorage.length == false) {
        setInitialTime();
        localStorage.setItem("customer", JSON.stringify(clients));
        localStorage.setItem("timeStorage", JSON.stringify(timeSpent));
        localStorage.setItem("AverageTimeStorage", JSON.stringify(averageTimeSpent));
    }
}

function generateNewClientNo() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    var largest = 0;
    for (var i = 0; i < retrievedNames.length; i++) {
        if (selectedSpecialist == retrievedNames[i].specialistNo) {
            if (retrievedNames[i].clientNo > largest)
                largest = retrievedNames[i].clientNo;
        }
    }
    return largest = largest + 1;
}

function getCurrentTime() {
    var startTime = new Date()
    return startTime;
}

function saveInputValue() {
    var displayNames = JSON.parse(localStorage.getItem("customer"));
    var newClientNo = generateNewClientNo();
    var time = getCurrentTime();
    if (displayNames == null) {
        displayNames = [];
    }
    inputValue = document.getElementById('myInput').value;
    var newCustomer = { "specialistNo": Number(selectedSpecialist), "name": inputValue, "clientNo": newClientNo, "startTime": time };
    displayNames.push(newCustomer);
    localStorage.setItem("customer", JSON.stringify(displayNames));
    alert('Uzregistruota sekmingai!');
};

function setSpecialist() {
    selectedSpecialist = document.getElementById('selectedSpecialist').value;
}

function filterCustomers() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    var specialistsSelect = document.getElementById('specSelect').value;
    for (var i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == specialistsSelect) {
            customers += '<li class="list-group-item">' + retrievedNames[i].name + ' ' + retrievedNames[i].clientNo + '</li>';
        }
        document.getElementById("clientsList").innerHTML = customers;
    }
    customers = "";
}

function findSmallest() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    var specialistsSelect = document.getElementById('specSelect').value;
    for (var i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == specialistsSelect) {
            return retrievedNames[i].clientNo;
        }
    }
}

function findInitialTime() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    var specialistSelect = document.getElementById('specSelect').value;
    for (var i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == specialistSelect) {
            return retrievedNames[i].startTime;
        }
    }
}

function addToTimeStorage(totalSeconds) {
    var displayTime = localStorage.getItem("timeStorage");
    var retrievedTime = JSON.parse(displayTime);
    var specialistSelect = document.getElementById('specSelect').value;
    var totalTime = { "specialist": Number(specialistSelect), "totalTime": Number(totalSeconds) }
    retrievedTime.push(totalTime);
    localStorage.setItem("timeStorage", JSON.stringify(retrievedTime));
}
var retrievedAverageTime = [];
function addToAverageTimeStorage(name, allAverages, number) {
    // var displayAverageTime = localStorage.getItem("AverageTimeStorage");
    // var retrievedAverageTime = JSON.parse(displayAverageTime);
    var allAverageTimes = { "name": name, "average": allAverages, "number": Number(number) }
    retrievedAverageTime.push(allAverageTimes);
    localStorage.setItem("AverageTimeStorage", JSON.stringify(retrievedAverageTime));
}


function deleteFirst() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    var time = getCurrentTime();
    var removeClient = retrievedNames.map(function (person) { return person.clientNo }).indexOf(findSmallest());
    var initialTime = findInitialTime();
    retrievedNames.splice(removeClient, 1);
    initialTime = new Date(initialTime);
    var nowTimeStamp = new Date();
    var startTime = (new Date(initialTime)).getTime();
    var deleteTimeStamp = nowTimeStamp.getTime();
    var microSecondsDiff = Math.abs(deleteTimeStamp - startTime);
    var timeDiff = Math.floor(microSecondsDiff / 1000);
    addToTimeStorage(timeDiff);
    localStorage.setItem("customer", JSON.stringify(retrievedNames));
    filterCustomers()
};

function getClientInfo() {
    var displayAverageTimes = localStorage.getItem("AverageTimeStorage");
    var retrievedAverageTimes = JSON.parse(displayAverageTimes);
    window.customerInput = document.getElementById('customerNumber').value;
    for (var i = 0; i < retrievedAverageTimes.length; i++) {
        if (retrievedAverageTimes[i].number == customerInput) {

            var customerName = retrievedAverageTimes[i].name;
            var initialSecs = retrievedAverageTimes[i].average;
            var currentSecs = initialSecs;

            setTimeout(decrement, 1000);

            function decrement() {
                var displayedSecs = currentSecs % 60;
                var displayedMin = Math.floor(currentSecs / 60) % 60;

                if (displayedMin <= 9) displayedMin = "0" + displayedMin;
                if (displayedSecs <= 9) displayedSecs = "0" + displayedSecs;
                currentSecs--;
                document.getElementById("timerText").innerHTML = 'Sveiki, ' + customerName + '. Jums liko laukti: ' + displayedMin + ":" + displayedSecs;
                if (currentSecs !== -1) setTimeout(decrement, 1000);
            }
        } else if (retrievedAverageTimes[i].number !== customerInput) {
            setTimeout(function () {
                var wrongNumber = 'Prašome patikslinti numerį.';
                document.getElementById('timerText').innerHTML = wrongNumber;
            }, 2000);
        }
    }
}

function secondsToMinutes(seconds) {
    var minutes = "0" + Math.floor(seconds / 60);
    var seconds = "0" + (seconds - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}
