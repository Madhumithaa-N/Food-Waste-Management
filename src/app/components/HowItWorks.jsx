import {
  Utensils,
  Search,
  MapPin,
  Clock,
  Bike,
  CheckCircle,
  Users,
  TrendingDown,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HowItWorks() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">How FoodShare Works</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            A simple, effective system to connect food donors with those in
            need, reducing waste and building community.
          </p>
        </div>
      </section>

      {/* For Donors */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For Food Donors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Restaurants, Hotels, Residents, and Caterers can donate surplus
              food in 3 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <Utensils className="h-10 w-10 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                List Your Food
              </h3>
              <p className="text-gray-600">
                Fill in details about your surplus food: name, quantity,
                description, and pickup location.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <Clock className="h-10 w-10 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Set Time Seal
              </h3>
              <p className="text-gray-600">
                Add a "best before" time to ensure food safety and let receivers
                know when to pick up.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <CheckCircle className="h-10 w-10 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Connect & Share
              </h3>
              <p className="text-gray-600">
                Your listing goes live! Receivers can request pickup or
                delivery, and you'll be notified.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/donate"
              className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all"
            >
              Start Donating Food
            </Link>
          </div>
        </div>
      </section>

      {/* For Receivers */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For Food Receivers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find fresh food near you and choose how to get it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <Search className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Browse Listings
              </h3>
              <p className="text-gray-600">
                Search and filter available food by location, type, and time.
                See what's available near you!
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <MapPin className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Choose Pickup Method
              </h3>
              <p className="text-gray-600">
                For nearby locations (≤2 km): FREE self-pickup. For farther
                places: Request delivery with minimal charges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Food
              </h3>
              <p className="text-gray-600">
                Pick up the food yourself or wait for a delivery partner to
                bring it to you. Enjoy fresh meals!
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/browse"
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all"
            >
              Browse Available Food
            </Link>
          </div>
        </div>
      </section>

      {/* Pickup vs Delivery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pickup vs Delivery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose what works best for you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Self Pickup */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-4 border-green-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-500 p-4 rounded-full">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Self Pickup
                  </h3>
                  <p className="text-green-700 font-semibold">
                    FREE for nearby places
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Distance:</strong> Within 2 km radius
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Cost:</strong> Completely FREE
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Speed:</strong> Immediate pickup possible
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Best for:</strong> Nearby donors, quick access
                  </span>
                </li>
              </ul>
            </div>

            {/* Delivery */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-4 border-purple-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-500 p-4 rounded-full">
                  <Bike className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Delivery</h3>
                  <p className="text-purple-700 font-semibold">
                    Minimal charges apply
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Distance:</strong> For locations beyond 2 km
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Cost:</strong> Minimal delivery fee based on
                    distance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Speed:</strong> Delivery partner assigned quickly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Best for:</strong> Distant locations, convenience
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Food Waste Management Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every year, millions of tons of food are wasted while many go
              hungry. Together, we can change this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingDown className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Reduce Waste
              </h3>
              <p className="text-gray-600">
                Prevent perfectly good food from ending up in landfills and
                contributing to environmental damage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Help Communities
              </h3>
              <p className="text-gray-600">
                Connect surplus food with people and organizations that need it,
                building stronger communities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Make Impact
              </h3>
              <p className="text-gray-600">
                Every meal shared makes a difference. Be part of the solution to
                food insecurity and waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-green-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of users making a difference in food waste management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Donate Food
            </Link>
            <Link
              to="/browse"
              className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-800 transition-colors border-2 border-white"
            >
              Browse Food
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
