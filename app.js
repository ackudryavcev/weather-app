window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const degreeSection = document.querySelector('.degree-section');
    const locationTimezone = document.querySelector('.location-timezone');
    const icon = document.querySelector('.icon');
    const spanDegree = document.querySelector('.degree-section span');
    let celsius = true;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cb8bf22d0d857b940dd356cbbb4dc581&units=metric`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    temperatureDegree.textContent = `${Math.floor(data.main.temp)}°`;
                    degreeSection.addEventListener('click', () => { changeDegree(data) });
                    temperatureDescription.textContent = `${data.weather[0].description}, wind: ${data.wind.speed} meter/sec`;
                    locationTimezone.textContent = data.name;
                    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                }).catch(() => {
                    temperatureDescription.textContent = "Server doesn't work now";
                });
        });


    }

    function changeDegree(data) {
        if (!celsius) {
            temperatureDegree.textContent = `${Math.floor(data.main.temp) + 32}°`;
            spanDegree.textContent = 'F';
        } else {
            temperatureDegree.textContent = `${Math.floor(data.main.temp)}°`;
            spanDegree.textContent = 'C';
        }
        celsius = !celsius;
    }



});