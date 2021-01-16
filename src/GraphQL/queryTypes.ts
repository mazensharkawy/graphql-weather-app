type Coordinates = {
    lon: number,
    lat: number,
}
type City = {
    id: string | number,
    name: string
    country: string
    coord: Coordinates
    weather: Weather
}
type Summary = {
    title: string,
    description: string,
    icon: string
}
type Temperature = {
    actual: number,
    feelsLike: number,
    min: number,
    max: number
}
type Wind = {
    speed: number,
    deg: number
}
type Clouds = {
    all: number,
    visibility: number,
    humidity: number
}
type Weather = {
    summary: Summary,
    temperature: Temperature,
    wind: Wind,
    clouds: Clouds
    timestamp: number
}
export type WeatherData = {
    id: string | number,
    name: string
    country: string
    coord: Coordinates
    weather: Weather
}
export type GetCityByName = {
    getCityByName: WeatherData
}