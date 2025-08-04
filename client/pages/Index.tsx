import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Leaf,
  Sprout,
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Heart,
  Award,
  Send,
  Bot,
  User,
} from "lucide-react";

// Chatbot Component
const FarmChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your farming assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Agricultural knowledge base for responses
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('tomato') || lowerMessage.includes('tomatoes')) {
      return "🍅 For tomatoes, plant after the last frost when soil temperature reaches 60°F (15°C). Space plants 24-36 inches apart. They need full sun, well-drained soil, and regular watering. Support with stakes or cages.";
    } else if (lowerMessage.includes('rice') || lowerMessage.includes('paddy')) {
      return "🌾 Rice cultivation requires flooded fields. Plant during monsoon season. Maintain 2-5cm water depth. Transplant seedlings at 20-25 days old. Harvest when grains turn golden yellow (120-140 days).";
    } else if (lowerMessage.includes('wheat')) {
      return "🌾 Wheat is best sown in October-December in India. Requires well-drained loamy soil. Use certified seeds, apply fertilizers (NPK), and ensure proper irrigation. Harvest when grains are hard and golden.";
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer')) {
      return "🌱 Test your soil pH (6.0-7.0 ideal for most crops). Use organic compost and NPK fertilizers. Rotate crops to maintain soil health. Add organic matter like compost or manure annually.";
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
      return "🐛 Use integrated pest management (IPM). Apply neem oil for organic control. Rotate crops, maintain field hygiene, and use beneficial insects. For severe cases, consult local agricultural extension officers.";
    } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return "💧 Use drip irrigation for water efficiency. Water early morning or evening. Mulch around plants to retain moisture. Monitor soil moisture - stick finger 2 inches deep to check.";
    } else if (lowerMessage.includes('season') || lowerMessage.includes('when') || lowerMessage.includes('time')) {
      return "📅 Crop timing depends on your region. Kharif (June-October): Rice, Cotton, Sugarcane. Rabi (November-April): Wheat, Mustard, Peas. Zaid (April-June): Watermelon, Fodder crops.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('sell')) {
      return "💰 Check daily market rates on government portals like eNAM. Consider direct sales to consumers, farmer markets, or cooperatives. Store produce properly to get better prices during off-season.";
    } else if (lowerMessage.includes('government') || lowerMessage.includes('scheme') || lowerMessage.includes('subsidy')) {
      return "🏛️ Key schemes: PM-KISAN (₹6000/year), Crop Insurance (PMFBY), Soil Health Cards, KCC (Kisan Credit Card). Visit your nearest agricultural office or check pmkisan.gov.in for details.";
    } else if (lowerMessage.includes('organic') || lowerMessage.includes('natural')) {
      return "🌿 Organic farming uses no synthetic chemicals. Use compost, green manure, crop rotation, and biological pest control. Certification takes 3 years. Higher prices but sustainable for long-term soil health.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
      return "👋 Hello! I'm here to help with all your farming questions. Ask me about crops, soil, irrigation, pests, government schemes, or market prices. What would you like to know?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "🙏 You're welcome! Happy to help our farming community. Feel free to ask more questions anytime. Good luck with your farming! 🌱";
    } else {
      return "🤔 I understand you're asking about farming. Could you be more specific? I can help with crop cultivation, soil management, pest control, irrigation, government schemes, or market information. Try asking about a specific crop or farming practice!";
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          <div>
            <h3 className="text-lg font-semibold">Farm Assistant AI</h3>
            <p className="text-xs text-green-100">Agricultural Expert • Always Online</p>
          </div>
          <div className="ml-auto w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="h-96 bg-gray-50 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-green-300">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white border border-green-200 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-xs">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-green-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex items-center bg-white border-2 border-green-200 rounded-lg p-2 focus-within:border-green-400 transition-colors">
          <input
            type="text"
            placeholder="Ask about crops, soil, pests, schemes..."
            className="flex-1 border-none outline-none text-sm"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 ml-2 px-3"
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {['Rice cultivation', 'Tomato diseases', 'Soil testing', 'Government schemes'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputMessage(suggestion)}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-green-900/95 backdrop-blur-sm border-b border-green-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Leaf className="h-8 w-8 text-green-400 mr-2" />
                <span className="text-white text-xl font-bold">E-krishi</span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#home"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#store"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Store
                </a>
                <a
                  href="#recommendations"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Recommendations
                </a>
                <a
                  href="#advisor"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Advisor
                </a>
                <a
                  href="#gallery"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#contact"
                  className="text-white hover:text-green-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </a>
                <Search className="h-5 w-5 text-white hover:text-green-300 cursor-pointer" />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/bg1-9c4839?format=webp&width=800')`,
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforming Farming, Empowering Communities
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Smart Solutions for Smarter Farming
          </p>
          <Link to="/weather">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-md shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Explore More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About us
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our project addresses key challenges faced by farmers, such as
                unfair pricing, lack of awareness of government policies, and
                limited access to efficient farming practices. We provide a
                platform that connects farmers with buyers for fair prices,
                offers up-to-date information on policies, and delivers
                region-specific crop recommendations to optimize yields.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                By integrating technology, we aim to empower farmers with the
                knowledge and tools they need for sustainable growth and
                success.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    268+
                  </div>
                  <div className="text-gray-600">Users Visited</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    176+
                  </div>
                  <div className="text-gray-600">Farmers Guided</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    153+
                  </div>
                  <div className="text-gray-600">Total Purchases</div>
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="lg:pl-8">
              <img
                src="https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/aboutus1-6f5190?format=webp&width=800"
                alt="About E-krishi"
                className="w-full rounded-lg shadow-2xl max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section
        id="store"
        className="py-20 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to our Agriculture store
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your One-Stop Destination for High-Quality Agricultural Products
              and Services, Committed to Enhancing Your Farming Success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Agriculture Products",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/sagri-413732?format=webp&width=800",
                icon: <Leaf className="h-8 w-8 text-green-600" />,
                description:
                  "Discover a diverse range of fresh, locally sourced agricultural products, cultivated with care and commitment to sustainability.",
              },
              {
                title: "Fresh Vegetables",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/sfresh-335984?format=webp&width=800",
                icon: <Sprout className="h-8 w-8 text-green-600" />,
                description:
                  "Indulge in the vibrant colors and flavors of our seasonal vegetables, grown using organic farming practices.",
              },
              {
                title: "Dairy Products",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/sdairy-fad74c?format=webp&width=800",
                icon: <Heart className="h-8 w-8 text-green-600" />,
                description:
                  "Savor the rich taste and nutritional value of our dairy products, produced from the finest quality milk.",
              },
              {
                title: "Organic Products",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/seedimg1-c8908e?format=webp&width=800",
                icon: <Award className="h-8 w-8 text-green-600" />,
                description:
                  "Experience the goodness of organic produce, grown without the use of harmful chemicals.",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-green-900/90 text-white border-green-700"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg">
                    {product.icon}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-100">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                SHOP NOW <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recommendations
            </h2>
            <p className="text-xl text-gray-600">
              We want to help you do Farming better!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "10 mistakes what we do with soil",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/rsoil-4e3dab?format=webp&width=800",
              },
              {
                title: "What are the policies in the Agricultural Industries?",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/rpol-51aafa?format=webp&width=800",
              },
              {
                title: "Exploring about the Fertilizers & Pesticides",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/rpes-5f0ca9?format=webp&width=800",
              },
              {
                title: "11 things to know before you plant a crop seed",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/rseeds-694ef2?format=webp&width=800",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/crop-recommendation">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                Explore More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advisor Section */}
      <section
        id="advisor"
        className="py-20 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Farmer Advisor!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhancing Your Farming Experience with Advanced Chatbot Support
              for Personalized Advice and Real-Time Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <img
                src="https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/chatbox3-d59d1b?format=webp&width=800"
                alt="AI Chatbot"
                className="w-full rounded-lg shadow-xl max-w-md mx-auto"
              />
            </div>

            <FarmChatbot />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gallery photos
            </h2>
            <p className="text-xl text-gray-600">
              Explore the most beautiful places in agriculture.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "APPLE",
                category: "Fruit",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g20-696c7d?format=webp&width=800",
              },
              {
                title: "CORN",
                category: "Vegetable",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g21-8c6dc8?format=webp&width=800",
              },
              {
                title: "PEAR",
                category: "Fruit",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g22-d17b00?format=webp&width=800",
              },
              {
                title: "COW",
                category: "Animal",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g23-947ff9?format=webp&width=800",
              },
              {
                title: "BEE",
                category: "Insect",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g24-47cc99?format=webp&width=800",
              },
              {
                title: "VEGETABLES",
                category: "Farming",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g25-ef8662?format=webp&width=800",
              },
              {
                title: "SCARE-CROW",
                category: "Farming",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g26-ecc6d0?format=webp&width=800",
              },
              {
                title: "RICE-CULTIVATOR",
                category: "Farming",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g27-ee5fd2?format=webp&width=800",
              },
              {
                title: "ONION",
                category: "Vegetable",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g28-a2cec1?format=webp&width=800",
              },
              {
                title: "PADDY",
                category: "Farming",
                image:
                  "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g29-776c1a?format=webp&width=800",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-bold text-sm">{item.title}</h4>
                  <p className="text-xs text-green-300">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">
              We always aim to reply within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Contact a Primary Sector Assistant
              </h4>
              <p className="text-gray-600">
                We always aim to reply within 24 hours.
              </p>
            </div>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Call us
                </h4>
                <h5 className="text-xl font-bold text-green-600 mb-2">
                  +91 9473****34
                </h5>
                <p className="text-gray-600">We are available now</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Send us an enquiry
                </h4>
                <p className="text-gray-600">Get in touch with our experts</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="h-8 w-8 text-green-400 mr-2" />
              <h4 className="text-2xl font-bold">E-krishi</h4>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              <a
                href="#"
                className="bg-green-800 p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-green-800 p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-green-800 p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-green-800 p-3 rounded-full hover:bg-green-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <p className="text-green-100 max-w-2xl mx-auto mb-8">
              Connecting farmers with the tools they need for fair trade, policy
              insights, and sustainable growth. Empowering the primary sector
              with technology for a better tomorrow.
            </p>

            <nav className="flex flex-wrap justify-center gap-6 mb-8">
              <a
                href="#home"
                className="text-green-100 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-green-100 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="#store"
                className="text-green-100 hover:text-white transition-colors"
              >
                Store
              </a>
              <a
                href="#recommendations"
                className="text-green-100 hover:text-white transition-colors"
              >
                Recommendations
              </a>
              <a
                href="#advisor"
                className="text-green-100 hover:text-white transition-colors"
              >
                Advisor
              </a>
              <a
                href="#gallery"
                className="text-green-100 hover:text-white transition-colors"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-green-100 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          <div className="border-t border-green-800 pt-8 text-center">
            <p className="text-green-200">
              Copyright © 2025 ABHISHEK MISHRA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
