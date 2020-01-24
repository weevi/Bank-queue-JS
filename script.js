var inputValue = '';
var customers = '';
var selectedSpecialist = '';
var selectClientForDelete = '';
var names = '';
var test = '';
var timeSpent = [];
var average;
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
            customers += '<li class="list-item">' + retrievedNames[i].name + ' ' + retrievedNames[i].clientNo + '</li>';
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
    var smallestClNumber = findSmallest();
    var time = getCurrentTime();
    var removeClient = retrievedNames.map(function (person) { return person.clientNo }).indexOf(smallestClNumber);
    var initialTime = findInitialTime();
    retrievedNames.splice(removeClient, 1);
    initialTime = new Date(initialTime);
    var nowTimeStamp = new Date();
    var startTime = (new Date(initialTime)).getTime();
    var deleteTimeStamp = nowTimeStamp.getTime();
    var microSecondsDiff = Math.abs(deleteTimeStamp - startTime);
    var timeDiff = Math.floor(microSecondsDiff / 1000);
    console.log(timeDiff);
    addToTimeStorage(timeDiff);
    localStorage.setItem("customer", JSON.stringify(retrievedNames));
    filterCustomers()
};

// function convertToMinutes(seconds) {
//     return Math.floor(seconds / 60) + ":" + (seconds % 60 ? seconds % 60 : '00');
// }


function showClientsOnBoard() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    for (var j = 1; j <= 4; j++) {
        for (var i = 0; i < retrievedNames.length; i++) {
            if (retrievedNames[i].specialistNo == j) {
               
                customers += '<li class="list-item">' + retrievedNames[i].name + average + '</li>';
            }
            document.getElementById(j).innerHTML = customers;
        }
    
        customers = "";
    }
}

function filterSpecialistTime() {
    var displayTime = localStorage.getItem("timeStorage");
    var displayNames = localStorage.getItem("customer");
    var retrievedTime = JSON.parse(displayTime);
    var retrievedNames = JSON.parse(displayNames);
    for (var j = 1; j <= 4; j++) {
        var timeSum = 0;
        for (var i = 0; i < retrievedTime.length; i++) {
            if (retrievedTime[i].specialist == j) {
                // console.log('spec ' + j + ': ' + retrievedTime[i].totalTime);
                timeSum += parseInt(retrievedTime[i].totalTime);
            }
        }
        var id = j;
        var count = retrievedTime.filter((obj) => obj.specialist == id).length;
        average = timeSum / count;
        console.log('average: ' + average);  
        for (var i = 0; i < retrievedNames.length; i++) {
            if (retrievedNames[i].specialistNo == j) {
               
                customers += '<li class="list-item">' + retrievedNames[i].name + average + '</li>';
            }
            document.getElementById(j).innerHTML = customers;
        }
    
        customers = "";      
    }
}

filterSpecialistTime()

