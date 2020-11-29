window.onload = () => {
  let lon;
  let lat;
  let locationTimezone = document.getElementById('timezone');
  let degreeSection = document.getElementById('degree-section');
  let tempDegree = document.getElementById('temp-degree');
  let tempUnit = document.querySelector('#degree-section span');
  let tempDescription = document.getElementById('temp-description');


  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(lat, lon);


      const url = "https://api.openweathermap.org/data/2.5/weather?lat=52.0788747&lon=5.4939200999999995&appid=bcfa14359b2f1fd848f91e111f676059";

      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        tempDegree.textContent = data.main.temp.toFixed(1);
        tempDescription.textContent = data.weather[0].description;
        locationTimezone.textContent = `${data.sys.country} - ${data.name}`;
        degreeSection.addEventListener('click', () => {
          if(tempUnit.textContent === 'K') {
            tempDegree.textContent = (data.main.temp -273.15).toFixed(1);;
            tempUnit.textContent = 'C';
          } else {
            tempDegree.textContent = data.main.temp.toFixed(1);
            tempUnit.textContent = 'K';
          }
        });
      });
    });
  }
}



