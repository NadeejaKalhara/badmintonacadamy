
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
text = ""
function resettarget(){
  $('#target').weekly_schedule({

    // Days displayed
    days: ["Court 01", "Court 02", "Court 03", "Court 04"], 
  
    // Hours displyed
    hours: "5:00AM-11:00PM",  
    // Font colot used in the component
  
    // Font weight used in the component
    fontWeight: "100", 
  
    // Font size used in the component
    fontSize: "18px", 
  
    // Background color when hovered
    hoverColor: "#727bad", 
  
    // Background color when selected
    selectionColor: "#7066e0", 
  
    // Background color of headers
    headerBackgroundColor: "transparent"
    
  });
}
resettarget()


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
  
        Loader.open()
       
      loadcal(year, month, day);

    
  } else {
      // Handle invalid date format if needed
      console.error('Invalid date format. Please use yyyy-mm-dd');
  }
});
function formatTimel(timeString) {
  // Split the time string into parts: hour, minute, and period (AM/PM)
  const [hour, minute, period] = timeString.split(' ');

  // Remove leading zero from the hour if it exists
  const formattedHour = parseInt(hour)

  // Combine the formatted hour, minute, and period
  const formattedTime = formattedHour + ':' +"00" + minute ;

  return formattedTime;
}
function loadcal(year,month,day){
  // Get the date input element

  // Set the value of the datepicker input field to today's date
    // Reference to the data in Firebase
    const ref = database.ref(`books/${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`);
  
    // Read data from Firebase
    ref.once('value', (snapshot) => {
      const data = snapshot.val();
     console.log(data)
   if(data!=null){
     document.getElementById("target").innerHTML=""
     resettarget()
    Object.keys(data).forEach((court) => {
      const bookings = data[court];
      console.log(bookings)
      Object.keys(bookings).forEach((time) => {
        const bookid = bookings[time];
        console.log(bookid)
        console.log(`hour ${time.replace(" ","")}`,parseInt(court.replace("c",""))-1)
        const hourElement = document.getElementsByClassName(`hour ${time.replace(" ","")}`)[parseInt(court.replace("c",""))];
        if(hourElement.innerText!=null){
        hourElement.classList.add("selected2");
        hourElement.classList.add("system");
  const paragraphElement = document.createElement("p");
  paragraphElement.classList.add('pElement')
  paragraphElement.style.color = "white"
  // Set the content of the <p> element (optional)
  paragraphElement.textContent = bookid;
  // Append the <p> element to the hourElement

   hourElement.appendChild(paragraphElement);

  }
        console.log(hourElement)
  $("#target").fadeIn()
  Loader.close()
$("#preloader").fadeOut();

      })
  
    });
   } else {
if(text==""){
 Toast.fire({
   icon: 'warning',
   title: 'Be the first to book!'
 })
}
$("#orderdata").fadeOut()
document.getElementById("level").textContent = "Select a Booking"


     Loader.close()
$("#preloader").fadeOut();
    document.getElementById("target").innerHTML=""
resettarget()
   }
   if(text!=null){
     restructuresquare()
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
    var datepicker2 = document.getElementById('datepicker');
    // Format the date as 'YYYY-MM-DD' (e.g., '2023-09-11')
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    console.log(formattedDate)
    datepicker2.value = formattedDate ;

  //part2
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
const Toast2 = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: true,
showCancelButton:false,
showDenyButton:true,
confirmButtonText:"BOOK NOW",
denyButtonText:"Cancel"

})

function myclick(el){
  $("#orderdata").fadeOut()

  pretime = el.classList[2]
  CourtNumber = (el.classList[0]).replace("c","")
  console.log("Court Number",CourtNumber)
   bookingtime= `${formatTime(el.classList[2])} - ${calculateOneHourLater(formatTime(el.classList[2]))}`
Loader.open()

  var orderId = el.innerText
  if(orderId!=null&&orderId!=""){
    Toast.fire({
      icon: 'warning',
      title: 'Already Booked!'
    })
    Loader.close()
  } else{

customadd(el)
  }

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



function customadd2(booking){
  Swal.fire({
    title: `Place the Booking `,
    html:
    
      '<div style="display: flex; flex-direction: column;width:95%;">' +
      '<span class="badge bg-label-primary rounded-pill" >FOR NON MEMBERS</span><br><p>'+
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<span class="" >${booking}</span><br><p>`+
      '<label class="text-light" for="ageConfirmation">Is the player above 18 years old?</label>' +
      '<select id="ageConfirmation" class="form-control myinput">' +
      '<option value="18+">Yes</option>' +
      '<option value="18-">No</option>' +
      '</select>' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<label class="text-light" for="name">Player's First Name</label>` +
      '<input id="fname" class="form-control myinput" placeholder="First Name">' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<label class="text-light" for="name">Player's Last Name</label>` +
      '<input id="lname" class="form-control myinput" placeholder="Last Name">' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; margin-bottom: 10px;">' +
      `<label class="text-light" for="idNumber">Player's / Parent NIC Number</label>` +
      '<input id="idNumber" class="form-control myinput" placeholder="Use Parent\'s ID if you are a child">' +
      '</div>' +
      '<div style="display: flex; flex-direction: column;">' +
      '<label class="text-light" for="phoneNumber">Phone Number</label>' +
      '<input id="phoneNumber" class="form-control myinput" placeholder="Phone Number">' +
      '</p></div>' +
      '</div>',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
       fname = Swal.getPopup().querySelector('#fname').value;
       lname = Swal.getPopup().querySelector('#lname').value;
       ageConfirmation = Swal.getPopup().querySelector('#ageConfirmation').value;

       idNumber = Swal.getPopup().querySelector('#idNumber').value;
       phoneNumber = Swal.getPopup().querySelector('#phoneNumber').value;

      if (!fname || !lname || !idNumber || !phoneNumber) {
        if (!(phoneNumber.length == 10)) {
          Swal.showValidationMessage('Phone number should be in 10-digit format');
        } else {
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
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Please Wait",
        text: "Calculating the best price for you...",
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
var url2 = "https://supermindlive.onrender.com/api/getprices"

fetch(url2, {
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
}
function customadd(item){
  Loader.open();
  console.log("made sel");
     // Get the class attribute and split it into an array of class names
      const classNames = item.className.split(" ");
var time = classNames[2]
var id = classNames[0]
      // Check if any of the class names contain "selected"
          console.log("Class names for the selected item:", classNames);
            console.log(formatTime(time))
            const oneHourLater = calculateOneHourLater(formatTime(time));
            var seldate = document.getElementById("datepicker").value
            var thismonth = getMonth(seldate)
            var thisyear = getYear(seldate)
             activedate = getDay(seldate)
            var addtxt = (`${thisyear}/${thismonth}/${activedate} | Court ${parseInt(id.replace("c",""))+1} | ${formatTime(time)} - ${formatTime(oneHourLater)}<br>`)
          if(!text.includes(addtxt)){
            text = text + addtxt
          } else {
        text =   text.replace(addtxt,"")
          }

  Toast2.close();
  if(text!=null&&text!=''){
    Toast2.fire({
      html: `
      <h6>Selected Hours</h6>
      ${text}
      `
    }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    customadd2(text)
  } else if (result.isDenied) {
  location.reload()
  }
  });
  }
  Loader.close();


  
}

function getYear(inputStr) {
  try {
    const year = parseInt(inputStr.substr(0, 4));
    return year;
  } catch (error) {
    return null;
  }
}

function getMonth(inputStr) {
  try {
    const month = parseInt(inputStr.substr(5, 2));
    return month;
  } catch (error) {
    return null;
  }
}
function getDay(inputStr) {
  try {
    const day = parseInt(inputStr.substr(8, 2));
    return day;
  } catch (error) {
    return null;
  }
}

function restructuresquare(){
  function logBookingDetails(inputString) {
    // Split the input string at "<br>" to get individual booking entries
    const bookingEntries = inputString.split('<br>');
  
    // Iterate through each booking entry
    for (const entry of bookingEntries) {
      // Split the entry to extract Date, Court Number, and Booking Time
      const parts = entry.split('|');
  
      if (parts.length === 3) {
        // Trim whitespace from extracted values
        const dateInfo = parts[0].trim();
        const courtNumber = parts[1].trim().replace("Court ","").replace("Court","");
        const bookingTimeInfo = parts[2].trim();
  
        // Split the Date to extract year, month number, and date number
        const dateParts = dateInfo.split('/');
        if (dateParts.length === 3) {
          const yearno = dateParts[0].trim().replace("Date ","").replace("Date","");
          const monthNumber = dateParts[1].trim().toString().padStart(2, '0');;
          const dateNumber = dateParts[2].split(' ')[0].trim().toString().padStart(2, '0');;
  
          // Split the Booking Time to extract the start time
          const bookingTimeParts = bookingTimeInfo.split('-');
          if (bookingTimeParts.length === 2) {
            const startTime =formatTimel(bookingTimeParts[0].trim()) 
            const bookingTime = bookingTimeParts[1].trim();
  
            // Log the extracted information
            console.log('Year is', yearno);
            console.log('Month Number is', monthNumber);
            console.log('Date Number is', dateNumber);
            console.log('Court Number is', courtNumber);
            console.log('Booking Time is', bookingTime);
            console.log('Start Time is', startTime);
            var seldate = document.getElementById("datepicker").value
            var thismonth = getMonth(seldate)
            var thisyear = getYear(seldate)
             activedate = getDay(seldate)
console.log(monthNumber,thismonth,thisyear,yearno,activedate,dateNumber)
            if(parseInt(monthNumber)==parseInt(thismonth)&&parseInt(thisyear)==parseInt(yearno)&&parseInt(dateNumber)==parseInt(activedate)){
          ( document.getElementsByClassName(startTime)[parseInt(courtNumber)]).classList.add("selected")
            }
          }
        }
      }
    }
  }
  logBookingDetails(text)
}

    // Function to check if the URL has a query parameter
    function hasQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.has(name);
  }

  // Function to make a POST request and handle the response
  async function makePostRequest(orderId) {
    console.log(orderId)
      try {
        history.replaceState({}, document.title, "/");
        var urlx1 = `https://supermindlive.onrender.com/checkpdf?oder=${orderId}`
        var urlx2 = `http://localhost:3000/checkpdf?oder=${orderId}`
          const response = await fetch(urlx1, {
              method: 'GET',
          });

          if (response.status === 404) {
              // Display a SweetAlert for payment failure
              Swal.fire({
                  icon: 'error',
                  title: 'Payment Failed',
                  text: 'The payment was not successful.',
              });
          }
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Payment Success',
              text: 'The payment was successful.',
              showCancelButton:true,
              showConfirmButton:true,
              confirmButtonText:"Download Invoice PDF"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `http://localhost:3000/getpdf?oder=${orderId}`
              }
           
            } )
        }
     
      } catch (error) {
          console.error('Error:', error);
      }
  }

  // Check if the "order" query parameter exists in the URL
  if (hasQueryParam('oder')) {
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
      // Get the value of the "order" query parameter
      const orderId = new URLSearchParams(window.location.search).get('oder');
      // Make the POST request
      makePostRequest(orderId);
  }