import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap,
  Sunrise,
  Sunset,
  Calendar,
  Clock,
  Leaf,
  Sprout,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw
} from 'lucide-react';

interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    humidity: number;
    chanceOfRain: number;
  }>;
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Generate forecast data for the next 5 days starting from today
  const generateForecastData = () => {
    const forecastData = [];
    const today = new Date();

    const weatherConditions = [
      { condition: 'Sunny', icon: 'sunny', tempRange: [28, 35], humidity: [50, 70], rain: [0, 15] },
      { condition: 'Partly Cloudy', icon: 'partly-cloudy', tempRange: [25, 32], humidity: [60, 80], rain: [10, 30] },
      { condition: 'Cloudy', icon: 'cloudy', tempRange: [22, 28], humidity: [70, 85], rain: [20, 50] },
      { condition: 'Light Rain', icon: 'rain', tempRange: [20, 26], humidity: [80, 95], rain: [60, 85] },
      { condition: 'Thunderstorm', icon: 'storm', tempRange: [18, 24], humidity: [85, 95], rain: [80, 95] }
    ];

    for (let i = 0; i < 5; i++) {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);

      const weatherIndex = Math.floor(Math.random() * weatherConditions.length);
      const weather = weatherConditions[weatherIndex];

      const maxTemp = weather.tempRange[0] + Math.random() * (weather.tempRange[1] - weather.tempRange[0]);
      const minTemp = maxTemp - (5 + Math.random() * 8);
      const humidity = weather.humidity[0] + Math.random() * (weather.humidity[1] - weather.humidity[0]);
      const chanceOfRain = weather.rain[0] + Math.random() * (weather.rain[1] - weather.rain[0]);

      forecastData.push({
        date: forecastDate.toISOString().split('T')[0],
        maxTemp: Math.round(maxTemp),
        minTemp: Math.round(minTemp),
        condition: weather.condition,
        icon: weather.icon,
        humidity: Math.round(humidity),
        chanceOfRain: Math.round(chanceOfRain)
      });
    }

    return forecastData;
  };

  // Simulated weather data (in production, you'd use a real API like OpenWeatherMap)
  const getMockWeatherData = (): WeatherData => ({
    location: {
      name: 'Mumbai',
      country: 'India',
      region: 'Maharashtra',
      lat: 19.0760,
      lon: 72.8777
    },
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      humidity: 78,
      windSpeed: 12,
      windDirection: 'SW',
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      feelsLike: 31
    },
    forecast: generateForecastData()
  });

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add some randomization to simulate real-time updates
      const randomizedData = {
        ...mockWeatherData,
        current: {
          ...mockWeatherData.current,
          temperature: mockWeatherData.current.temperature + (Math.random() - 0.5) * 4,
          humidity: Math.max(30, Math.min(95, mockWeatherData.current.humidity + (Math.random() - 0.5) * 10)),
          windSpeed: Math.max(0, mockWeatherData.current.windSpeed + (Math.random() - 0.5) * 8)
        }
      };
      
      setWeatherData(randomizedData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'partly cloudy':
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rain':
      case 'light rain':
      case 'heavy rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'thunderstorm':
      case 'storm':
        return <Zap className="h-8 w-8 text-purple-500" />;
      case 'snow':
        return <CloudSnow className="h-8 w-8 text-blue-300" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getFarmingAdvice = () => {
    if (!weatherData) return [];

    const advice = [];
    const { current, forecast } = weatherData;

    // Temperature advice
    if (current.temperature > 35) {
      advice.push({
        type: 'warning',
        title: 'High Temperature Alert',
        message: 'Increase irrigation frequency. Provide shade for sensitive crops. Harvest early morning.',
        icon: <AlertTriangle className="h-5 w-5" />
      });
    } else if (current.temperature < 10) {
      advice.push({
        type: 'warning',
        title: 'Cold Weather Alert',
        message: 'Protect crops from frost. Use row covers or mulching for sensitive plants.',
        icon: <AlertTriangle className="h-5 w-5" />
      });
    }

    // Humidity advice
    if (current.humidity > 85) {
      advice.push({
        type: 'info',
        title: 'High Humidity',
        message: 'Monitor for fungal diseases. Ensure good air circulation around plants.',
        icon: <Info className="h-5 w-5" />
      });
    }

    // Rain forecast advice
    const rainForecast = forecast.find(day => day.chanceOfRain > 70);
    if (rainForecast) {
      advice.push({
        type: 'success',
        title: 'Rain Expected',
        message: 'Good time for transplanting. Prepare drainage systems. Reduce irrigation.',
        icon: <CheckCircle className="h-5 w-5" />
      });
    }

    // Wind advice
    if (current.windSpeed > 20) {
      advice.push({
        type: 'warning',
        title: 'Strong Winds',
        message: 'Secure tall plants and structures. Avoid spraying pesticides or fertilizers.',
        icon: <AlertTriangle className="h-5 w-5" />
      });
    }

    // UV Index advice
    if (current.uvIndex > 7) {
      advice.push({
        type: 'info',
        title: 'High UV Index',
        message: 'Good for solar drying. Work early morning or late evening to avoid heat stress.',
        icon: <Info className="h-5 w-5" />
      });
    }

    return advice;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading Weather Data...</h2>
          <p className="text-gray-600">Getting the latest agricultural weather information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Weather</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchWeatherData} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-green-600 hover:text-green-500">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to E-krishi</span>
              </Link>
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">E-krishi Weather</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchWeatherData}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {weatherData && (
          <>
            {/* Hero Section - Current Weather */}
            <Card className="mb-8 bg-gradient-to-r from-green-600 to-blue-600 text-white border-none shadow-2xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-lg">
                        {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      {getWeatherIcon(weatherData.current.condition)}
                      <div className="ml-4">
                        <div className="text-5xl font-bold">
                          {Math.round(weatherData.current.temperature)}°C
                        </div>
                        <div className="text-xl opacity-90">
                          {weatherData.current.condition}
                        </div>
                        <div className="text-sm opacity-75">
                          Feels like {Math.round(weatherData.current.feelsLike)}°C
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date().toLocaleDateString('en-IN', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Droplets className="h-5 w-5 mr-2" />
                        <span className="font-medium">Humidity</span>
                      </div>
                      <div className="text-2xl font-bold">{Math.round(weatherData.current.humidity)}%</div>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Wind className="h-5 w-5 mr-2" />
                        <span className="font-medium">Wind</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {Math.round(weatherData.current.windSpeed)} km/h
                      </div>
                      <div className="text-sm opacity-75">{weatherData.current.windDirection}</div>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Gauge className="h-5 w-5 mr-2" />
                        <span className="font-medium">Pressure</span>
                      </div>
                      <div className="text-2xl font-bold">{weatherData.current.pressure} mb</div>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Eye className="h-5 w-5 mr-2" />
                        <span className="font-medium">Visibility</span>
                      </div>
                      <div className="text-2xl font-bold">{weatherData.current.visibility} km</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 5-Day Forecast */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-green-600" />
                      5-Day Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="text-sm font-medium text-gray-600 min-w-[80px]">
                              {formatDate(day.date)}
                            </div>
                            {getWeatherIcon(day.condition)}
                            <div>
                              <div className="font-medium">{day.condition}</div>
                              <div className="text-sm text-gray-500">
                                Humidity: {day.humidity}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg">{Math.round(day.maxTemp)}°</span>
                              <span className="text-gray-500">{Math.round(day.minTemp)}°</span>
                            </div>
                            <div className="text-sm text-blue-600">
                              {day.chanceOfRain}% rain
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farming Advice */}
              <div>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sprout className="h-5 w-5 mr-2 text-green-600" />
                      Farming Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getFarmingAdvice().map((advice, index) => (
                        <div key={index} className={`p-4 rounded-lg border-l-4 ${
                          advice.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                          advice.type === 'success' ? 'bg-green-50 border-green-400' :
                          'bg-blue-50 border-blue-400'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <div className={`mt-0.5 ${
                              advice.type === 'warning' ? 'text-orange-600' :
                              advice.type === 'success' ? 'text-green-600' :
                              'text-blue-600'
                            }`}>
                              {advice.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {advice.title}
                              </h4>
                              <p className="text-sm text-gray-700">
                                {advice.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {getFarmingAdvice().length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                          <p>Weather conditions are optimal for farming activities!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Weather Details */}
                <Card className="mt-6 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Thermometer className="h-5 w-5 mr-2 text-green-600" />
                      Weather Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">UV Index</span>
                        <Badge variant={weatherData.current.uvIndex > 7 ? "destructive" : "secondary"}>
                          {weatherData.current.uvIndex} {weatherData.current.uvIndex > 7 ? 'High' : 'Moderate'}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Air Quality</span>
                        <Badge variant="secondary">Good</Badge>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunrise</span>
                        <span className="font-medium">6:42 AM</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunset</span>
                        <span className="font-medium">6:18 PM</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Moon Phase</span>
                        <span className="font-medium">Waxing Crescent</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
