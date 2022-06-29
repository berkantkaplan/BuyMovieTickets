const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movie = document.getElementById('movies');
const seats = document.querySelectorAll('.seat:not(.reserved-movie1 .reserved-movie2 .reserved-movie3)');
const selectedSeats = document.querySelectorAll('.seat.selected')
const reservedMovieFirst = document.querySelectorAll('.reserved-movie1')
const reservedMovieSecond = document.querySelectorAll('.reserved-movie2')
const reservedMovieThird = document.querySelectorAll('.reserved-movie3')

console.log(reservedMovieFirst)
getFromLocalStorage();
calculateCost();
changeStyleMovieFirst();

function changeStyleMovieFirst() {
    for (i = 0; i < reservedMovieFirst.length; i++) {
        reservedMovieFirst[i].classList.add('reserved-movie1')
    }
    for (i = 0; i < reservedMovieSecond.length; i++) {
        reservedMovieSecond[i].classList.remove('reserved-movie2')
    }
    for (i = 0; i < reservedMovieThird.length; i++) {
        reservedMovieThird[i].classList.remove('reserved-movie3')
    }
}

function changeStyleMovieSecond() {
    for (i = 0; i < reservedMovieFirst.length; i++) {
        reservedMovieFirst[i].classList.remove('reserved-movie1')
    }
    for (i = 0; i < reservedMovieSecond.length; i++) {
        reservedMovieSecond[i].classList.add('reserved-movie2')
    }
    for (i = 0; i < reservedMovieThird.length; i++) {
        reservedMovieThird[i].classList.remove('reserved-movie3')
    }
}

function changeStyleMovieThird() {
    for (i = 0; i < reservedMovieFirst.length; i++) {
        reservedMovieFirst[i].classList.remove('reserved-movie1')
    }
    for (i = 0; i < reservedMovieSecond.length; i++) {
        reservedMovieSecond[i].classList.remove('reserved-movie2')
    }
    for (i = 0; i < reservedMovieThird.length; i++) {
        reservedMovieThird[i].classList.add('reserved-movie3')
    }
}

function clearSelectedSeats() {
    for (i = 0; i < seats.length; i++) {
        if (seats[i].classList.contains('selected')) {
            seats[i].classList.remove('selected')
        }
    }
}


container.addEventListener('click', function (item) {
    if (item.target.classList.contains('seat') && !item.target.classList.contains('reserved-movie1') && !item.target.classList.contains('reserved-movie2') && !item.target.classList.contains('reserved-movie3')) {
        item.target.classList.toggle('selected')

        calculateCost()
    }
})

movie.addEventListener('change', function (item) {

    if (movie.value == 30) {
        changeStyleMovieFirst();

    } else if (movie.value == 35) {
        changeStyleMovieSecond();

    } else {
        changeStyleMovieThird()
    }

    clearSelectedSeats()
    calculateCost()

})


function calculateCost() {
    const selectedSeats = container.querySelectorAll('.seat.selected')
    let selectedSeatCount = selectedSeats.length;
    let ticketCost = movie.value;
    let totalCost = selectedSeatCount * ticketCost;

    count.innerText = selectedSeatCount;
    amount.innerText = totalCost;

    let selectedSeatsArr = [];
    let seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat)
    })

    seats.forEach(function (seat) {
        seatsArr.push(seat)
    })

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', movie.selectedIndex);
}

/* Spread Operator dont work correctly.
function getSelectedSeats(seat) {
    selectedSeatsArr.push(seat);
    console.log(selectedSeatsArr)
}

function getAllSeats(seat) {
    seatsArr.push(seat);
    console.log(seatsArr)
}

getSelectedSeats(...selectedSeats);
getAllSeats(...seats);
*/

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }



    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        movie.selectedIndex = selectedMovieIndex;
    }
}
