// Carlos Sabbah - March 19th 2022 - Active Day Tracker

// -------- ------- ---- --- - For the currentDay element, insert the current Date and time
$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm a'));

// -------- ------- ---- --- - Create the global variable to hold the current time
var now = moment().format('ha'); // Format = 1pm, 10pm, etc.

// -------- ------- ---- --- - Style the parent node ('description') according to the hour element value
var updateUi = () => {
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
};

// Part 1 -------- ------- ---- --- - Upon clicking on a p element, change it to Textarea so user can update tasks
$('.row').on('click', 'p', function () {
  // Extract the current active class of the description element
  var myClass = this.className.split(' ')[4];
  // Extract the current value from the description
  var currentText = $(this).text();

  // Create the element and add the necessary classes (so we can keep the same styling in edit mode)
  // Additionally, we add the current class (i.e. past, so we can use it when we recreate the element)
  var textInput = $('<textarea>')
    .addClass(`description col-lg-10 col-sm-8 d-flex ${myClass} editInProgress`)
    .val(currentText);
  // Then replace the current element (p) to that textarea element we created above
  $(this).replaceWith(textInput);

  textInput.trigger('focus'); // Focus on the textarea field
});

// Part 2 -------- Upon clicking away (during editing), recreate the previous element with the recent class
$('.row').on('blur', 'textarea', function () {
  // Extract the text the user inputted during editing
  var currentEditedText = $(this).val().trim();
  // Since we added the styling in the above block, re-acquire this class so it returns to normal state
  var currentClass = this.className.split(' ')[4];
  // Re-create the P element with the appropriate classes and include the text the user added/updated
  var taskP = $('<p>')
    .addClass(`description col-lg-10 col-sm-8 d-flex ${currentClass}`)
    .text(currentEditedText);
  // Then replace the textarea element with the new p element we generated above

  $(this).replaceWith(taskP);
});

// -------- ------- ---- --- - On application load, execute condition upfront and update styling to match time
$(document).ready(function () {
  updateUi();
});

// -------- ------- ---- --- - Refresh the window every 30 seconds and re-execute styling condition
setInterval(() => {
  location.reload();
  // ADD CODE - Add a function here to save everything locally just in case you forgot to save
}, 1000 * 30); // 1000 * 30 = 30 seconds
