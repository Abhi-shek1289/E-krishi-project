import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Leaf,
  FileText,
  Globe,
  MapPin,
  ExternalLink,
  CheckCircle,
  DollarSign,
  Users,
  Briefcase,
  Sprout,
} from "lucide-react";

interface Policy {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  eligibility: string;
  applyLink: string;
  image: string;
  type: "Central" | "State";
  states?: string[];
  amount?: string;
  deadline?: string;
}

const Policies = () => {
  const [selectedState, setSelectedState] = useState("National");
  const [activeTab, setActiveTab] = useState<"Central" | "State">("Central");

  const states = [
    "National",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const centralPolicies: Policy[] = [
    {
      id: "pm-kisan",
      title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      description:
        "Direct income support to all landholding farmers. Provides ₹6,000 per year in three equal installments to improve purchasing power and support agricultural activities.",
      benefits: [
        "₹6,000 per year",
        "Three installments of ₹2,000 each",
        "Direct bank transfer",
        "No hidden charges",
      ],
      eligibility:
        "All landholding farmers irrespective of land size and class",
      applyLink: "https://pmkisan.gov.in/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/pm-kisan-placeholder?format=webp&width=800",
      type: "Central",
      amount: "₹6,000/year",
      deadline: "Ongoing",
    },
    {
      id: "crop-insurance",
      title: "PM Fasal Bima Yojana",
      description:
        "Comprehensive insurance scheme for farmers to protect against crop losses due to natural calamities, pests, and diseases. Lowest premium rates with highest coverage.",
      benefits: [
        "Full crop coverage against natural calamities",
        "Protection against pests and diseases",
        "Easy claim settlement",
        "Mobile app for claim registration",
      ],
      eligibility:
        "All farmers (tenant, sharecropper, or landowner) growing notified crops",
      applyLink: "https://pmfby.gov.in/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/crop-insurance-placeholder?format=webp&width=800",
      type: "Central",
      amount: "Coverage up to 90% of crop loss",
      deadline: "Seasonal",
    },
    {
      id: "soil-health-card",
      title: "Soil Health Card Scheme",
      description:
        "Provides comprehensive soil test report to help farmers make informed decisions about nutrient management and improve soil health and crop productivity.",
      benefits: [
        "Free soil testing",
        "Nutrient recommendations",
        "Improved crop productivity",
        "Reduced fertilizer cost",
      ],
      eligibility: "All farmers across the country",
      applyLink: "https://soilhealth.dac.gov.in/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/soil-health-placeholder?format=webp&width=800",
      type: "Central",
      amount: "Free service",
      deadline: "Ongoing",
    },
    {
      id: "kcc",
      title: "Kisan Credit Card (KCC)",
      description:
        "Simplified credit scheme to meet short-term credit needs of farmers for agricultural and allied activities. Easy access to credit with minimal documentation.",
      benefits: [
        "Quick credit disbursement",
        "Low interest rates (4-7%)",
        "No collateral required",
        "Easy repayment terms",
      ],
      eligibility:
        "Farmers engaged in agriculture, animal husbandry, and fishery",
      applyLink: "https://www.nabard.org/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/kcc-placeholder?format=webp&width=800",
      type: "Central",
      amount: "Up to ₹1-3 lakhs per card",
      deadline: "Ongoing",
    },
    {
      id: "agri-infra",
      title: "Agriculture Infrastructure Fund",
      description:
        "Concessional loans for on-farm and off-farm post-harvest management infrastructure development. Supports agricultural value chain development.",
      benefits: [
        "Loans up to ₹2 crore",
        "3% interest subvention for 7 years",
        "Covers farm machinery, cold storage, etc.",
      ],
      eligibility: "Farmers, AGPs, FPOs, cooperatives, and entrepreneurs",
      applyLink: "https://pmkisan.dac.gov.in/aif/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/agri-infra-placeholder?format=webp&width=800",
      type: "Central",
      amount: "Up to ₹2 crore",
      deadline: "Ongoing",
    },
    {
      id: "paramparagat",
      title: "Paramparagat Krishi Vikas Yojana (PKVY)",
      description:
        "Promotes organic farming through cluster approach. Provides technical support and certification assistance for organic crop production.",
      benefits: [
        "₹50,000 per hectare for 3 years",
        "Free organic certification",
        "Market linkage support",
        "Training programs",
      ],
      eligibility:
        "Farmers interested in organic farming, preferably in groups",
      applyLink: "https://www.indiaorganic.gov.in/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/organic-farming-placeholder?format=webp&width=800",
      type: "Central",
      amount: "₹50,000/hectare",
      deadline: "Ongoing",
    },
    {
      id: "drip-irrigation",
      title: "Per Drop More Crop Scheme",
      description:
        "Promotes drip and sprinkler irrigation systems to enhance water use efficiency and increase productivity. Provides subsidy on irrigation equipment.",
      benefits: [
        "50-90% subsidy on equipment",
        "Water saving up to 40-60%",
        "Increased crop yield",
        "Reduced water wastage",
      ],
      eligibility:
        "Farmers with agriculture land and access to water source",
      applyLink: "https://pmkamandak.dac.gov.in/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/irrigation-placeholder?format=webp&width=800",
      type: "Central",
      amount: "₹40,000-₹80,000 subsidy",
      deadline: "Ongoing",
    },
    {
      id: "msp-scheme",
      title: "Minimum Support Price (MSP) Scheme",
      description:
        "Ensures farmers get minimum guaranteed price for their produce. Government purchases agricultural produce at MSP to protect farmer income.",
      benefits: [
        "Price floor for crops",
        "Guaranteed market",
        "Procurement operations",
        "Income protection",
      ],
      eligibility:
        "Farmers producing notified crops (wheat, rice, pulses, oilseeds, etc.)",
      applyLink: "https://www.cdc.gov.in/",
      image:
        "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/msp-placeholder?format=webp&width=800",
      type: "Central",
      amount: "MSP varies by crop and year",
      deadline: "Seasonal",
    },
  ];

  const statePolicies: { [key: string]: Policy[] } = {
    "Andhra Pradesh": [
      {
        id: "ap-rrgghy",
        title: "Raitha Raithu Giri Gangaramana Hastak Yogya (RRGGHY)",
        description:
          "AP state scheme providing direct input subsidy and credit support to farmers for agriculture and horticulture.",
        benefits: [
          "Direct cash transfer",
          "Input subsidy",
          "Concessional credit",
          "Training support",
        ],
        eligibility: "Marginal and small farmers in Andhra Pradesh",
        applyLink: "https://apagri.ap.gov.in/",
        image:
          "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/ap-policy-placeholder?format=webp&width=800",
        type: "State",
        states: ["Andhra Pradesh"],
        amount: "₹2,500-₹5,000 per hectare",
        deadline: "As notified by state",
      },
    ],
    Maharashtra: [
      {
        id: "mh-samman",
        title: "Mahatma Jyotiba Phule Samman Yojana",
        description:
          "Maharashtra scheme providing financial assistance to farmers for agricultural development and income support.",
        benefits: [
          "Direct income support",
          "Crop insurance included",
          "Easy access",
          "No collateral",
        ],
        eligibility: "All farmers in Maharashtra",
        applyLink: "https://maha.gov.in/",
        image:
          "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/mh-policy-placeholder?format=webp&width=800",
        type: "State",
        states: ["Maharashtra"],
        amount: "₹10,000-₹15,000 per season",
        deadline: "As per state notification",
      },
    ],
    Karnataka: [
      {
        id: "ka-raita",
        title: "Karnataka Raita Samrakshana Yojana",
        description:
          "Karnataka state scheme for farmer income protection and agricultural insurance coverage.",
        benefits: [
          "Insurance coverage",
          "Income support",
          "Pest management subsidy",
          "Input assistance",
        ],
        eligibility: "Farmers with agricultural land in Karnataka",
        applyLink: "https://www.agriculture.karnataka.gov.in/",
        image:
          "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/ka-policy-placeholder?format=webp&width=800",
        type: "State",
        states: ["Karnataka"],
        amount: "Variable based on crop and loss",
        deadline: "Seasonal",
      },
    ],
    "Uttar Pradesh": [
      {
        id: "up-subsidy",
        title: "UP Kisan Rin Sanmaan Yojana",
        description:
          "Uttar Pradesh scheme providing interest-free loans to small and marginal farmers for agricultural activities.",
        benefits: [
          "Interest-free loans",
          "Quick disbursement",
          "Flexible repayment",
          "No hidden charges",
        ],
        eligibility: "Small and marginal farmers of UP",
        applyLink: "https://up.gov.in/",
        image:
          "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/up-policy-placeholder?format=webp&width=800",
        type: "State",
        states: ["Uttar Pradesh"],
        amount: "Up to ₹1 lakh",
        deadline: "Ongoing",
      },
    ],
    Punjab: [
      {
        id: "pb-farm",
        title: "Punjab Farm Sector Development Fund",
        description:
          "Punjab state scheme for sustainable agricultural development and farmer welfare programs.",
        benefits: [
          "Infrastructure subsidy",
          "Mechanization support",
          "Training programs",
          "Market linkage",
        ],
        eligibility: "All farmers in Punjab",
        applyLink: "https://pbagri.gov.in/",
        image:
          "https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/pb-policy-placeholder?format=webp&width=800",
        type: "State",
        states: ["Punjab"],
        amount: "₹50,000-₹2,00,000",
        deadline: "As notified",
      },
    ],
  };

  const getRelevantPolicies = () => {
    if (activeTab === "Central") {
      return centralPolicies;
    } else {
      return statePolicies[selectedState] || [];
    }
  };

  const relevantPolicies = getRelevantPolicies();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-green-50">
      {/* Header */}
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
                <FileText className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  Government Schemes
                </span>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Globe className="h-4 w-4 mr-1" />
              Farmer Benefits
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Government Schemes & Policies for Farmers
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Discover all available central and state government schemes designed
            to support and empower farmers with subsidies, credit, insurance,
            and income support.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Filter by Category
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("Central")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "Central"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Globe className="h-5 w-5 inline mr-2" />
                  Central Government Policies
                </button>
                <button
                  onClick={() => setActiveTab("State")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "State"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <MapPin className="h-5 w-5 inline mr-2" />
                  State Government Policies
                </button>
              </div>
            </div>

            {activeTab === "State" && (
              <div className="w-full lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Policies Grid */}
        {relevantPolicies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relevantPolicies.map((policy) => (
              <Card
                key={policy.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Policy Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-200 to-blue-200 h-48 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-green-600 opacity-30" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      {activeTab}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{policy.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Amount */}
                  {policy.amount && (
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                      <div className="flex items-center text-green-700 font-semibold">
                        <DollarSign className="h-5 w-5 mr-2" />
                        {policy.amount}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {policy.description}
                  </p>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-1">
                      {policy.benefits.slice(0, 3).map((benefit, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-600 flex items-start"
                        >
                          <span className="text-green-600 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                      Eligibility
                    </h4>
                    <p className="text-xs text-gray-700">{policy.eligibility}</p>
                  </div>

                  {/* Deadline */}
                  {policy.deadline && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Deadline:</span> {policy.deadline}
                    </div>
                  )}

                  {/* Apply Button */}
                  <a
                    href={policy.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center p-12">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Policies Available
            </h3>
            <p className="text-gray-600">
              Policies for {selectedState} will be added soon. Check back later
              or explore Central Government schemes.
            </p>
          </Card>
        )}

        {/* Information Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Who Can Apply?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                All farmers with agricultural land, tenant farmers, sharecroppers,
                and agricultural workers are eligible for various government
                schemes. Specific eligibility criteria may vary by scheme.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                How to Apply?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Most schemes can be applied online through official government
                portals. Click "Apply Now" on any scheme to be directed to the
                official application portal where you can complete your
                registration.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sprout className="h-5 w-5 mr-2 text-teal-600" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Contact your local agriculture department, block office, or gram
                panchayat for assistance with scheme applications and queries.
                Many schemes also have dedicated helplines.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Policies;
