// Use setInerval to check the time and update styling accordingly

// setInterval(() => {
//   rowHour = $('h5').text();
//   console.log(rowHour);
// }, 5000);

$('.hour').each(function (index) {
  // Extract the time and remove the AM/PM and convert it from string to number
  hour = parseInt($(this).text().split(' ')[0]);

  console.log(index, hour);
});
