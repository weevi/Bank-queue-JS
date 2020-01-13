var inputValue = '';
var customers = '';
var selectedSpecialist = '';
var selectClientForDelete = '';
var names = '';
var test = '';
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
    if(window.localStorage.length == false){
    setInitialTime();
    localStorage.setItem("customer", JSON.stringify(clients));
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
    var hour = new Date().getHours();
    var minutes = ('0' + new Date().getMinutes()).slice(-2);
    var seconds = ('0' + new Date().getSeconds()).slice(-2);
    var startTime = hour + ':' + minutes + ':' + seconds;
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

function showClientsOnBoard() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    for (var j = 1; j <= 4; j++) {
        for (var i = 0; i < retrievedNames.length; i++) {
            if (retrievedNames[i].specialistNo == j) {
                customers += '<li class="list-item">' + retrievedNames[i].name + '</li>';
            }
            document.getElementById(j).innerHTML = customers;
        }
        customers = "";//???????????
    }
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

function deleteFirst() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    var specialistsSelect = document.getElementById('specSelect').value;
    var smallestClNumber = findSmallest();
    var removeClient = retrievedNames.map(function (person) { return person.clientNo }).indexOf(smallestClNumber);
    retrievedNames.splice(removeClient, 1);
    localStorage.setItem("customer", JSON.stringify(retrievedNames));
    console.log(smallestClNumber);
    console.log("from deleteFirst function");
    filterCustomers()
};



