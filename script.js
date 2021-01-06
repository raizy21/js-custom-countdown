/***************
 *  Links
 * {@link} - https://pixabay.com/videos/
 * {@link} - https://www.youcompress.com/
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
 * {@link} - https://www.w3schools.com/jsref/jsref_obj_date.asp
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 * {@link} - https://www.w3schools.com/jsref/jsref_split.asp
 * {@link} - https://www.w3schools.com/js/js_timing.asp
 * {@link} - https://www.w3schools.com/jsref/event_preventdefault.asp
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 *
 ********************/

const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEL = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button')



let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;



const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//set date input min with today's date

const today = new Date().toISOString().split('T')[0];
//console.log(today);
dateEl.setAttribute('min', today);


//populate countdown/ complete ui
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        //console.log('distance: ', distance);

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        //console.log(days, hours, minutes, seconds);

        //hide input
        inputContainer.hidden = true;

        //if the countdown has ended, show final state
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;

        } else {
            //else show the countdown in progress

            //populate countdown
            countdownElTitle.textConten = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;

            //show countdown
            countdownEl.hidden = false;
        }

    }, second);
}

//take values from form-input
function updateCountdown(e) {
    e.preventDefault();
    //console.log(e);

    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // console.log(countdownTitle, countdownDate);


    // set title and date, save to local storage
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // console.log(saveCountdown);

    //check for valid date
    if (countdownDate === '') {
        alert('please select a date for the countdown');
    } else {
        //get number version of current date, update dom
        countdownValue = new Date(countdownDate).getTime();
        //console.log('countdown value:',countdownValue );

        updateDOM();
    }

}

//reset all values
function reset() {
    //hide countdown, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    //stop the interval
    clearInterval(countdownActive);

    //reset values, remove local storage item
    countdownTitle = '';
    countdownDate = '';

    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    //get countdown from local storage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//on load, check local storage
restorePreviousCountdown();
