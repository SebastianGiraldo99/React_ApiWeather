import React ,{Component} from 'react';
import WeatherInfo from './components/weatherInfo';
import WeatherForm from './components/weatherForm';
import {API_KEY} from './keys';

class App extends Component{
    /*
        *Estado creado para actualizarlo cuando se ejecute la busqueda.
        */
        state = {
            temperature: '',
            description: '',
            humidity: '',
            wind_speed: '',
            city: '',
            coutry: '',
            error: null
        };

    getWeather = async e => {
        
        /*
        *Tomando los prarametros del formulario.
        */
        e.preventDefault(); //This method prohibits that send data to server.
        const {city,country} = e.target.elements;
        const cityValue = city.value;
        const countryValue = country.value;

        /**
         * Validando la existencia de la ciudad.
         */

        if(cityValue && countryValue){
            /*
            *TRABAJNDO CON LA API
            */ 
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${API_KEY}&units=metric`;
            const response = await fetch(API_URL);
            const data = await response.json();

            /*
            *Actualizando el estado.
            */

            this.setState({
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                city: data.name,
                coutry: data.sys.country,
                error: null
            });
        }else{
            this.setState({
                error: "Ingrese una ciudad y un país por favor"
            });
        }




       
    }

    render(){
        return (
        <div className="container p-4">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <WeatherForm getWeather={this.getWeather}/>
                    <WeatherInfo {...this.state}/> 
                </div>
            </div>
        </div>
        )
    }
}

export default App;

