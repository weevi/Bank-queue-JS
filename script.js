var inputValue = '';
var customers = '';
var selectedSpecialist = '';
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
]

function loadData() {
    localStorage.setItem("customer", JSON.stringify(clients));
}

function saveInputValue() {
    inputValue = document.getElementById('myInput').value;
    var newCustomer = { "specialistNo": Number(selectedSpecialist), "name": inputValue };
    clients.push(newCustomer);
    localStorage.setItem("customer", JSON.stringify(clients));
};

function setSpecialist() {
    selectedSpecialist = document.getElementById('selectedSpecialist').value;
    console.log(selectedSpecialist);
}



function showClients() {
    var displayNames = localStorage.getItem("customer");
    var retrievedNames = JSON.parse(displayNames)

    for (var i = 0; i < retrievedNames.length; i++) {
        customers += '<li class="list-item">' + retrievedNames[i].name + '</li>';
    }
    document.getElementById("clientsList").innerHTML = customers;
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
        if (retrievedNames[i].specialistNo == specialistsSelect)  {
            customers += '<li class="list-item">' + retrievedNames[i].name + '</li>';
        }
        document.getElementById("clientsList").innerHTML = customers;
   }
   customers = "";
}
