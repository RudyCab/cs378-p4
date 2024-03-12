import React, {useState, useEffect} from 'react';

const Header = ({city1, city2, city3}) => {
    var latitude = 0;
    var longitude = 1; 
    const [temperature, setTemperature] = useState([]);
    const [time, setTime] = useState([]);
    const [city, setCity] = useState('Austin');
    const [allCities, addCity] = useState(['Austin', 'Dallas', 'Houston']);



    useEffect(() => {
        getCoord('Austin');
    }, []); 


    const getCoord = (city) => {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
        .then(response => {
            if (!response.ok) {
                alert('Invalid City')
            } 
            return response.json();
        })
        .then(data => {
            latitude = data.results[0].latitude;
            longitude = data.results[0].longitude;
            getWeather(latitude, longitude)
            if (!allCities.includes(city)) {
                addCity(prevCities => [...prevCities, city]);
            }
            setCity(city)
            getWeather(latitude, longitude)
        })
        .catch(error => {
            alert('Invalid City')
        });
    }

    const getWeather = async (latitude, longitude) => {
        try {
            console.error('latitude', latitude);
            console.error('longtitude', longitude);

            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
            if (!response.ok) {
                alert('Invalid City')
            }
            const data = await response.json();
            console.error('what is data now', data);

            
            const nextFiveHoursData = data.hourly.time.slice(0, 11).map((time, index) => ({
                time: new Date(time),
                temperature: data.hourly.temperature_2m[index]
            }));
            setTime(nextFiveHoursData.map(entry => entry.time));
            setTemperature(nextFiveHoursData.map(entry => entry.temperature));        
        } catch (error) {
            alert('Invalid City')
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const cityName = event.target.elements.city.value; 
        getCoord(cityName); 
    };
    

    return (
        <div className="container" style={{ }}>
            <img class="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt='menu logo'/>
            <div className="buttons-container">
                {allCities.map((name, index) => (
                    <button key={index} onClick={() => getCoord(name)} type="button">{name}</button>
                ))}
            </div>
            <div>
            </div>

            <div className='search-container'>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="city"
                required/>                
            <button type="submit">+</button>
            </form>
            </div>

            <div class="current">
            <h1>{city}</h1>
            <h2>Current Weather</h2>    
            <h1>Temperature: {temperature && temperature.length > 0 ? temperature[0] : '-' }</h1>
            </div>
            <div className="weather">
                <h2>Upcoming Weather</h2>
                <div className="section">
                    <ul className="weather-list">
                        {time && temperature && time.length > 0 && temperature.length > 0 && time.slice(0, 10).map((t, index) => (
                            <li key={index}>{t.toString()} {temperature[index + 1]}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;