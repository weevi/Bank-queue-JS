let namesAndTimes = [];

filterSpecialistTime = () => {
    let displayTime = localStorage.getItem("timeStorage");
    let retrievedTime = JSON.parse(displayTime);
    for (let j = 1; j <= 4; j++) {
        showNoDataMsg()
        let timeSum = 0;
        for (var i = 0; i < retrievedTime.length; i++) {
            if (retrievedTime[i].specialist == j) {
                timeSum += parseInt(retrievedTime[i].totalTime);
            }
        }
        let id = j;
        let count = retrievedTime.filter((obj) => obj.specialist == id).length;
        average = Math.floor(timeSum / count);
        let clientCount = 0;
        displayCustomers(average, clientCount, j)
        customer = "";
    }
}

showNoDataMsg = () => {
    if (window.localStorage.length == false) {
        noDataMessage = '<h2>Pradžios puslapyje paspauskite "Įkelti duomenis į LocalStorage"</h2>';
        document.getElementById("noDataMessage").innerHTML = noDataMessage;
        let divsToHide = document.getElementsByClassName("title-wrap");
        for (let i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.visibility = "hidden";
        }
    }
}

displayCustomers = (average, clientCount, j) => {
    let displayNames = localStorage.getItem("customer");
    let retrievedNames = JSON.parse(displayNames);
    for (let i = 0; i < retrievedNames.length; i++) {
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

secondsToMinutes = seconds => {
    var minutes = "0" + Math.floor(seconds / 60);
    var seconds = "0" + (seconds - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}


filterSpecialistTime()