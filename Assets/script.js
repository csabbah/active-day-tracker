// Carlos Sabbah - March 19th 2022 - Active Day Tracker

// -------- ------- ---- --- - Declare a global object with all stored data or create an empty object to use this session
var localDesc = localStorage.getItem('desc');
// If the local storage doesn't exist....
if (localDesc == null) {
  // For this session declare an empty object
  var descArr = [
    { id: 0, text: '' },
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
    { id: 5, text: '' },
    { id: 6, text: '' },
    { id: 7, text: '' },
    { id: 8, text: '' },
  ];
  // Otherwise if local storage does exist...
} else {
  // Parse the local data and update the above empty object with the data from local
  localDesc = JSON.parse(localDesc);
  descArr = localDesc;
}

// -------- ------- ---- --- - For the currentDay element, insert the current Date and time
$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm a'));

// -------- ------- ---- --- - Style the parent node ('description') according to the hour element value
var updateUi = () => {
  // Declare the variable to hold the current time
  var now = moment().format('ha'); // Format = 1pm, 10pm, etc.

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
  // Extract the current value from the description element
  var currentText = $(this).text();

  // Create the element and add the necessary classes (so we can keep the same styling in edit mode)
  // Additionally, we add the current class (i.e. past, so we can use it when we recreate the element)
  var textInput = $('<textarea>')
    .addClass(`description col-lg-10 col-sm-8 d-flex ${myClass} editInProgress`)
    .val(currentText);
  // Then replace the current element (p) to that textarea element we created above
  $(this).replaceWith(textInput);

  // Focus on the textarea field
  textInput.trigger('focus');
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

// -------- ------- ---- --- - Upload the description to local storage based on the specific time block the user save
$('.saveBtn').click(function () {
  var id = $(this).parent().attr('data-id');
  var editedText = $(this).parent().find('.description').text();

  // Update local storage with current data
  descArr.forEach((item) => {
    // Iterate through each item in the object...
    // If the id in the object matches with the current id....
    if (id == item.id) {
      // Update/add the text associated with the given id
      item.text = editedText;
      // Then upload to the local storage
      localStorage.setItem('desc', JSON.stringify(descArr));
    }
  });
});

// -------- ------- ---- --- - On application load....
$(document).ready(function () {
  // Execute condition upfront and update styling to match time
  updateUi();

  // Update descriptions with local data
  $('.description').each(function () {
    // Iterate over all description elements and extract the ids via data attribute of the parent element
    var id = $(this).parent().attr('data-id');

    descArr.forEach((item) => {
      // Iterate through each item in the object...
      // If the id in the object matches with the current id of the description element....
      if (id == item.id) {
        // Update/add the text associated with the given id
        $(this).text(item.text);
      }
    });
  });
});

// -------- ------- ---- --- - Refresh the window every 60 seconds to update styling and other various functions
var timer = 60;
setInterval(() => {
  timer--;
  $('#counter').text(`Next Refresh: ${timer}`);

  if (timer == 0) {
    timer = 60;
    location.reload();
  }
}, 1000);
