var inputValue = '';
var customers = '';
var clients = ['Donny Joe', 'Sally Muller', 'John Duran', 'Katy Spears'];

function loadData() {
    localStorage.setItem("name", JSON.stringify(clients));
}


function saveInputValue() {
    inputValue = document.getElementById('myInput').value;
    clients.push(inputValue);
    localStorage.setItem("name", JSON.stringify(clients));
};

function showClients() {
    var displayNames = localStorage.getItem("name");
    var retrievedNames = JSON.parse(displayNames)

    for (var i = 0; i < retrievedNames.length; i++) {
        customers += '<li class="list-item">' + retrievedNames[i] + '</li>';
    }
    document.getElementById("clientsList").innerHTML = customers;
}

function deleteFirstChild() {
    var displayNames = localStorage.getItem("name");
    var retrievedNames = JSON.parse(displayNames)
    retrievedNames.splice(0, 1);
    localStorage.setItem("name", JSON.stringify(retrievedNames));
    window.location.reload(); 
}