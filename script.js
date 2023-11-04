let userIP;

async function getUserIP() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    userIP = data.ip;
    console.log('User IP Address:', userIP);
}

getUserIP(); // Call this function to get the user's IP on page load

document.getElementById('start').addEventListener('click', () => {
    fetchLocationInfo(userIP);
});

async function fetchLocationInfo(ip) {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await response.json();
    console.log('Location Information:', locationData);
    
    // Store locationData in localStorage
    localStorage.setItem('locationData', JSON.stringify(locationData));
    
    
    // Navigate to another page after storing the data
    location.href = "/F3_module/index2.html";
    
    // You can also showLocationOnMap(lat, lon) here if needed
}



