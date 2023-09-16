
const firebaseConfig = {
   apiKey: "AIzaSyCRDrmozLib3EiJv6VPjLppQufpHTL4DUI",
   authDomain: "supermindbadminton.firebaseapp.com",
   projectId: "supermindbadminton",
   storageBucket: "supermindbadminton.appspot.com",
   messagingSenderId: "677296343126",
   appId: "1:677296343126:web:81bb61d9a9e898943253f7",
   measurementId: "G-JK7YMQBBC9"
 };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
setInterval(() => {
   //document.getElementsByClassName('slick-next slick-arrow')[0].click()
}, 5000);

$('#target').weekly_schedule({

   // Days displayed
   days: ["Court 01", "Court 02", "Court 03", "Court 04"], 
 
   // Hours displyed
   hours: "5:00AM-12:00PM",  
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
  dateFormat: 'yyyy-MM-dd',
  minDate: new Date()
});
   
datePicker.onSelect((date, formatedDate) => {
  console.log("changed")
  const dateValue = datepicker.value;
  const dateValues = extractDateValues(dateValue);

  if (dateValues) {
      const { year, month, day } = dateValues;
      loadcal(year, month, day);
  } else {
      // Handle invalid date format if needed
      console.error('Invalid date format. Please use yyyy-mm-dd');
  }
});

 function loadcal(year,month,day){
    // Get the date input element
    var datepicker = document.getElementById('datepicker');
    
    // Format the date as 'YYYY-MM-DD' (e.g., '2023-09-11')
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    
    // Set the value of the datepicker input field to today's date
    datepicker.value = formattedDate;
    // Specify the date you want to retrieve data for
      // Reference to the data in Firebase
      const ref = database.ref(`books/${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`);
    
      // Read data from Firebase
      ref.once('value', (snapshot) => {
        const data = snapshot.val();
        // Loop through the data and populate your grid
     if(data!=null){
      Object.keys(data).forEach((court) => {
        const bookings = data[court];
        console.log(bookings)
        Object.keys(bookings).forEach((time) => {
          const bookid = bookings[time];
          console.log(bookid)
          const hourElement = document.getElementsByClassName(`hour ${time.replace(" ","")}`)[parseInt(court.replace("c",""))];
          hourElement.classList.add("selected");
          hourElement.classList.add("system");
    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add('pElement')
    // Set the content of the <p> element (optional)
    paragraphElement.textContent = bookid;
    // Append the <p> element to the hourElement
    hourElement.appendChild(paragraphElement);
          console.log(hourElement)
    $("#target").fadeIn()
        })
    
      });
     } else {
      document.getElementById("target").innerHTML=""
      $('#target').weekly_schedule({

        // Days displayed
        days: ["Court 01", "Court 02", "Court 03", "Court 04"], 
      
        // Hours displyed
        hours: "5:00AM-12:00PM", 
      
     
      
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
     }
      });
 }

    // Create a new Date object for today's date
    var today = new Date();
    
    // Get the year, month, and day from the date object
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Months are 0-based, so add 1
    var day = today.getDate();
    loadcal(year,month,day)

  //part2
  
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: true,
showCancelButton:false,
showDenyButton:true,
confirmButtonText:"BOOK NOW",
denyButtonText:"Cancel"

})

  function myclick(){
  myclick2()
  }
