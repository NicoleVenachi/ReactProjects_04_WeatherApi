
export interface optionType { 
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface forecastType {
  name: string,
  country: string;
  suntise: number;
  sunset: number;
  list: [
    {
      dt: number;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      }
      weather: [
        {
          main: string;
          icon: string;
          description: string;
        }
      ]
      wind: {
        speed: number;
        gust: number;
        deg: number;
      }
      clouds: {
        all: number;
      }
      pop: number;//precipittion prob
      visibility: number;
    
    }
  ] ;//todas las forcasts, arrays de JSONs
  
}