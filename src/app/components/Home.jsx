import { Link } from "react-router-dom";
import {
  Utensils,
  Users,
  Clock,
  MapPin,
  TrendingDown,
  Heart,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Reducing Food Waste, Feeding Communities
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Every Meal Matters,{" "}
                <span className="text-green-600">Zero Waste</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
                Connect surplus food from hotels, restaurants, and homes with
                people who need it most. Track, share, and make an impact — one
                meal at a time.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Donate Food
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  Find Food Near You
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Utensils className="h-5 w-5 text-orange-500" />
                    <span className="text-3xl font-bold text-gray-900">
                      2,847
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Meals Rescued</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-5 w-5 text-green-500" />
                    <span className="text-3xl font-bold text-gray-900">186</span>
                  </div>
                  <p className="text-sm text-gray-600">Active Donors</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-5 w-5 text-pink-500" />
                    <span className="text-3xl font-bold text-gray-900">
                      1,420
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">People Fed</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-5 w-5 text-purple-500" />
                    <span className="text-3xl font-bold text-gray-900">
                      47 kg
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Saved Today</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1687184412163-09d005f5caa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGhlYWx0aHklMjBmb29kJTIwYm93bHMlMjBvdmVyaGVhZHxlbnwxfHx8fDE3NzU1NzE2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fresh colorful food bowls with vegetables"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to reduce food waste and help your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. List Food
              </h3>
              <p className="text-gray-600 mb-4">
                Restaurants, hotels, and residents can list surplus food with
                time seals and descriptions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Choose Pickup
              </h3>
              <p className="text-gray-600 mb-4">
                Browse available food nearby. Self-pickup is free for locations
                close by.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. Get It Fresh
              </h3>
              <p className="text-gray-600 mb-4">
                Pick up yourself or request delivery (minimal charges for
                distant locations).
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-green-700 transition-all shadow-lg"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who Can Participate */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who Can Participate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everyone has a role in reducing food waste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl hover:scale-105 transition-transform shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Restaurants
              </h3>
              <p className="text-gray-600">
                Share your surplus prepared meals
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl hover:scale-105 transition-transform shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hotels</h3>
              <p className="text-gray-600">
                Donate buffet and event leftovers
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl hover:scale-105 transition-transform shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Residents
              </h3>
              <p className="text-gray-600">Share homemade food with neighbors</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl hover:scale-105 transition-transform shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Caterers
              </h3>
              <p className="text-gray-600">Donate post-event food surplus</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Join the Movement Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Together, we can make a difference in fighting food waste and
            helping our community. Start now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
            >
              Donate Food
            </Link>
            <Link
              to="/browse"
              className="bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-800 transition-colors border-2 border-white shadow-lg"
            >
              Browse Food
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
