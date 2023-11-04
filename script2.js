
const details=JSON.parse(localStorage.getItem('locationData'));
console.log(details);

let office_data;

let card_container=document.getElementsByClassName("card_container")[0];

let input=document.getElementById("search_bar");

let input_value;

let filter_data;
let filtered_data;


let lat_value=document.getElementById("lat_value").innerText=details.latitude;
let long_value=document.getElementById("long_value").innerText=details.longitude;
let city_value=document.getElementById("city_value").innerText=details.city;
let region_value=document.getElementById("region_value").innerText=details.region;
let org_value=document.getElementById("org_value").innerText=details.org;
let hostname_value=document.getElementById("hostname_value").innerText=details.asn;


// Assuming you already have the timezone information in 'details.timezone'
const timezone = details.timezone;

// Get the user's current date and time in their timezone
const currentDate = new Date();
const options = { timeZone: timezone, hour12: true };

// Format the date and time based on the user's timezone
const userTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);

// Update the date and time displayed on your webpage
// document.getElementById("time").innerText = userTime;





let timezones=document.getElementById("timezone").innerText=details.timezone;
// let currentDate = new Date();
// let date=document.getElementById("date").innerText=`${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}  `;
let time=document.getElementById("time").innerText=` ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
let date=document.getElementById("date").innerText=userTime;
let pin=document.getElementById("pin").innerText=details.postal;


// let data=details;

// if (Array.isArray(data.postal)) {
//     data.forEach(element => {
//         displaycard(element);
//     });
// }

// else{

// }
function displaycard(e){
    // console.log(e);
    card_container.innerHTML+=`<div class="card">
    <div class="name"><span class="key2" id="name2">Name:  </span><span class="value2" id="name2_value">${e.Name}</span></div>
    <div class="name"><span class="key2" id="branch2">Branch Type:  </span><span class="value2" id="branch2_value">${e.BranchType}</span></div>
    <div class="name"><span class="key2" id="delivery2">Delivery Status:  </span><span class="value2" id="delivery2_value">${e.DeliveryStatus}</span></div>
    <div class="name"><span class="key2" id="district2">District:  </span><span class="value2" id="district2_value">${e.District}</span></div>
    <div class="name"><span class="key2" id="division2">Division:  </span><span class="value2" id="division2_value">${e.Division}</span></div>
</div>`;
}


const pincode = details.postal;

// Send a GET request to the new API with the pincode
fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(pincodeData => {
        office_data=pincodeData[0];
        filter_data=office_data.PostOffice;
        // Handle the response from the new API
        console.log( office_data);
        let mess=document.getElementById("mess").innerText=office_data.Message;
        office_data.PostOffice.forEach(element => {
            displaycard(element);
        });
    })
    .catch(error => {
        console.error('Error fetching pincode information:', error);
    });


    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
input_value=input.value;
          // Trigger the button element with a click
         renderdata(input_value,filter_data);
        }
      });

      function renderdata(input_value,filter_data){
         filtered_data = filter_data.filter(item =>
            item.Name.toLowerCase().includes(input_value) || item.BranchType.toLowerCase().includes(input_value)
        );
        if (filtered_data.length > 0) {
            // Items match the input
            console.log(filtered_data);
        } else {
            // No matching items found
            console.log("No matching items found.");
        }
        card_container.innerHTML='';
        filtered_data.forEach(element => {
            displaycard(element);
        });
      }


