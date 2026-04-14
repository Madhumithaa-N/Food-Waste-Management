import { useState } from "react";
import {
  Search,
  Clock,
  MapPin,
  Package,
  User,
  Bike,
  MapPinned,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Mock data for food listings
const mockFoodListings = [
  {
    id: 1,
    donorType: "Restaurant",
    donorName: "Green Garden Restaurant",
    foodName: "Vegetable Biryani",
    quantity: "20 servings",
    description:
      "Fresh vegetable biryani prepared today. Contains rice, mixed vegetables, and aromatic spices. Vegetarian.",
    bestBefore: "2026-04-07T20:00",
    location: "Downtown",
    address: "123 Main Street, Downtown",
    distance: 0.5,
    image:
      "https://images.unsplash.com/photo-1625944527261-06c90f1901e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZnJlc2glMjBtZWFscyUyMHByZXBhcmVkfGVufDF8fHx8MTc3NTU3MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    donorType: "Hotel",
    donorName: "Grand Plaza Hotel",
    foodName: "Mixed Buffet Items",
    quantity: "50 servings",
    description:
      "Buffet leftovers from our evening event. Includes pasta, salads, bread rolls, and desserts. Mixed veg and non-veg.",
    bestBefore: "2026-04-07T22:00",
    location: "North District",
    address: "45 Hotel Avenue, North District",
    distance: 3.2,
    image:
      "https://images.unsplash.com/photo-1593113616828-6f22bca04804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjb21tdW5pdHklMjBraXRjaGVufGVufDF8fHx8MTc3NTU3MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    donorType: "Resident",
    donorName: "Sarah M.",
    foodName: "Homemade Sandwiches",
    quantity: "10 sandwiches",
    description:
      "Fresh sandwiches made this morning for a party that got canceled. Vegetarian options with cheese, tomatoes, and lettuce.",
    bestBefore: "2026-04-07T18:00",
    location: "East Side",
    address: "789 Maple Road, East Side",
    distance: 1.8,
    image:
      "https://images.unsplash.com/photo-1625944527261-06c90f1901e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZnJlc2glMjBtZWFscyUyMHByZXBhcmVkfGVufDF8fHx8MTc3NTU3MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    donorType: "Caterer",
    donorName: "Delicious Events Catering",
    foodName: "Wedding Reception Leftovers",
    quantity: "100 servings",
    description:
      "High-quality catered food from a wedding. Includes chicken curry, rice, naan, salads, and sweets. Mostly non-vegetarian with some veg options.",
    bestBefore: "2026-04-07T23:00",
    location: "West End",
    address: "321 Event Plaza, West End",
    distance: 5.5,
    image:
      "https://images.unsplash.com/photo-1593113616828-6f22bca04804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjb21tdW5pdHklMjBraXRjaGVufGVufDF8fHx8MTc3NTU3MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    donorType: "Restaurant",
    donorName: "Pizza Paradise",
    foodName: "Assorted Pizzas",
    quantity: "15 large pizzas",
    description:
      "End of day pizzas. Various flavors including margherita, pepperoni, and veggie supreme. All fresh and hot.",
    bestBefore: "2026-04-07T21:00",
    location: "Downtown",
    address: "567 Pizza Lane, Downtown",
    distance: 0.8,
    image:
      "https://images.unsplash.com/photo-1625944527261-06c90f1901e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZnJlc2glMjBtZWFscyUyMHByZXBhcmVkfGVufDF8fHx8MTc3NTU3MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    donorType: "Hotel",
    donorName: "Sunrise Inn",
    foodName: "Breakfast Items",
    quantity: "30 servings",
    description:
      "Surplus breakfast items including pancakes, eggs, toast, fruits, and juices. Must be picked up soon.",
    bestBefore: "2026-04-07T17:00",
    location: "South Harbor",
    address: "890 Harbor View, South Harbor",
    distance: 4.2,
    image:
      "https://images.unsplash.com/photo-1593113616828-6f22bca04804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjb21tdW5pdHklMjBraXRjaGVufGVufDF8fHx8MTc3NTU3MTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function BrowseFood() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("distance");

  const handleRequestFood = (food, type) => {
    if (type === "pickup") {
      toast.success("Pickup request sent! 🎉", {
        description: `You can pick up ${food.foodName} from ${food.location}`,
      });
    } else {
      toast.success("Delivery request sent! 🚴", {
        description: `A delivery partner will bring ${food.foodName} to you. Minimal delivery charge applies.`,
      });
    }
  };

  // Filter and sort listings
  let filteredListings = mockFoodListings.filter((food) => {
    const matchesSearch =
      searchQuery === "" ||
      food.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      filterLocation === "all" || food.location === filterLocation;

    return matchesSearch && matchesLocation;
  });

  if (sortBy === "distance") {
    filteredListings = [...filteredListings].sort(
      (a, b) => a.distance - b.distance
    );
  } else if (sortBy === "time") {
    filteredListings = [...filteredListings].sort(
      (a, b) =>
        new Date(a.bestBefore).getTime() - new Date(b.bestBefore).getTime()
    );
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-500 to-purple-500 p-4 rounded-full mb-4">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Available Food
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find fresh food near you. Pick it up yourself or request delivery!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="North District">North District</SelectItem>
                  <SelectItem value="East Side">East Side</SelectItem>
                  <SelectItem value="West End">West End</SelectItem>
                  <SelectItem value="South Harbor">South Harbor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-gray-700">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "distance" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("distance")}
                className={
                  sortBy === "distance"
                    ? "bg-gradient-to-r from-green-600 to-purple-600"
                    : ""
                }
              >
                Distance
              </Button>
              <Button
                variant={sortBy === "time" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("time")}
                className={
                  sortBy === "time"
                    ? "bg-gradient-to-r from-green-600 to-purple-600"
                    : ""
                }
              >
                Time
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold">{filteredListings.length}</span>{" "}
            food listings
          </p>
        </div>

        {/* Food Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredListings.map((food) => {
            const isNearby = food.distance <= 2;
            return (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={food.image}
                    alt={food.foodName}
                    className="w-full h-full object-cover"
                  />
                  {isNearby && (
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      Nearby
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {food.foodName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>
                          {food.donorName} • {food.donorType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="h-4 w-4 text-orange-500" />
                      <span>{food.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>Best before: {formatTime(food.bestBefore)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>
                        {food.location} • {food.distance} km away
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {food.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {isNearby ? (
                      <Button
                        onClick={() => handleRequestFood(food, "pickup")}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      >
                        <MapPinned className="h-4 w-4 mr-2" />
                        Self Pickup (Free)
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleRequestFood(food, "pickup")}
                          variant="outline"
                          className="flex-1"
                        >
                          <MapPinned className="h-4 w-4 mr-2" />
                          Self Pickup
                        </Button>
                        <Button
                          onClick={() => handleRequestFood(food, "delivery")}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Bike className="h-4 w-4 mr-2" />
                          Request Delivery
                        </Button>
                      </>
                    )}
                  </div>

                  {!isNearby && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      💰 Minimal delivery charges apply for distant locations
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block bg-gray-100 p-8 rounded-full mb-4">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No food found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
