import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Leaf, 
  Brain, 
  Beaker, 
  Sprout, 
  ShoppingCart, 
  TrendingUp, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Target,
  Droplets,
  Thermometer,
  Sun,
  Gauge,
  Seedling,
  Sparkles
} from 'lucide-react';

interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  moisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

interface CropRecommendation {
  name: string;
  suitability: number;
  confidence: number;
  reason: string;
  image: string;
  expectedYield: string;
  season: string;
  seeds: {
    variety: string;
    price: number;
    supplier: string;
    features: string[];
  }[];
  fertilizers: {
    type: string;
    npk: string;
    application: string;
    price: number;
    timing: string;
  }[];
  pesticides: {
    name: string;
    type: string;
    target: string;
    price: number;
    application: string;
  }[];
}

const CropRecommendation = () => {
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    ph: 6.5,
    moisture: 60,
    temperature: 25,
    humidity: 70,
    rainfall: 100
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const cropDatabase = [
    {
      name: 'Rice',
      requirements: { nitrogen: [30, 80], phosphorus: [20, 50], potassium: [20, 60], ph: [5.5, 7.0], moisture: [80, 100], temperature: [20, 35] },
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/basmati-1ab217?format=webp&width=800',
      season: 'Kharif',
      expectedYield: '40-60 quintals/hectare',
      seeds: [
        { variety: 'Basmati 1509', price: 120, supplier: 'IARI Delhi', features: ['High yield', 'Disease resistant', 'Aromatic'] },
        { variety: 'IR 64', price: 80, supplier: 'Local Dealer', features: ['Good quality', 'Medium duration', 'High yield'] }
      ],
      fertilizers: [
        { type: 'Urea', npk: '46:0:0', application: '120 kg/hectare', price: 266, timing: 'Split application' },
        { type: 'DAP', npk: '18:46:0', application: '100 kg/hectare', price: 1350, timing: 'Basal application' },
        { type: 'MOP', npk: '0:0:60', application: '60 kg/hectare', price: 895, timing: 'Split application' }
      ],
      pesticides: [
        { name: 'Chlorpyrifos', type: 'Insecticide', target: 'Stem borer', price: 450, application: '2ml/liter water' },
        { name: 'Tricyclazole', type: 'Fungicide', target: 'Blast disease', price: 380, application: '1g/liter water' }
      ]
    },
    {
      name: 'Wheat',
      requirements: { nitrogen: [40, 100], phosphorus: [25, 60], potassium: [30, 70], ph: [6.0, 7.5], moisture: [50, 80], temperature: [15, 25] },
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/soilimg-d84f73?format=webp&width=800',
      season: 'Rabi',
      expectedYield: '35-45 quintals/hectare',
      seeds: [
        { variety: 'HD 2967', price: 25, supplier: 'IARI', features: ['Heat tolerant', 'High protein', 'Disease resistant'] },
        { variety: 'PBW 725', price: 22, supplier: 'PAU Ludhiana', features: ['High yield', 'Rust resistant', 'Good quality'] }
      ],
      fertilizers: [
        { type: 'Urea', npk: '46:0:0', application: '130 kg/hectare', price: 266, timing: '3 split doses' },
        { type: 'DAP', npk: '18:46:0', application: '130 kg/hectare', price: 1350, timing: 'At sowing' },
        { type: 'MOP', npk: '0:0:60', application: '50 kg/hectare', price: 895, timing: 'At sowing' }
      ],
      pesticides: [
        { name: 'Propiconazole', type: 'Fungicide', target: 'Rust diseases', price: 520, application: '1ml/liter water' },
        { name: 'Isoproturon', type: 'Herbicide', target: 'Broad leaf weeds', price: 340, application: '1kg/hectare' }
      ]
    },
    {
      name: 'Tomato',
      requirements: { nitrogen: [60, 120], phosphorus: [40, 80], potassium: [80, 150], ph: [6.0, 7.0], moisture: [60, 80], temperature: [20, 30] },
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/tomato-303898?format=webp&width=800',
      season: 'Year-round',
      expectedYield: '400-600 quintals/hectare',
      seeds: [
        { variety: 'Arka Rakshak', price: 1500, supplier: 'IIHR Bangalore', features: ['Blight resistant', 'High yield', 'Determinate'] },
        { variety: 'Pusa Ruby', price: 800, supplier: 'IARI Delhi', features: ['Good color', 'Medium size', 'Processing type'] }
      ],
      fertilizers: [
        { type: 'NPK Complex', npk: '19:19:19', application: '200 kg/hectare', price: 980, timing: 'Split application' },
        { type: 'Calcium Nitrate', npk: '15.5:0:0', application: '50 kg/hectare', price: 450, timing: 'Fruit development' }
      ],
      pesticides: [
        { name: 'Mancozeb', type: 'Fungicide', target: 'Early & Late blight', price: 280, application: '2g/liter water' },
        { name: 'Imidacloprid', type: 'Insecticide', target: 'Whitefly & Aphids', price: 350, application: '0.5ml/liter water' }
      ]
    },
    {
      name: 'Cotton',
      requirements: { nitrogen: [50, 100], phosphorus: [25, 50], potassium: [40, 80], ph: [5.8, 8.0], moisture: [50, 70], temperature: [25, 35] },
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/cotton-fea1aa?format=webp&width=800',
      season: 'Kharif',
      expectedYield: '15-25 quintals/hectare',
      seeds: [
        { variety: 'Bollgard II', price: 850, supplier: 'Monsanto', features: ['Bt technology', 'Bollworm resistant', 'High yield'] },
        { variety: 'RCH 650', price: 750, supplier: 'Rasi Seeds', features: ['Hybrid vigor', 'Early maturity', 'Good fiber'] }
      ],
      fertilizers: [
        { type: 'Urea', npk: '46:0:0', application: '100 kg/hectare', price: 266, timing: 'Split doses' },
        { type: 'SSP', npk: '0:16:0', application: '125 kg/hectare', price: 450, timing: 'Basal application' }
      ],
      pesticides: [
        { name: 'Cypermethrin', type: 'Insecticide', target: 'Bollworm', price: 420, application: '1ml/liter water' },
        { name: 'Neem Oil', type: 'Bio-pesticide', target: 'Sucking pests', price: 180, application: '5ml/liter water' }
      ]
    },
    {
      name: 'Potato',
      requirements: { nitrogen: [80, 150], phosphorus: [60, 100], potassium: [100, 200], ph: [5.0, 6.5], moisture: [70, 85], temperature: [15, 20] },
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/potato-479446?format=webp&width=800',
      season: 'Rabi',
      expectedYield: '250-350 quintals/hectare',
      seeds: [
        { variety: 'Kufri Jyoti', price: 25, supplier: 'CPRI Shimla', features: ['Early variety', 'High yield', 'Processing quality'] },
        { variety: 'Kufri Pukhraj', price: 22, supplier: 'CPRI', features: ['Late blight tolerant', 'Good keeping quality', 'Medium maturity'] }
      ],
      fertilizers: [
        { type: 'NPK', npk: '12:32:16', application: '300 kg/hectare', price: 1200, timing: 'At planting' },
        { type: 'Urea', npk: '46:0:0', application: '80 kg/hectare', price: 266, timing: 'Top dressing' }
      ],
      pesticides: [
        { name: 'Metalaxyl + Mancozeb', type: 'Fungicide', target: 'Late blight', price: 480, application: '2.5g/liter water' },
        { name: 'Fipronil', type: 'Insecticide', target: 'Cutworm', price: 650, application: '2ml/liter water' }
      ]
    }
  ];

  const calculateSuitability = (crop: any, soil: SoilData): number => {
    let score = 0;
    let factors = 0;

    // Nitrogen suitability
    if (soil.nitrogen >= crop.requirements.nitrogen[0] && soil.nitrogen <= crop.requirements.nitrogen[1]) {
      score += 20;
    } else {
      const distance = Math.min(
        Math.abs(soil.nitrogen - crop.requirements.nitrogen[0]),
        Math.abs(soil.nitrogen - crop.requirements.nitrogen[1])
      );
      score += Math.max(0, 20 - distance * 0.5);
    }
    factors++;

    // Phosphorus suitability
    if (soil.phosphorus >= crop.requirements.phosphorus[0] && soil.phosphorus <= crop.requirements.phosphorus[1]) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.phosphorus - crop.requirements.phosphorus[0]),
        Math.abs(soil.phosphorus - crop.requirements.phosphorus[1])
      );
      score += Math.max(0, 15 - distance * 0.3);
    }
    factors++;

    // Potassium suitability
    if (soil.potassium >= crop.requirements.potassium[0] && soil.potassium <= crop.requirements.potassium[1]) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.potassium - crop.requirements.potassium[0]),
        Math.abs(soil.potassium - crop.requirements.potassium[1])
      );
      score += Math.max(0, 15 - distance * 0.3);
    }
    factors++;

    // pH suitability
    if (soil.ph >= crop.requirements.ph[0] && soil.ph <= crop.requirements.ph[1]) {
      score += 20;
    } else {
      const distance = Math.min(
        Math.abs(soil.ph - crop.requirements.ph[0]),
        Math.abs(soil.ph - crop.requirements.ph[1])
      );
      score += Math.max(0, 20 - distance * 10);
    }
    factors++;

    // Moisture suitability
    if (soil.moisture >= crop.requirements.moisture[0] && soil.moisture <= crop.requirements.moisture[1]) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.moisture - crop.requirements.moisture[0]),
        Math.abs(soil.moisture - crop.requirements.moisture[1])
      );
      score += Math.max(0, 15 - distance * 0.2);
    }
    factors++;

    // Temperature suitability
    if (soil.temperature >= crop.requirements.temperature[0] && soil.temperature <= crop.requirements.temperature[1]) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.temperature - crop.requirements.temperature[0]),
        Math.abs(soil.temperature - crop.requirements.temperature[1])
      );
      score += Math.max(0, 15 - distance * 0.5);
    }
    factors++;

    return Math.round(score);
  };

  const generateReason = (crop: any, soil: SoilData, suitability: number): string => {
    const reasons = [];
    
    if (suitability >= 80) {
      reasons.push(`Excellent soil conditions for ${crop.name} cultivation.`);
    } else if (suitability >= 60) {
      reasons.push(`Good soil conditions for ${crop.name} with minor adjustments needed.`);
    } else {
      reasons.push(`Moderate suitability for ${crop.name}. Consider soil amendments.`);
    }

    // Add specific reasons based on soil parameters
    if (soil.nitrogen < crop.requirements.nitrogen[0]) {
      reasons.push("Nitrogen levels are below optimal - consider nitrogen-rich fertilizers.");
    } else if (soil.nitrogen > crop.requirements.nitrogen[1]) {
      reasons.push("High nitrogen levels detected - monitor for leaf burn and reduce N fertilizers.");
    }

    if (soil.ph < crop.requirements.ph[0]) {
      reasons.push("Soil is too acidic - consider lime application.");
    } else if (soil.ph > crop.requirements.ph[1]) {
      reasons.push("Soil is too alkaline - consider sulfur application.");
    }

    return reasons.join(' ');
  };

  const analyzeSoil = async () => {
    setIsAnalyzing(true);
    
    // Simulate ML analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const cropRecommendations = cropDatabase.map(crop => {
      const suitability = calculateSuitability(crop, soilData);
      const confidence = Math.min(95, suitability + Math.random() * 10);
      
      return {
        name: crop.name,
        suitability,
        confidence: Math.round(confidence),
        reason: generateReason(crop, soilData, suitability),
        image: crop.image,
        expectedYield: crop.expectedYield,
        season: crop.season,
        seeds: crop.seeds,
        fertilizers: crop.fertilizers,
        pesticides: crop.pesticides
      };
    }).sort((a, b) => b.suitability - a.suitability);

    setRecommendations(cropRecommendations);
    setIsAnalyzing(false);
    setHasAnalyzed(true);
  };

  const handleInputChange = (field: keyof SoilData, value: number) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Poor';
  };

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
                <Brain className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">AI Crop Advisor</span>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Sparkles className="h-4 w-4 mr-1" />
              ML Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Crop Recommendation System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your soil parameters and get AI-powered recommendations for the best crops, 
            seeds, fertilizers, and pesticides tailored to your specific conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Soil Analysis Input */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Beaker className="h-5 w-5 mr-2 text-green-600" />
                  Soil Analysis Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Macronutrients */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Macronutrients (mg/kg)</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nitrogen (N): {soilData.nitrogen} mg/kg
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={soilData.nitrogen}
                        onChange={(e) => handleInputChange('nitrogen', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>100</span>
                        <span>200</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phosphorus (P): {soilData.phosphorus} mg/kg
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        value={soilData.phosphorus}
                        onChange={(e) => handleInputChange('phosphorus', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>75</span>
                        <span>150</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Potassium (K): {soilData.potassium} mg/kg
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={soilData.potassium}
                        onChange={(e) => handleInputChange('potassium', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>150</span>
                        <span>300</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Factors */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Environmental Factors</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        pH Level: {soilData.ph}
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="10"
                        step="0.1"
                        value={soilData.ph}
                        onChange={(e) => handleInputChange('ph', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3.0 (Acidic)</span>
                        <span>7.0 (Neutral)</span>
                        <span>10.0 (Alkaline)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soil Moisture: {soilData.moisture}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={soilData.moisture}
                        onChange={(e) => handleInputChange('moisture', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature: {soilData.temperature}°C
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="45"
                        value={soilData.temperature}
                        onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Humidity: {soilData.humidity}%
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={soilData.humidity}
                        onChange={(e) => handleInputChange('humidity', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Rainfall: {soilData.rainfall} mm
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={soilData.rainfall}
                        onChange={(e) => handleInputChange('rainfall', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={analyzeSoil}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="h-5 w-5 mr-2 animate-pulse" />
                      Analyzing Soil...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2" />
                      Get AI Recommendations
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {isAnalyzing && (
              <Card className="mb-8">
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Soil</h3>
                    <p className="text-gray-600 mb-4">Our AI is processing your soil parameters...</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center"><Beaker className="h-4 w-4 mr-1" /> Chemical Analysis</span>
                      <span className="flex items-center"><BarChart3 className="h-4 w-4 mr-1" /> ML Processing</span>
                      <span className="flex items-center"><Target className="h-4 w-4 mr-1" /> Crop Matching</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasAnalyzed && recommendations.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    AI Crop Recommendations
                  </h2>
                  <p className="text-gray-600">
                    Based on your soil analysis, here are the best crops for your field
                  </p>
                </div>

                {recommendations.map((crop, index) => (
                  <Card key={index} className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={crop.image} 
                            alt={crop.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <CardTitle className="text-2xl">{crop.name}</CardTitle>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge className={`${getSuitabilityColor(crop.suitability)} border`}>
                                {getSuitabilityLabel(crop.suitability)} ({crop.suitability}%)
                              </Badge>
                              <Badge variant="outline">
                                {crop.confidence}% Confidence
                              </Badge>
                              <Badge variant="outline">
                                {crop.season} Season
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">#{index + 1}</div>
                          <div className="text-sm text-gray-600">Recommendation</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Analysis & Yield */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Analysis & Yield
                          </h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {crop.reason}
                            </p>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-green-800">Expected Yield</div>
                              <div className="text-lg font-bold text-green-600">{crop.expectedYield}</div>
                            </div>
                          </div>
                        </div>

                        {/* Seeds */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Seedling className="h-4 w-4 mr-2" />
                            Recommended Seeds
                          </h4>
                          <div className="space-y-3">
                            {crop.seeds.map((seed, idx) => (
                              <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="font-medium text-gray-900">{seed.variety}</div>
                                  <div className="text-green-600 font-bold">₹{seed.price}</div>
                                </div>
                                <div className="text-xs text-gray-600 mb-2">{seed.supplier}</div>
                                <div className="flex flex-wrap gap-1">
                                  {seed.features.map((feature, fIdx) => (
                                    <Badge key={fIdx} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Fertilizers & Pesticides */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Droplets className="h-4 w-4 mr-2" />
                            Fertilizers & Pesticides
                          </h4>
                          <div className="space-y-3">
                            {/* Fertilizers */}
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-2">Fertilizers</div>
                              {crop.fertilizers.slice(0, 2).map((fertilizer, idx) => (
                                <div key={idx} className="bg-blue-50 p-2 rounded-lg mb-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">{fertilizer.type}</span>
                                    <span className="text-blue-600">₹{fertilizer.price}</span>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {fertilizer.application} • {fertilizer.timing}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Pesticides */}
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-2">Pesticides</div>
                              {crop.pesticides.map((pesticide, idx) => (
                                <div key={idx} className="bg-orange-50 p-2 rounded-lg mb-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">{pesticide.name}</span>
                                    <span className="text-orange-600">₹{pesticide.price}</span>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {pesticide.target} • {pesticide.application}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Recommendation based on AI analysis of {Object.keys(soilData).length} soil parameters
                        </div>
                        <Button variant="outline">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Recommended Products
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!hasAnalyzed && !isAnalyzing && (
              <Card className="text-center p-12">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready for AI Analysis
                </h3>
                <p className="text-gray-600">
                  Adjust your soil parameters on the left and click "Get AI Recommendations" 
                  to receive personalized crop, seed, fertilizer, and pesticide suggestions.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
