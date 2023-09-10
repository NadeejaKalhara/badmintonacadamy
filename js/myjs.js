setInterval(() => {
   //document.getElementsByClassName('slick-next slick-arrow')[0].click()
}, 5000);

$('#target').weekly_schedule({

   // Days displayed
   days: ["Court 01", "Court 02", "Court 03", "Court 04"], 
 
   // Hours displyed
   hours: "8:30AM-8:00PM", 
 

 
   // Font colot used in the component
   fontColor: "black", 
 
   // Font weight used in the component
   fontWeight: "100", 
 
   // Font size used in the component
   fontSize: "1.2em", 
 
   // Background color when hovered
   hoverColor: "#727bad", 
 
   // Background color when selected
   selectionColor: "#09203e", 
 
   // Background color of headers
   headerBackgroundColor: "transparent"
   
 });

 const datePicker = MCDatepicker.create({
   el: '#datepicker',
   bodyType: 'modal',
   dateFormat: 'yyyy-MM-dd'
 });
     // Get the date input element
     var datepicker = document.getElementById('datepicker');
// Create a new Date object for today's date
var today = new Date();

// Get the year, month, and day from the date object
var year = today.getFullYear();
var month = today.getMonth() + 1; // Months are 0-based, so add 1
var day = today.getDate();

// Format the date as 'YYYY-MM-DD' (e.g., '2023-09-11')
var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

// Set the value of the datepicker input field to today's date
datepicker.value = formattedDate;

const Toast = Swal.mixin({
   toast: true,
   position: 'bottom-end',
   showConfirmButton: false,

 })
 
 Toast.fire({
   html: `
   <h3>Selected Hours</h3>
   `
 })
