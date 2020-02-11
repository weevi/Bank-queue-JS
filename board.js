var namesAndTimes = [];
function filterSpecialistTime() {
    var displayTime = localStorage.getItem("timeStorage");
    var displayNames = localStorage.getItem("customer");
    var retrievedTime = JSON.parse(displayTime);
    var retrievedNames = JSON.parse(displayNames);
    for (var j = 1; j <= 4; j++) {
        if (window.localStorage.length == false) {
            noDataMessage = '<h2>Nepavyko nuskaityti lankytojų duomenų.</h2>';
            document.getElementById("noDataMessage").innerHTML = noDataMessage;
        }

        var timeSum = 0;

        for (var i = 0; i < retrievedTime.length; i++) {
            if (retrievedTime[i].specialist == j) {
                timeSum += parseInt(retrievedTime[i].totalTime);
            }
        }

        var idItem = 0;
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
                    addToAverageTimeStorage(retrievedNames[i].name, newAverage, retrievedNames[i].clientNo);
                    averageToMinutes = secondsToMinutes(newAverage);
                    customer += '<li class="list-group-item">' + retrievedNames[i].name + ' ' + averageToMinutes + '</li>';
                }
                 document.getElementById(j).innerHTML = customer;
            }
           
        }
        customer = "";
    }
}

filterSpecialistTime()
