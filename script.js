var inputValue = '';
var customers = '';
var customer ='';
var selectedSpecialist = '';
var selectClientForDelete = '';
var names = '';
var test = '';
var timeSpent = [];
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

var namesAndTimes = [];
function filterSpecialistTime() {
    var displayTime = localStorage.getItem("timeStorage");
    var displayNames = localStorage.getItem("customer");
    var retrievedTime = JSON.parse(displayTime);
    var retrievedNames = JSON.parse(displayNames);
    for (var j = 1; j <= 4; j++) {
        if (window.localStorage.length == false) {
            noDataMessage = '<h2>Nepavyko nuskaityti lankytojų duomenų.</h2>';
            document.getElementById(j).innerHTML = noDataMessage;
        }

        var timeSum = 0;

        for (var i = 0; i < retrievedTime.length; i++) {
            if (retrievedTime[i].specialist == j) {
                timeSum += parseInt(retrievedTime[i].totalTime);
            }
        }

        var id = j;
        var count = retrievedTime.filter((obj) => obj.specialist == id).length;
        average = timeSum / count;

        var clientCount = 0;
        for (var i = 0; i < retrievedNames.length; i++) {
            if (retrievedNames[i].specialistNo == j) {
                clientCount++;
                var newAverage = average * (clientCount);
                if (newAverage != newAverage) {
                    customer += '<li class="list-group-item">' + retrievedNames[i].name + '</li>';
                    namesAndTimes.push({ name: retrievedNames[i].name });
                } else {
                    newAverage = secondsToMinutes(newAverage);
                    customer += '<li class="list-group-item">' + retrievedNames[i].name + ' ' + newAverage + '</li>';
                    namesAndTimes.push({ name: retrievedNames[i].name, time: newAverage, number: retrievedNames[i].clientNo });
                }
                // document.getElementById(j).innerHTML = customer;
            }
        }
        customer = "";
    }
}
filterSpecialistTime();


function getClientInfo() {
    window.customerInput = document.getElementById('customerNumber').value;
    for (var i = 0; i < namesAndTimes.length; i++) {
       if (namesAndTimes[i].number == customerInput) {
            var specificTime = 'Sveiki, ' + namesAndTimes[i].name + '. Jums liko laukti: ' + namesAndTimes[i].time;
            document.getElementById('nameSurname').innerHTML = specificTime;
        } else if (namesAndTimes[i].number != customerInput) {
            var wrongNumber = 'Prašome patikslinti numerį.';
            document.getElementById('nameSurname').innerHTML = wrongNumber;
        }
    }
}


function secondsToMinutes(seconds) {
    var minutes = "0" + Math.floor(seconds / 60);
    var seconds = "0" + (seconds - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}
