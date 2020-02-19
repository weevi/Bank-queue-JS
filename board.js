var displayTime = localStorage.getItem("timeStorage");
var displayNames = localStorage.getItem("customer");
var retrievedTime = JSON.parse(displayTime);
var retrievedNames = JSON.parse(displayNames);
var namesAndTimes = [];

function filterSpecialistTime() {
    for (let j = 1; j <= 4; j++) {
        showNoDataMsg()
        let timeSum = 0;
        for (var i = 0; i < retrievedTime.length; i++) {
            if (retrievedTime[i].specialist == j) {
                timeSum += parseInt(retrievedTime[i].totalTime);
            }
        }
        let id = j;
        var count = retrievedTime.filter((obj) => obj.specialist == id).length;
        average = Math.floor(timeSum / count);
        var clientCount = 0;
        displayCustomers(average, clientCount, j)
        customer = "";
    }
}

function showNoDataMsg() {
    if (window.localStorage.length == false) {
        noDataMessage = '<h2>Nepavyko nuskaityti lankytojų duomenų.</h2>';
        document.getElementById("noDataMessage").innerHTML = noDataMessage;
        let divsToHide = document.getElementsByClassName("title-wrap");
        for (var i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.visibility = "hidden";
        }
    }
}

function displayCustomers(average, clientCount, j){
    for (var i = 0; i < retrievedNames.length; i++) {
        if (retrievedNames[i].specialistNo == j) {
            clientCount++;
            var newAverage = average * (clientCount);
            if (newAverage != newAverage) {
                customer += '<li class="list-group-item">' + retrievedNames[i].name + '</li>';
                namesAndTimes.push({ name: retrievedNames[i].name });
            } else {
                addToAverageTimeStorage(retrievedNames[i].name, newAverage, retrievedNames[i].clientNo);
                averageToMinutes = secondsToMinutes(newAverage);
                customer += '<li class="list-group-item">' + retrievedNames[i].name + ' ' + averageToMinutes + '</li>';
            }
            document.getElementById(j).innerHTML = customer;
        }
    }
}

function secondsToMinutes(seconds) {
    var minutes = "0" + Math.floor(seconds / 60);
    var seconds = "0" + (seconds - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}


filterSpecialistTime()