export interface AppState {
  error: any;
  loaded: boolean;
  weatherDataLoaded: boolean;
  projects: Project[];
  weatherData: WeatherData;
}

export interface WeatherData {
  data: any;
  daily: any[]
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  img: string;
}