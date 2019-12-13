var inputValue = '';
var customers = '';
var selectedSpecialist = '';
var selectSpecialistForDelete = '';
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

function loadData() {
    localStorage.setItem("customer", JSON.stringify(clients));
}

function saveInputValue() {
    var newClientNo = generateNewClientNo();
    inputValue = document.getElementById('myInput').value;
    var newCustomer = { "specialistNo": Number(selectedSpecialist), "name": inputValue, "clientNo": newClientNo };
    clients.push(newCustomer);
    localStorage.setItem("customer", JSON.stringify(clients));
};

function setSpecialist() {
    selectedSpecialist = document.getElementById('selectedSpecialist').value;
    console.log("setspec - " + selectedSpecialist);
}

function showClientsOnBoard() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    for (var j = 1; j <= 4; j++) {
        for (var i = 0; i < retrievedNames.length; i++) {
            if (retrievedNames[i].specialistNo == j) {
                customers += '<li class="list-item">' + retrievedNames[i].name + ' ' + retrievedNames[i].clientNo + '</li>';
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

function deleteFirst() {
    selectSpecialistForDelete = document.getElementById('specSelect').value;
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames);
    for (var i = 0; i < retrievedNames.length; i++) {
        if (selectSpecialistForDelete == retrievedNames[i].specialistNo) {
            
        }
    }
}