function myclick2(){
  console.log("made sel");
  
  const targetDiv = document.getElementById("target");
  // Get all the elements with the class "item" within the "target" div
  const items = targetDiv.querySelectorAll(".hour");
  // Loop through the items and check their class names
   text = "";

  items.forEach((item) => {
      // Get the class attribute and split it into an array of class names
      const classNames = item.className.split(" ");
var time = classNames[2]
var id = classNames[0]
      // Check if any of the class names contain "selected"
      if (classNames.includes("selected")&&!(classNames.includes("system"))) {
        if(!(item.innerHTML.includes("ADDED"))){
          const paragraphElement = document.createElement("p");
paragraphElement.classList.add('pElement')
// Set the content of the <p> element (optional)
paragraphElement.textContent = "ADDED";
// Append the <p> element to the hourElement
item.appendChild(paragraphElement);
        }
          console.log("Class names for the selected item:", classNames);
          if (classNames.includes("selected") && !classNames.includes("system")) {
            console.log(formatTime(time))
            const oneHourLater = calculateOneHourLater(formatTime(time));
           text = text+ (`Court ${parseInt(id.replace("c",""))+1} | ${formatTime(time)} - ${formatTime(oneHourLater)}<br>`);
           console.log(text)
        }

          
      }
      if (classNames.includes("system")) {
        setTimeout(() => {
          item.classList.add("selected");
        }, 150);
    }
    if (!(classNames.includes("selected"))&&item.innerHTML.includes("ADDED")) {
      item.innerHTML = ""
  }
  })

setTimeout(() => {
  Toast.close();
  if(text!=null&&text!=''){
    Toast.fire({
      html: `
      <h6>Selected Hours</h6>
      ${text}
      `
    }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire({
      title: 'Place the Booking',
      html:
      '<div style="display: flex; flex-direction: column;width:80%;">' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      '<label for="ageConfirmation">Is the player above 18 years old?</label>' +
      '<select id="ageConfirmation" class="swal2-select myinput">' +
      '<option value="18+">Yes</option>' +
      '<option value="18-">No</option>' +
      '</select>' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<label for="name">Player's First Name</label>` +
      '<input id="fname" class="swal2-input myinput" placeholder="First Name">' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<label for="name">Player's Last Name</label>` +
      '<input id="lname" class="swal2-input myinput" placeholder="Last Name">' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<label for="idNumber">Player's / Parent NIC Number</label>` +
      '<input id="idNumber" class="swal2-input myinput" placeholder="Use Parent\'s ID if you are a child">' +
      '</div>' +
      '<div style="display: flex; flex-direction: column;">' +
      '<label for="phoneNumber">Phone Number</label>' +
      '<input id="phoneNumber" class="swal2-input myinput" placeholder="Phone Number">' +
      '</div>' +
      '</div>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
          const fname = Swal.getPopup().querySelector('#fname').value;
          const lname = Swal.getPopup().querySelector('#lname').value;
          const ageConfirmation = Swal.getPopup().querySelector('#ageConfirmation').value;

          const idNumber = Swal.getPopup().querySelector('#idNumber').value;
          const phoneNumber = Swal.getPopup().querySelector('#phoneNumber').value;

          if (!fname || !lname || !idNumber || !phoneNumber) {
            if(!(phoneNumber.length==10)){
              Swal.showValidationMessage('Phone number should be in 10 digit format');
            } else{
              Swal.showValidationMessage('All fields are required');
            }
          }

          return {
              fname: fname,
              lname: lname,
              ageConfirmation: ageConfirmation,
              idNumber: idNumber,
              phoneNumber: phoneNumber,
          };
      }
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Please Wait",
          text: "Generating Invoice...",
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          onBeforeOpen: () => {
              Swal.showLoading();
          }
      }); 
// Create an object with the data you want to send
const data = {
  fname: result.value.fname,
  lname: result.value.lname,
  ageConfirmation: result.value.ageConfirmation,
  idNumber: result.value.idNumber,
  phoneNumber: "+94"+parseInt(result.value.phoneNumber),
  booking: text,
  date: document.getElementById("datepicker").value,
};

// Construct the URL
var url = "http://localhost:3000/api/getprices";

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse the response as JSON and return the Promise
})
.then((responseFromServer) => {
  Swal.fire({
    title: 'Total Amount',
    text: `Amount to pay: ${responseFromServer.amount}`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Pay',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
window.location.href = responseFromServer.redirect
    }
  });
})
.catch((error) => {
  // Handle errors here
  console.error('Error:', error);
});


      }
  });
  } else if (result.isDenied) {
  location.reload()
  }
  });
  }
}, 200);


}
function formatTime(inputTime) {
  // Use a regular expression to match and capture the hours, minutes, and AM/PM parts
  const match = inputTime.match(/(\d+):(\d+)([APap][Mm])/);

  if (match) {
      let hours = parseInt(match[1].toString().padStart(2, '0'));
      const minutes = match[2];
      const ampm = match[3].toUpperCase();
      // Format the hours with leading zero if needed
      hours = hours.toString().padStart(2, '0');

      // Combine hours, minutes, and AM/PM
      return `${hours}:${minutes} ${ampm}`;
  }

  // Return the original input if it doesn't match the expected format
  return inputTime;
}
// Function to calculate one hour later time
function calculateOneHourLater(inputTime) {
  // Parse the input time string into hours, minutes, and AM/PM parts
  const match = inputTime.match(/(\d{1,2}):(\d{2}) (AM|PM)/);
  if (!match) {
    throw new Error("Invalid time format. Please use 'hh:mm AM/PM'.");
  }

  let [_, hoursStr, minutesStr, ampm] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Adjust hours based on AM/PM
  if (ampm === "PM" && hours !== 12) {
    hours += 12;
  } else if (ampm === "AM" && hours === 12) {
    hours = 0;
  }

  // Calculate one hour later
  const oneHourLater = new Date();
  oneHourLater.setHours(hours + 1);
  oneHourLater.setMinutes(minutes);

  // Format the result as "hh:mm AM/PM"
  const resultHours = oneHourLater.getHours() % 12 || 12;
  const resultAmPm = oneHourLater.getHours() < 12 ? "AM" : "PM";
  const resultTime = `${String(resultHours).padStart(2, "0")}:${String(oneHourLater.getMinutes()).padStart(2, "0")} ${resultAmPm}`;

  return resultTime;
}

// Function to extract year, month, and day from the input's value
function extractDateValues(dateString) {
  const parts = dateString.split('-');
  if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const day = parseInt(parts[2]);
      return { year, month, day };
  }
  return null;
}

