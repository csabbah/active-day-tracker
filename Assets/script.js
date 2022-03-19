// Use setInerval to check the time and update styling accordingly
// setInterval(() => {
//   rowHour = $('h5').text();
//   console.log(rowHour);
// }, 5000);

// Create a variable to hold the current time (just the hour number)
var now = moment().format('ha'); // 1pm

// Iterate through all hours....
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
