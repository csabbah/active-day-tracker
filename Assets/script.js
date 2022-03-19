// Carlos Sabbah - March 19th 2022 - Active Day Tracker

$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm a'));
// Create a variable to hold the current time
var now = moment().format('ha'); // 1pm

// Iterate through all hours....
var updateUi = () => {
  $('.hour').each(function () {
    // Extract the time element value
    hour = $(this).text().toLowerCase();

    // Referring to the current hour element, extract the description element
    description = $(this.parentNode).find('.description');

    // Declare specific variables to track current hour element and time
    var hourEl = moment(hour, 'ha');
    var currentHour = moment(now, 'ha');

    // Execute condition based on the timing and and add the appropriate classes
    if (hour == now) {
      // If hour is the current hour add class of 'present'
      description.addClass('present');
    } else if (hourEl.isBefore(currentHour)) {
      // If the hour is before, add class of 'past'
      description.addClass('past');
    } else {
      // otherwise, add class of 'future'
      description.addClass('future');
    }
  });
};

$('.description').click(function () {});

// On application load, execute the condition upfront and update styling accordingly
$(document).ready(function () {
  updateUi();
});

// Then every minute, refresh the window and re-execute the above function to
// ensure the styling matches with the current time
setInterval(() => {
  location.reload();
  // ADD CODE - Add a function here to save everything locally just in case you forgot to save
}, 1000 * 60); // 1000 * 60 = 60 seconds
