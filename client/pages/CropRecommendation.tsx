import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Sparkles,
} from "lucide-react";

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

const generateCropDatabase = () => {
  const crops = [];
  const cropData = [
    // Cereals & Grains (30 crops)
    { name: "Rice", n: [30, 80], p: [20, 50], k: [20, 60], ph: [5.5, 7.0], m: [80, 100], t: [20, 35], y: "40-60 quintals/hectare", season: "Kharif" },
    { name: "Wheat", n: [40, 100], p: [25, 60], k: [30, 70], ph: [6.0, 7.5], m: [50, 80], t: [15, 25], y: "35-45 quintals/hectare", season: "Rabi" },
    { name: "Maize", n: [80, 120], p: [40, 80], k: [40, 80], ph: [5.5, 7.5], m: [60, 75], t: [25, 35], y: "50-70 quintals/hectare", season: "Kharif" },
    { name: "Barley", n: [40, 80], p: [25, 50], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [15, 20], y: "30-40 quintals/hectare", season: "Rabi" },
    { name: "Jowar", n: [30, 60], p: [15, 40], k: [20, 50], ph: [5.8, 8.0], m: [40, 60], t: [20, 30], y: "20-25 quintals/hectare", season: "Kharif" },
    { name: "Bajra", n: [20, 40], p: [10, 30], k: [15, 40], ph: [5.5, 8.0], m: [30, 50], t: [25, 35], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Ragi", n: [30, 50], p: [15, 35], k: [20, 40], ph: [5.5, 7.5], m: [50, 70], t: [20, 30], y: "20-30 quintals/hectare", season: "Kharif" },
    { name: "Oats", n: [40, 80], p: [20, 40], k: [20, 40], ph: [6.0, 7.5], m: [50, 75], t: [15, 20], y: "30-40 quintals/hectare", season: "Rabi" },
    { name: "Buckwheat", n: [20, 40], p: [15, 30], k: [15, 35], ph: [5.5, 7.5], m: [50, 70], t: [15, 25], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Quinoa", n: [30, 60], p: [20, 40], k: [25, 50], ph: [6.0, 8.5], m: [50, 70], t: [15, 25], y: "15-25 quintals/hectare", season: "Rabi" },
    { name: "Millet", n: [25, 50], p: [15, 35], k: [20, 45], ph: [5.8, 8.0], m: [40, 60], t: [22, 32], y: "15-25 quintals/hectare", season: "Kharif" },
    { name: "Spelt Wheat", n: [50, 90], p: [30, 60], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [15, 22], y: "25-35 quintals/hectare", season: "Rabi" },
    { name: "Amaranth", n: [40, 80], p: [25, 50], k: [30, 60], ph: [5.5, 7.5], m: [60, 80], t: [20, 30], y: "20-30 quintals/hectare", season: "Kharif" },
    { name: "Sorghum", n: [30, 70], p: [15, 40], k: [20, 50], ph: [5.8, 8.0], m: [40, 60], t: [20, 30], y: "20-30 quintals/hectare", season: "Kharif" },
    { name: "Triticale", n: [50, 100], p: [30, 60], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [15, 22], y: "35-45 quintals/hectare", season: "Rabi" },
    { name: "Teff", n: [30, 60], p: [15, 35], k: [20, 40], ph: [5.5, 8.0], m: [50, 70], t: [20, 28], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Farro", n: [40, 80], p: [25, 50], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [15, 22], y: "25-35 quintals/hectare", season: "Rabi" },
    { name: "Kamut", n: [50, 90], p: [30, 60], k: [40, 80], ph: [6.0, 8.0], m: [50, 70], t: [15, 22], y: "30-40 quintals/hectare", season: "Rabi" },
    { name: "Emmer", n: [40, 80], p: [25, 50], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [15, 22], y: "20-30 quintals/hectare", season: "Rabi" },
    { name: "Einkorn", n: [30, 60], p: [20, 40], k: [25, 50], ph: [6.0, 7.5], m: [50, 70], t: [15, 22], y: "15-25 quintals/hectare", season: "Rabi" },
    { name: "Rice Bran", n: [20, 40], p: [15, 30], k: [15, 35], ph: [6.0, 7.0], m: [70, 90], t: [20, 30], y: "30-40 quintals/hectare", season: "Kharif" },
    { name: "Brown Rice", n: [30, 80], p: [20, 50], k: [20, 60], ph: [5.5, 7.0], m: [75, 95], t: [20, 35], y: "35-55 quintals/hectare", season: "Kharif" },
    { name: "Jasmine Rice", n: [35, 85], p: [22, 52], k: [22, 62], ph: [5.5, 7.0], m: [78, 98], t: [20, 35], y: "38-58 quintals/hectare", season: "Kharif" },
    { name: "Arborio Rice", n: [35, 80], p: [20, 50], k: [20, 60], ph: [5.8, 7.2], m: [80, 100], t: [20, 35], y: "40-60 quintals/hectare", season: "Kharif" },
    { name: "Long Grain Rice", n: [30, 75], p: [20, 48], k: [20, 58], ph: [5.5, 7.0], m: [80, 100], t: [20, 35], y: "38-58 quintals/hectare", season: "Kharif" },
    { name: "Sticky Rice", n: [35, 85], p: [22, 52], k: [22, 62], ph: [5.5, 7.0], m: [80, 100], t: [20, 35], y: "40-60 quintals/hectare", season: "Kharif" },
    { name: "Black Rice", n: [30, 80], p: [20, 50], k: [20, 60], ph: [5.5, 7.0], m: [80, 100], t: [20, 35], y: "35-55 quintals/hectare", season: "Kharif" },
    { name: "Red Rice", n: [30, 75], p: [20, 48], k: [20, 58], ph: [5.5, 7.0], m: [75, 95], t: [20, 35], y: "35-55 quintals/hectare", season: "Kharif" },
    { name: "Wild Rice", n: [20, 50], p: [15, 40], k: [15, 45], ph: [6.0, 7.5], m: [85, 100], t: [15, 25], y: "10-20 quintals/hectare", season: "Kharif" },
    { name: "Basmati Rice", n: [30, 75], p: [20, 48], k: [20, 58], ph: [5.5, 7.0], m: [80, 100], t: [20, 35], y: "35-50 quintals/hectare", season: "Kharif" },
    
    // Vegetables (50 crops)
    { name: "Tomato", n: [60, 120], p: [40, 80], k: [80, 150], ph: [6.0, 7.0], m: [60, 80], t: [20, 30], y: "400-600 quintals/hectare", season: "Year-round" },
    { name: "Potato", n: [80, 150], p: [60, 100], k: [100, 200], ph: [5.0, 6.5], m: [70, 85], t: [15, 20], y: "250-350 quintals/hectare", season: "Rabi" },
    { name: "Onion", n: [80, 120], p: [60, 100], k: [150, 200], ph: [6.0, 7.0], m: [60, 75], t: [15, 25], y: "200-300 quintals/hectare", season: "Rabi" },
    { name: "Garlic", n: [80, 120], p: [60, 100], k: [120, 180], ph: [6.0, 7.5], m: [60, 75], t: [10, 20], y: "100-150 quintals/hectare", season: "Rabi" },
    { name: "Cucumber", n: [50, 100], p: [30, 60], k: [60, 100], ph: [6.5, 7.5], m: [65, 80], t: [25, 35], y: "400-500 quintals/hectare", season: "Kharif & Summer" },
    { name: "Brinjal", n: [70, 120], p: [40, 70], k: [80, 140], ph: [6.0, 6.8], m: [60, 80], t: [25, 30], y: "300-400 quintals/hectare", season: "Year-round" },
    { name: "Carrot", n: [60, 100], p: [40, 80], k: [100, 150], ph: [6.5, 7.5], m: [60, 75], t: [15, 25], y: "300-400 quintals/hectare", season: "Rabi & Summer" },
    { name: "Cabbage", n: [80, 120], p: [50, 90], k: [120, 180], ph: [6.0, 7.5], m: [65, 80], t: [15, 25], y: "400-500 quintals/hectare", season: "Rabi & Summer" },
    { name: "Cauliflower", n: [100, 150], p: [60, 100], k: [150, 200], ph: [6.0, 7.0], m: [60, 75], t: [15, 25], y: "200-300 quintals/hectare", season: "Rabi" },
    { name: "Broccoli", n: [80, 130], p: [50, 90], k: [100, 180], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "150-250 quintals/hectare", season: "Rabi" },
    { name: "Lettuce", n: [50, 90], p: [30, 60], k: [80, 130], ph: [6.0, 7.5], m: [60, 75], t: [10, 20], y: "200-300 quintals/hectare", season: "Rabi" },
    { name: "Spinach", n: [40, 80], p: [30, 60], k: [60, 120], ph: [6.5, 7.5], m: [60, 75], t: [10, 20], y: "150-200 quintals/hectare", season: "Rabi" },
    { name: "Bell Pepper", n: [60, 100], p: [40, 70], k: [80, 130], ph: [6.0, 6.8], m: [60, 75], t: [20, 28], y: "200-300 quintals/hectare", season: "Summer" },
    { name: "Chilli", n: [80, 130], p: [50, 90], k: [100, 160], ph: [6.0, 6.8], m: [60, 75], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Beet", n: [60, 100], p: [40, 70], k: [100, 150], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "250-350 quintals/hectare", season: "Rabi" },
    { name: "Radish", n: [40, 80], p: [30, 60], k: [60, 110], ph: [6.0, 7.0], m: [60, 75], t: [15, 25], y: "300-400 quintals/hectare", season: "Rabi" },
    { name: "Turnip", n: [50, 90], p: [35, 65], k: [70, 120], ph: [6.0, 7.5], m: [60, 75], t: [15, 20], y: "250-350 quintals/hectare", season: "Rabi" },
    { name: "Pumpkin", n: [50, 100], p: [30, 60], k: [60, 110], ph: [6.0, 7.5], m: [60, 80], t: [20, 30], y: "300-400 quintals/hectare", season: "Kharif" },
    { name: "Squash", n: [50, 100], p: [30, 60], k: [60, 110], ph: [6.0, 7.5], m: [60, 80], t: [20, 30], y: "300-400 quintals/hectare", season: "Kharif" },
    { name: "Zucchini", n: [50, 100], p: [35, 65], k: [70, 120], ph: [6.0, 7.5], m: [60, 75], t: [20, 28], y: "300-400 quintals/hectare", season: "Summer" },
    { name: "Green Beans", n: [40, 80], p: [30, 60], k: [60, 100], ph: [6.0, 7.0], m: [60, 75], t: [20, 28], y: "100-150 quintals/hectare", season: "Kharif & Summer" },
    { name: "Peas", n: [20, 50], p: [40, 70], k: [60, 110], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "80-120 quintals/hectare", season: "Rabi" },
    { name: "Corn/Maize", n: [80, 120], p: [40, 80], k: [40, 80], ph: [5.5, 7.5], m: [60, 75], t: [25, 35], y: "50-70 quintals/hectare", season: "Kharif" },
    { name: "Okra", n: [40, 80], p: [30, 60], k: [60, 100], ph: [6.0, 7.5], m: [60, 75], t: [25, 35], y: "100-150 quintals/hectare", season: "Summer" },
    { name: "Mushroom", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.0, 7.0], m: [80, 95], t: [12, 18], y: "100-200 quintals/hectare", season: "Year-round" },
    { name: "Asparagus", n: [80, 120], p: [40, 80], k: [100, 150], ph: [6.5, 7.5], m: [60, 75], t: [15, 25], y: "50-80 quintals/hectare", season: "Year-round" },
    { name: "Celery", n: [100, 150], p: [60, 100], k: [120, 180], ph: [6.0, 7.0], m: [70, 85], t: [15, 20], y: "300-400 quintals/hectare", season: "Rabi" },
    { name: "Artichoke", n: [80, 120], p: [40, 80], k: [100, 150], ph: [6.5, 7.5], m: [60, 75], t: [15, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Kale", n: [80, 120], p: [50, 90], k: [120, 180], ph: [6.0, 7.5], m: [60, 75], t: [15, 22], y: "150-250 quintals/hectare", season: "Rabi" },
    { name: "Bok Choy", n: [70, 110], p: [40, 70], k: [100, 150], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "200-300 quintals/hectare", season: "Rabi" },
    { name: "Chinese Cabbage", n: [70, 110], p: [40, 70], k: [100, 150], ph: [6.0, 7.0], m: [60, 75], t: [15, 25], y: "250-350 quintals/hectare", season: "Rabi" },
    { name: "Leek", n: [80, 120], p: [50, 90], k: [120, 180], ph: [6.0, 7.5], m: [60, 75], t: [15, 20], y: "150-200 quintals/hectare", season: "Rabi" },
    { name: "Kohlrabi", n: [60, 100], p: [40, 70], k: [80, 130], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "200-300 quintals/hectare", season: "Rabi" },
    { name: "Cucumber Melon", n: [40, 80], p: [25, 50], k: [50, 90], ph: [6.0, 7.5], m: [60, 75], t: [20, 28], y: "250-350 quintals/hectare", season: "Summer" },
    { name: "Water Melon", n: [40, 80], p: [25, 50], k: [50, 100], ph: [6.0, 7.0], m: [60, 75], t: [25, 35], y: "300-400 quintals/hectare", season: "Summer" },
    { name: "Musk Melon", n: [50, 100], p: [30, 60], k: [60, 110], ph: [6.0, 7.0], m: [60, 75], t: [25, 35], y: "250-350 quintals/hectare", season: "Summer" },
    { name: "Sweet Potato", n: [40, 80], p: [30, 60], k: [80, 150], ph: [5.8, 7.0], m: [60, 75], t: [20, 30], y: "200-300 quintals/hectare", season: "Kharif" },
    { name: "Yam", n: [50, 100], p: [40, 80], k: [100, 150], ph: [6.0, 7.0], m: [60, 75], t: [20, 30], y: "150-250 quintals/hectare", season: "Kharif" },
    { name: "Ginger", n: [50, 100], p: [40, 80], k: [100, 180], ph: [5.5, 7.0], m: [70, 85], t: [20, 30], y: "200-250 quintals/hectare", season: "Kharif" },
    { name: "Turmeric", n: [50, 100], p: [40, 80], k: [100, 180], ph: [5.5, 7.5], m: [70, 85], t: [20, 30], y: "200-250 quintals/hectare", season: "Kharif" },
    { name: "Mint", n: [30, 60], p: [20, 40], k: [40, 80], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Coriander", n: [30, 60], p: [20, 40], k: [40, 80], ph: [6.0, 8.0], m: [50, 70], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Fenugreek", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Capsicum", n: [60, 100], p: [40, 70], k: [80, 130], ph: [6.0, 6.8], m: [60, 75], t: [20, 28], y: "150-250 quintals/hectare", season: "Year-round" },
    
    // Fruits (40 crops)
    { name: "Mango", n: [50, 100], p: [30, 60], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [25, 35], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Banana", n: [100, 200], p: [40, 80], k: [200, 300], ph: [5.5, 7.0], m: [70, 85], t: [24, 32], y: "400-600 quintals/hectare", season: "Year-round" },
    { name: "Apple", n: [50, 100], p: [30, 60], k: [50, 100], ph: [6.0, 7.5], m: [50, 70], t: [10, 20], y: "200-300 quintals/hectare", season: "Year-round" },
    { name: "Orange", n: [50, 100], p: [25, 50], k: [40, 80], ph: [6.0, 8.0], m: [60, 75], t: [20, 30], y: "300-500 quintals/hectare", season: "Year-round" },
    { name: "Lemon", n: [50, 100], p: [25, 50], k: [40, 80], ph: [5.5, 7.5], m: [60, 75], t: [20, 30], y: "250-400 quintals/hectare", season: "Year-round" },
    { name: "Lime", n: [50, 100], p: [25, 50], k: [40, 80], ph: [6.0, 8.0], m: [60, 75], t: [20, 30], y: "200-350 quintals/hectare", season: "Year-round" },
    { name: "Grapes", n: [60, 120], p: [40, 80], k: [60, 120], ph: [5.5, 8.0], m: [50, 70], t: [15, 30], y: "300-500 quintals/hectare", season: "Year-round" },
    { name: "Guava", n: [60, 100], p: [30, 60], k: [40, 80], ph: [5.5, 8.0], m: [50, 70], t: [20, 30], y: "200-300 quintals/hectare", season: "Year-round" },
    { name: "Papaya", n: [100, 150], p: [50, 100], k: [100, 200], ph: [6.0, 6.8], m: [60, 80], t: [25, 35], y: "300-400 quintals/hectare", season: "Year-round" },
    { name: "Pineapple", n: [80, 150], p: [40, 80], k: [100, 200], ph: [5.0, 6.5], m: [60, 80], t: [24, 32], y: "300-500 quintals/hectare", season: "Year-round" },
    { name: "Coconut", n: [60, 120], p: [40, 80], k: [100, 200], ph: [5.5, 8.0], m: [60, 80], t: [20, 30], y: "10000-20000 nuts/hectare", season: "Year-round" },
    { name: "Strawberry", n: [80, 130], p: [50, 100], k: [100, 180], ph: [5.5, 7.0], m: [60, 75], t: [15, 25], y: "250-350 quintals/hectare", season: "Rabi & Summer" },
    { name: "Blueberry", n: [60, 100], p: [30, 60], k: [60, 100], ph: [4.5, 5.5], m: [60, 75], t: [15, 25], y: "50-100 quintals/hectare", season: "Year-round" },
    { name: "Raspberry", n: [60, 100], p: [30, 60], k: [60, 100], ph: [6.0, 7.0], m: [60, 75], t: [15, 25], y: "50-100 quintals/hectare", season: "Summer" },
    { name: "Blackberry", n: [60, 100], p: [30, 60], k: [60, 100], ph: [5.5, 7.0], m: [60, 75], t: [15, 25], y: "50-100 quintals/hectare", season: "Summer" },
    { name: "Kiwi", n: [80, 130], p: [50, 100], k: [100, 180], ph: [6.0, 7.0], m: [60, 75], t: [12, 18], y: "150-250 quintals/hectare", season: "Year-round" },
    { name: "Pomegranate", n: [50, 100], p: [30, 60], k: [40, 80], ph: [6.5, 8.0], m: [50, 70], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Fig", n: [40, 80], p: [20, 40], k: [40, 80], ph: [6.0, 8.0], m: [40, 60], t: [20, 30], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Date Palm", n: [50, 100], p: [25, 50], k: [50, 100], ph: [7.0, 8.5], m: [40, 60], t: [25, 35], y: "100-200 quintals/hectare", season: "Year-round" },
    { name: "Peach", n: [50, 100], p: [30, 60], k: [50, 100], ph: [6.0, 7.5], m: [50, 70], t: [12, 22], y: "150-250 quintals/hectare", season: "Summer" },
    { name: "Pear", n: [50, 100], p: [30, 60], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [10, 20], y: "200-300 quintals/hectare", season: "Year-round" },
    { name: "Plum", n: [50, 100], p: [30, 60], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [12, 22], y: "150-250 quintals/hectare", season: "Summer" },
    { name: "Cherry", n: [60, 100], p: [35, 65], k: [60, 110], ph: [6.0, 7.5], m: [60, 75], t: [10, 18], y: "100-150 quintals/hectare", season: "Summer" },
    { name: "Avocado", n: [60, 120], p: [40, 80], k: [60, 120], ph: [5.5, 7.0], m: [60, 75], t: [20, 28], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Olive", n: [40, 80], p: [20, 40], k: [40, 80], ph: [7.0, 8.5], m: [40, 60], t: [15, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Walnut", n: [40, 80], p: [25, 50], k: [50, 100], ph: [6.0, 8.0], m: [50, 70], t: [10, 20], y: "15-25 quintals/hectare", season: "Year-round" },
    { name: "Almond", n: [40, 80], p: [25, 50], k: [40, 80], ph: [6.5, 8.5], m: [40, 60], t: [15, 25], y: "10-15 quintals/hectare", season: "Year-round" },
    { name: "Cashew", n: [50, 100], p: [30, 60], k: [50, 100], ph: [5.5, 7.5], m: [50, 70], t: [20, 30], y: "8-12 quintals/hectare", season: "Year-round" },
    { name: "Pistachio", n: [40, 80], p: [25, 50], k: [40, 80], ph: [7.0, 8.5], m: [40, 60], t: [15, 25], y: "5-10 quintals/hectare", season: "Year-round" },
    { name: "Chestnut", n: [50, 100], p: [30, 60], k: [50, 100], ph: [5.5, 7.5], m: [60, 75], t: [10, 20], y: "20-30 quintals/hectare", season: "Year-round" },
    { name: "Mulberry", n: [60, 100], p: [40, 70], k: [60, 100], ph: [5.5, 8.0], m: [60, 75], t: [20, 30], y: "150-250 quintals/hectare", season: "Year-round" },
    { name: "Passion Fruit", n: [60, 100], p: [40, 70], k: [80, 130], ph: [6.0, 7.0], m: [60, 75], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Litchi", n: [60, 100], p: [40, 70], k: [60, 100], ph: [5.5, 7.0], m: [60, 75], t: [15, 25], y: "80-120 quintals/hectare", season: "Summer" },
    { name: "Longgan", n: [60, 100], p: [40, 70], k: [60, 100], ph: [5.5, 7.0], m: [60, 75], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Rambutan", n: [80, 130], p: [50, 100], k: [100, 180], ph: [5.5, 7.0], m: [70, 85], t: [24, 32], y: "150-250 quintals/hectare", season: "Year-round" },
    { name: "Dragon Fruit", n: [40, 80], p: [20, 40], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Muskmelon", n: [50, 100], p: [30, 60], k: [60, 110], ph: [6.0, 7.0], m: [60, 75], t: [25, 35], y: "250-350 quintals/hectare", season: "Summer" },
    { name: "Cantaloupe", n: [50, 100], p: [30, 60], k: [60, 110], ph: [6.0, 7.5], m: [60, 75], t: [25, 35], y: "250-350 quintals/hectare", season: "Summer" },
    { name: "Honeydew", n: [50, 100], p: [30, 60], k: [60, 110], ph: [6.0, 7.0], m: [60, 75], t: [20, 30], y: "250-350 quintals/hectare", season: "Summer" },
    
    // Pulses (25 crops)
    { name: "Chickpea", n: [20, 40], p: [40, 70], k: [40, 80], ph: [6.5, 8.0], m: [40, 60], t: [15, 25], y: "18-22 quintals/hectare", season: "Rabi" },
    { name: "Lentil", n: [20, 40], p: [40, 70], k: [40, 80], ph: [6.5, 8.0], m: [50, 65], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Pigeon Pea", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Green Gram", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif & Summer" },
    { name: "Black Gram", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Soybean", n: [30, 70], p: [40, 80], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [20, 30], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Pea", n: [20, 50], p: [40, 70], k: [60, 110], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "80-120 quintals/hectare", season: "Rabi" },
    { name: "Bean", n: [30, 60], p: [40, 70], k: [60, 110], ph: [6.0, 7.5], m: [50, 70], t: [20, 28], y: "10-15 quintals/hectare", season: "Kharif & Summer" },
    { name: "Kidney Bean", n: [30, 60], p: [40, 70], k: [60, 110], ph: [6.0, 7.5], m: [50, 70], t: [20, 28], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Pinto Bean", n: [30, 60], p: [40, 70], k: [60, 110], ph: [6.0, 7.5], m: [50, 70], t: [20, 28], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Mung Bean", n: [25, 50], p: [35, 60], k: [35, 70], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "8-12 quintals/hectare", season: "Kharif & Summer" },
    { name: "Faba Bean", n: [30, 60], p: [40, 70], k: [60, 110], ph: [6.0, 8.0], m: [50, 70], t: [15, 22], y: "20-30 quintals/hectare", season: "Rabi" },
    { name: "Horse Gram", n: [20, 40], p: [30, 50], k: [30, 60], ph: [5.5, 7.5], m: [40, 60], t: [18, 28], y: "8-12 quintals/hectare", season: "Kharif" },
    { name: "Cowpea", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.0], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Chickpea Winter", n: [20, 40], p: [40, 70], k: [40, 80], ph: [6.5, 8.0], m: [40, 60], t: [10, 20], y: "18-22 quintals/hectare", season: "Rabi" },
    { name: "Masoor", n: [20, 40], p: [40, 70], k: [40, 80], ph: [6.5, 8.0], m: [50, 65], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Arhar", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Moong", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif & Summer" },
    { name: "Urad", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Gram", n: [20, 40], p: [40, 70], k: [40, 80], ph: [6.5, 8.0], m: [40, 60], t: [15, 25], y: "18-22 quintals/hectare", season: "Rabi" },
    { name: "Moth Bean", n: [15, 35], p: [30, 50], k: [25, 50], ph: [5.5, 8.0], m: [40, 60], t: [22, 32], y: "6-10 quintals/hectare", season: "Kharif" },
    { name: "Urd", n: [20, 40], p: [35, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Pea Winter", n: [20, 50], p: [40, 70], k: [60, 110], ph: [6.0, 7.5], m: [50, 70], t: [10, 20], y: "80-120 quintals/hectare", season: "Rabi" },
    { name: "Berseem", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "250-350 quintals/hectare", season: "Rabi" },
    { name: "Lucerne", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.5, 8.0], m: [60, 75], t: [15, 28], y: "300-400 quintals/hectare", season: "Year-round" },
    
    // Oil Seeds (25 crops)
    { name: "Soybean Oil", n: [30, 70], p: [40, 80], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [20, 30], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Groundnut", n: [50, 100], p: [40, 80], k: [60, 120], ph: [5.8, 7.0], m: [50, 70], t: [25, 35], y: "20-30 quintals/hectare", season: "Kharif" },
    { name: "Sesame", n: [40, 80], p: [30, 60], k: [40, 80], ph: [6.0, 8.0], m: [40, 60], t: [25, 35], y: "10-15 quintals/hectare", season: "Kharif & Summer" },
    { name: "Safflower", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.5, 8.0], m: [30, 50], t: [20, 30], y: "8-12 quintals/hectare", season: "Rabi" },
    { name: "Sunflower", n: [40, 80], p: [30, 60], k: [40, 80], ph: [6.5, 7.5], m: [50, 70], t: [20, 30], y: "15-25 quintals/hectare", season: "Kharif & Rabi" },
    { name: "Mustard", n: [30, 60], p: [40, 80], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [10, 20], y: "18-22 quintals/hectare", season: "Rabi" },
    { name: "Rapeseed", n: [40, 80], p: [40, 80], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "15-25 quintals/hectare", season: "Rabi" },
    { name: "Castor", n: [30, 60], p: [20, 40], k: [40, 80], ph: [5.5, 8.0], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Coconut Oil", n: [60, 120], p: [40, 80], k: [100, 200], ph: [5.5, 8.0], m: [60, 80], t: [20, 30], y: "10000-20000 nuts/hectare", season: "Year-round" },
    { name: "Palm Oil", n: [80, 150], p: [50, 100], k: [100, 200], ph: [5.0, 6.5], m: [70, 85], t: [24, 32], y: "15-25 quintals/hectare", season: "Year-round" },
    { name: "Canola", n: [40, 80], p: [40, 80], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "15-25 quintals/hectare", season: "Rabi" },
    { name: "Linseed", n: [30, 60], p: [30, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "10-15 quintals/hectare", season: "Rabi" },
    { name: "Flaxseed", n: [30, 60], p: [30, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "10-15 quintals/hectare", season: "Rabi" },
    { name: "Niger", n: [30, 60], p: [20, 40], k: [30, 60], ph: [5.5, 7.5], m: [40, 60], t: [20, 28], y: "6-10 quintals/hectare", season: "Kharif" },
    { name: "Sunflower Oil", n: [40, 80], p: [30, 60], k: [40, 80], ph: [6.5, 7.5], m: [50, 70], t: [20, 30], y: "15-25 quintals/hectare", season: "Kharif & Rabi" },
    { name: "Soy Oil", n: [30, 70], p: [40, 80], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [20, 30], y: "15-20 quintals/hectare", season: "Kharif" },
    { name: "Peanut Oil", n: [50, 100], p: [40, 80], k: [60, 120], ph: [5.8, 7.0], m: [50, 70], t: [25, 35], y: "20-30 quintals/hectare", season: "Kharif" },
    { name: "Olive Oil", n: [40, 80], p: [20, 40], k: [40, 80], ph: [7.0, 8.5], m: [40, 60], t: [15, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Walnut Oil", n: [40, 80], p: [25, 50], k: [50, 100], ph: [6.0, 8.0], m: [50, 70], t: [10, 20], y: "15-25 quintals/hectare", season: "Year-round" },
    { name: "Almond Oil", n: [40, 80], p: [25, 50], k: [40, 80], ph: [6.5, 8.5], m: [40, 60], t: [15, 25], y: "10-15 quintals/hectare", season: "Year-round" },
    { name: "Coconut Milk", n: [60, 120], p: [40, 80], k: [100, 200], ph: [5.5, 8.0], m: [60, 80], t: [20, 30], y: "10000-20000 nuts/hectare", season: "Year-round" },
    { name: "Sesame Oil", n: [40, 80], p: [30, 60], k: [40, 80], ph: [6.0, 8.0], m: [40, 60], t: [25, 35], y: "10-15 quintals/hectare", season: "Kharif & Summer" },
    { name: "Safflower Oil", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.5, 8.0], m: [30, 50], t: [20, 30], y: "8-12 quintals/hectare", season: "Rabi" },
    { name: "Corn Oil", n: [80, 120], p: [40, 80], k: [40, 80], ph: [5.5, 7.5], m: [60, 75], t: [25, 35], y: "50-70 quintals/hectare", season: "Kharif" },
    { name: "Sorghum Oil", n: [30, 70], p: [15, 40], k: [20, 50], ph: [5.8, 8.0], m: [40, 60], t: [20, 30], y: "20-30 quintals/hectare", season: "Kharif" },
    
    // Spices & Herbs (30 crops)
    { name: "Black Pepper", n: [50, 100], p: [30, 60], k: [100, 180], ph: [5.5, 7.0], m: [70, 85], t: [20, 30], y: "20-25 quintals/hectare", season: "Year-round" },
    { name: "Chilli Pepper", n: [80, 130], p: [50, 90], k: [100, 160], ph: [6.0, 6.8], m: [60, 75], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Turmeric", n: [50, 100], p: [40, 80], k: [100, 180], ph: [5.5, 7.5], m: [70, 85], t: [20, 30], y: "200-250 quintals/hectare", season: "Kharif" },
    { name: "Cumin", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [20, 30], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Coriander", n: [30, 60], p: [20, 40], k: [40, 80], ph: [6.0, 8.0], m: [50, 70], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Fenugreek", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Fennel", n: [30, 60], p: [20, 40], k: [30, 60], ph: [6.0, 8.0], m: [50, 70], t: [15, 25], y: "15-20 quintals/hectare", season: "Rabi" },
    { name: "Clove", n: [60, 100], p: [40, 70], k: [80, 130], ph: [5.5, 7.0], m: [70, 85], t: [20, 30], y: "30-40 quintals/hectare", season: "Year-round" },
    { name: "Nutmeg", n: [60, 100], p: [40, 70], k: [80, 130], ph: [5.5, 7.0], m: [70, 85], t: [20, 30], y: "20-30 quintals/hectare", season: "Year-round" },
    { name: "Cinnamon", n: [50, 100], p: [30, 60], k: [60, 120], ph: [6.0, 7.0], m: [70, 85], t: [20, 30], y: "40-60 quintals/hectare", season: "Year-round" },
    { name: "Cardamom", n: [80, 130], p: [50, 100], k: [100, 180], ph: [5.5, 7.0], m: [75, 90], t: [15, 25], y: "20-30 quintals/hectare", season: "Year-round" },
    { name: "Star Anise", n: [40, 80], p: [25, 50], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "15-25 quintals/hectare", season: "Year-round" },
    { name: "Basil", n: [40, 80], p: [20, 40], k: [40, 80], ph: [6.0, 7.5], m: [60, 75], t: [20, 28], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Oregano", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.5, 8.0], m: [50, 70], t: [15, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Thyme", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.5, 8.0], m: [40, 60], t: [10, 20], y: "60-100 quintals/hectare", season: "Year-round" },
    { name: "Rosemary", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [10, 20], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Sage", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [10, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Dill", n: [40, 80], p: [20, 40], k: [40, 80], ph: [5.5, 8.0], m: [50, 70], t: [10, 25], y: "100-150 quintals/hectare", season: "Rabi" },
    { name: "Parsley", n: [50, 100], p: [30, 60], k: [60, 120], ph: [6.0, 7.5], m: [60, 75], t: [10, 20], y: "150-200 quintals/hectare", season: "Rabi & Summer" },
    { name: "Cilantro", n: [30, 60], p: [20, 40], k: [40, 80], ph: [6.0, 8.0], m: [50, 70], t: [15, 25], y: "100-150 quintals/hectare", season: "Rabi" },
    { name: "Chive", n: [50, 100], p: [30, 60], k: [60, 120], ph: [6.0, 7.5], m: [60, 75], t: [10, 20], y: "150-200 quintals/hectare", season: "Year-round" },
    { name: "Marjoram", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.5, 8.0], m: [50, 70], t: [15, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Lavender", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.5, 8.0], m: [40, 60], t: [10, 25], y: "60-100 quintals/hectare", season: "Year-round" },
    { name: "Mint", n: [30, 60], p: [20, 40], k: [40, 80], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Bay Leaf", n: [40, 80], p: [25, 50], k: [50, 100], ph: [6.0, 8.0], m: [60, 75], t: [15, 25], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Tamarind", n: [40, 80], p: [25, 50], k: [40, 80], ph: [6.0, 8.0], m: [50, 70], t: [20, 30], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Asafoetida", n: [30, 60], p: [15, 35], k: [30, 60], ph: [6.0, 8.0], m: [40, 60], t: [15, 25], y: "10-15 quintals/hectare", season: "Rabi" },
    { name: "Saffron", n: [40, 80], p: [30, 60], k: [60, 120], ph: [6.0, 8.0], m: [50, 70], t: [10, 20], y: "0.3-0.5 kg/hectare", season: "Year-round" },
    { name: "Vanilla", n: [60, 100], p: [40, 70], k: [80, 130], ph: [5.5, 7.0], m: [75, 90], t: [20, 30], y: "1000-1500 pods/hectare", season: "Year-round" },
    
    // Cash Crops (20 crops)
    { name: "Sugarcane", n: [100, 200], p: [50, 100], k: [50, 150], ph: [6.0, 8.5], m: [70, 90], t: [20, 30], y: "60-80 quintals/hectare", season: "Kharif" },
    { name: "Coffee", n: [100, 200], p: [50, 100], k: [100, 200], ph: [5.5, 6.8], m: [70, 85], t: [15, 24], y: "15-25 quintals/hectare", season: "Year-round" },
    { name: "Tea", n: [100, 200], p: [50, 100], k: [100, 200], ph: [4.5, 6.0], m: [75, 90], t: [13, 23], y: "50-100 quintals/hectare", season: "Year-round" },
    { name: "Tobacco", n: [80, 150], p: [40, 80], k: [80, 160], ph: [5.5, 7.0], m: [50, 70], t: [20, 30], y: "20-30 quintals/hectare", season: "Rabi" },
    { name: "Cotton", n: [50, 100], p: [25, 50], k: [40, 80], ph: [5.8, 8.0], m: [50, 70], t: [25, 35], y: "15-25 quintals/hectare", season: "Kharif" },
    { name: "Jute", n: [60, 120], p: [30, 60], k: [40, 80], ph: [5.5, 7.0], m: [70, 85], t: [20, 30], y: "400-500 quintals/hectare", season: "Kharif" },
    { name: "Hemp", n: [40, 80], p: [25, 50], k: [30, 60], ph: [5.5, 8.5], m: [50, 70], t: [10, 28], y: "300-400 quintals/hectare", season: "Kharif" },
    { name: "Flax", n: [30, 60], p: [30, 60], k: [30, 60], ph: [6.0, 7.5], m: [50, 70], t: [15, 25], y: "10-15 quintals/hectare", season: "Rabi" },
    { name: "Opium Poppy", n: [50, 100], p: [40, 80], k: [40, 80], ph: [6.5, 8.0], m: [50, 70], t: [15, 25], y: "50-100 kg/hectare", season: "Rabi" },
    { name: "Rubber", n: [100, 200], p: [50, 100], k: [100, 200], ph: [4.5, 6.0], m: [75, 90], t: [20, 34], y: "1500-2500 kg/hectare", season: "Year-round" },
    { name: "Silk Cotton", n: [50, 100], p: [25, 50], k: [40, 80], ph: [6.0, 7.5], m: [50, 70], t: [20, 30], y: "10-15 quintals/hectare", season: "Kharif" },
    { name: "Indigo", n: [40, 80], p: [30, 60], k: [40, 80], ph: [6.0, 8.0], m: [60, 75], t: [20, 30], y: "200-300 quintals/hectare", season: "Kharif" },
    { name: "Saffron Plant", n: [40, 80], p: [30, 60], k: [60, 120], ph: [6.0, 8.0], m: [50, 70], t: [10, 20], y: "0.3-0.5 kg/hectare", season: "Rabi" },
    { name: "Dye Plants", n: [50, 100], p: [30, 60], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [15, 25], y: "100-150 quintals/hectare", season: "Year-round" },
    { name: "Medicinal Plants", n: [50, 100], p: [30, 60], k: [50, 100], ph: [5.5, 7.5], m: [60, 75], t: [15, 28], y: "50-100 quintals/hectare", season: "Year-round" },
    { name: "Henna", n: [40, 80], p: [25, 50], k: [40, 80], ph: [6.0, 8.0], m: [40, 60], t: [20, 30], y: "80-120 quintals/hectare", season: "Year-round" },
    { name: "Indigo Dye", n: [40, 80], p: [30, 60], k: [40, 80], ph: [6.0, 8.0], m: [60, 75], t: [20, 30], y: "200-300 quintals/hectare", season: "Kharif" },
    { name: "Lac", n: [50, 100], p: [30, 60], k: [50, 100], ph: [6.0, 7.5], m: [60, 75], t: [20, 30], y: "50-100 quintals/hectare", season: "Year-round" },
    { name: "Bamboo", n: [60, 120], p: [40, 80], k: [60, 120], ph: [5.0, 7.0], m: [60, 80], t: [10, 30], y: "300-500 quintals/hectare", season: "Year-round" },
    { name: "Rattan", n: [60, 120], p: [40, 80], k: [60, 120], ph: [5.5, 7.0], m: [70, 85], t: [20, 30], y: "200-300 quintals/hectare", season: "Year-round" },
  ];

  // Create crop objects from data
  for (const data of cropData) {
    crops.push({
      name: data.name,
      requirements: {
        nitrogen: data.n,
        phosphorus: data.p,
        potassium: data.k,
        ph: data.ph,
        moisture: data.m,
        temperature: data.t,
      },
      image: `https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/${data.name.toLowerCase().replace(/\s+/g, '-')}-placeholder?format=webp&width=800`,
      season: data.season,
      expectedYield: data.y,
      seeds: [
        {
          variety: `${data.name} Variety 1`,
          price: Math.floor(Math.random() * 500) + 50,
          supplier: "Local Supplier",
          features: ["High yield", "Disease resistant"],
        },
        {
          variety: `${data.name} Variety 2`,
          price: Math.floor(Math.random() * 500) + 50,
          supplier: "Regional Dealer",
          features: ["Good quality", "Early maturity"],
        },
      ],
      fertilizers: [
        {
          type: "NPK Compound",
          npk: "15:15:15",
          application: "150 kg/hectare",
          price: Math.floor(Math.random() * 500) + 200,
          timing: "At planting",
        },
        {
          type: "Urea",
          npk: "46:0:0",
          application: "100 kg/hectare",
          price: 266,
          timing: "Top dressing",
        },
      ],
      pesticides: [
        {
          name: "Multipurpose Insecticide",
          type: "Insecticide",
          target: "General pests",
          price: Math.floor(Math.random() * 300) + 150,
          application: "1-2 ml/liter water",
        },
        {
          name: "Systemic Fungicide",
          type: "Fungicide",
          target: "Fungal diseases",
          price: Math.floor(Math.random() * 300) + 150,
          application: "2-3 g/liter water",
        },
      ],
    });
  }

  return crops;
};

const CropRecommendation = () => {
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    ph: 6.5,
    moisture: 60,
    temperature: 25,
    humidity: 70,
    rainfall: 100,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(
    [],
  );
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const cropDatabase = generateCropDatabase();

  const calculateSuitability = (crop: any, soil: SoilData): number => {
    let score = 0;

    if (
      soil.nitrogen >= crop.requirements.nitrogen[0] &&
      soil.nitrogen <= crop.requirements.nitrogen[1]
    ) {
      score += 20;
    } else {
      const distance = Math.min(
        Math.abs(soil.nitrogen - crop.requirements.nitrogen[0]),
        Math.abs(soil.nitrogen - crop.requirements.nitrogen[1]),
      );
      score += Math.max(0, 20 - distance * 0.5);
    }

    if (
      soil.phosphorus >= crop.requirements.phosphorus[0] &&
      soil.phosphorus <= crop.requirements.phosphorus[1]
    ) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.phosphorus - crop.requirements.phosphorus[0]),
        Math.abs(soil.phosphorus - crop.requirements.phosphorus[1]),
      );
      score += Math.max(0, 15 - distance * 0.3);
    }

    if (
      soil.potassium >= crop.requirements.potassium[0] &&
      soil.potassium <= crop.requirements.potassium[1]
    ) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.potassium - crop.requirements.potassium[0]),
        Math.abs(soil.potassium - crop.requirements.potassium[1]),
      );
      score += Math.max(0, 15 - distance * 0.3);
    }

    if (
      soil.ph >= crop.requirements.ph[0] &&
      soil.ph <= crop.requirements.ph[1]
    ) {
      score += 20;
    } else {
      const distance = Math.min(
        Math.abs(soil.ph - crop.requirements.ph[0]),
        Math.abs(soil.ph - crop.requirements.ph[1]),
      );
      score += Math.max(0, 20 - distance * 10);
    }

    if (
      soil.moisture >= crop.requirements.moisture[0] &&
      soil.moisture <= crop.requirements.moisture[1]
    ) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.moisture - crop.requirements.moisture[0]),
        Math.abs(soil.moisture - crop.requirements.moisture[1]),
      );
      score += Math.max(0, 15 - distance * 0.2);
    }

    if (
      soil.temperature >= crop.requirements.temperature[0] &&
      soil.temperature <= crop.requirements.temperature[1]
    ) {
      score += 15;
    } else {
      const distance = Math.min(
        Math.abs(soil.temperature - crop.requirements.temperature[0]),
        Math.abs(soil.temperature - crop.requirements.temperature[1]),
      );
      score += Math.max(0, 15 - distance * 0.5);
    }

    return Math.round(score);
  };

  const generateReason = (
    crop: any,
    soil: SoilData,
    suitability: number,
  ): string => {
    const reasons = [];

    if (suitability >= 80) {
      reasons.push(`Excellent soil conditions for ${crop.name} cultivation.`);
    } else if (suitability >= 60) {
      reasons.push(
        `Good soil conditions for ${crop.name} with minor adjustments needed.`,
      );
    } else {
      reasons.push(
        `Moderate suitability for ${crop.name}. Consider soil amendments.`,
      );
    }

    if (soil.nitrogen < crop.requirements.nitrogen[0]) {
      reasons.push(
        "Nitrogen levels are below optimal - consider nitrogen-rich fertilizers.",
      );
    } else if (soil.nitrogen > crop.requirements.nitrogen[1]) {
      reasons.push(
        "High nitrogen levels detected - monitor for leaf burn and reduce N fertilizers.",
      );
    }

    if (soil.ph < crop.requirements.ph[0]) {
      reasons.push("Soil is too acidic - consider lime application.");
    } else if (soil.ph > crop.requirements.ph[1]) {
      reasons.push("Soil is too alkaline - consider sulfur application.");
    }

    return reasons.join(" ");
  };

  const analyzeSoil = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const cropRecommendations = cropDatabase
        .map((crop) => {
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
            pesticides: crop.pesticides,
          };
        })
        .sort((a, b) => b.suitability - a.suitability);

      setRecommendations(cropRecommendations);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1500);
  };

  useEffect(() => {
    if (hasAnalyzed) {
      analyzeSoil();
    }
  }, [soilData]);

  const handleInputChange = (field: keyof SoilData, value: number) => {
    setSoilData((prev) => ({ ...prev, [field]: value }));
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-green-600 hover:text-green-500"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to E-krishi</span>
              </Link>
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  AI Crop Advisor
                </span>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Sparkles className="h-4 w-4 mr-1" />
              ML Powered ({cropDatabase.length} crops)
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Crop Recommendation System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access a database of {cropDatabase.length} crops! Adjust soil parameters and get instant AI-powered recommendations. Updates automatically as you change parameters!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Beaker className="h-5 w-5 mr-2 text-green-600" />
                  Soil Analysis Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Macronutrients (mg/kg)
                  </h4>
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
                        onChange={(e) =>
                          handleInputChange("nitrogen", Number(e.target.value))
                        }
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
                        onChange={(e) =>
                          handleInputChange(
                            "phosphorus",
                            Number(e.target.value),
                          )
                        }
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
                        onChange={(e) =>
                          handleInputChange("potassium", Number(e.target.value))
                        }
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

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Environmental Factors
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        pH Level: {soilData.ph.toFixed(1)}
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="10"
                        step="0.1"
                        value={soilData.ph}
                        onChange={(e) =>
                          handleInputChange("ph", Number(e.target.value))
                        }
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
                        onChange={(e) =>
                          handleInputChange("moisture", Number(e.target.value))
                        }
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
                        onChange={(e) =>
                          handleInputChange(
                            "temperature",
                            Number(e.target.value),
                          )
                        }
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
                        onChange={(e) =>
                          handleInputChange("humidity", Number(e.target.value))
                        }
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
                        onChange={(e) =>
                          handleInputChange("rainfall", Number(e.target.value))
                        }
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
                      Analyzing...
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

          <div className="lg:col-span-2">
            {isAnalyzing && (
              <Card className="mb-8">
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Analyzing Your Soil
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Scanning {cropDatabase.length} crops for perfect matches...
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Beaker className="h-4 w-4 mr-1" /> Chemical Analysis
                      </span>
                      <span className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" /> ML Processing
                      </span>
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" /> Crop Matching
                      </span>
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
                    Based on analysis of {cropDatabase.length} crops - showing top 10 matches (auto-updates as you adjust parameters)
                  </p>
                </div>

                {recommendations.slice(0, 10).map((crop, index) => (
                  <Card key={index} className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                            <Leaf className="h-8 w-8 text-green-700" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">
                              {crop.name}
                            </CardTitle>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge
                                className={`${getSuitabilityColor(crop.suitability)} border`}
                              >
                                {getSuitabilityLabel(crop.suitability)} (
                                {crop.suitability}%)
                              </Badge>
                              <Badge variant="outline">
                                {crop.confidence}% Confidence
                              </Badge>
                              <Badge variant="outline">
                                {crop.season}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            #{index + 1}
                          </div>
                          <div className="text-sm text-gray-600">
                            Recommendation
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                              <div className="text-sm font-medium text-green-800">
                                Expected Yield
                              </div>
                              <div className="text-lg font-bold text-green-600">
                                {crop.expectedYield}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Sprout className="h-4 w-4 mr-2" />
                            Recommended Seeds
                          </h4>
                          <div className="space-y-3">
                            {crop.seeds.map((seed, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50 p-3 rounded-lg"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="font-medium text-gray-900 text-sm">
                                    {seed.variety}
                                  </div>
                                  <div className="text-green-600 font-bold text-sm">
                                    ₹{seed.price}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-600 mb-2">
                                  {seed.supplier}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Droplets className="h-4 w-4 mr-2" />
                            Fertilizers
                          </h4>
                          <div className="space-y-2">
                            {crop.fertilizers.map((fertilizer, idx) => (
                              <div
                                key={idx}
                                className="bg-blue-50 p-2 rounded-lg"
                              >
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-xs">
                                    {fertilizer.type}
                                  </span>
                                  <span className="text-blue-600 font-bold text-xs">
                                    ₹{fertilizer.price}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
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
                  Adjust your soil parameters on the left and click "Get AI Recommendations" to receive personalized recommendations from {cropDatabase.length} crops!
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
