import { useState, useEffect } from "react";
import { Search, Clock, MapPin, Package, User, Bike, MapPinned } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getFoodItems } from "../../api";

export function BrowseFood() {
  const [searchQuery, setSearchQuery]       = useState("");
  const [sortBy, setSortBy]                 = useState("distance");
  const [listings, setListings]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [userLocation, setUserLocation]     = useState(null);

  // Get user location and fetch real food items
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          const result = await getFoodItems(latitude, longitude);
          if (result.data) {
            setListings(result.data);
          } else {
            toast.error("Failed to load food listings.");
          }
        } catch (err) {
          toast.error("Could not connect to server.");
        } finally {
          setLoading(false);
        }
      },
      // If user denies location, use default (your city center)
      async () => {
        toast.warning("Location access denied. Showing default area.");
        try {
          const result = await getFoodItems(12.9716, 77.5946);
          if (result.data) setListings(result.data);
        } catch (err) {
          toast.error("Could not connect to server.");
        } finally {
          setLoading(false);
        }
      }
    );
  }, []);

 const handleRequestFood = async (food, type) => {
  if (type === "pickup") {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/food-items/${food.id}/status`,
        {
          method : "PATCH",
          headers: { "Content-Type": "application/json" },
          body   : JSON.stringify({ status: "claimed" }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        // Remove claimed item from UI instantly
        setListings((prev) => prev.filter((item) => item.id !== food.id));
        toast.success("Pickup confirmed! 🎉", {
          description: `Head to ${food.vendor_address} to collect ${food.title}`,
        });
      } else {
        toast.error(data.message || "Could not claim item.");
      }
    } catch (err) {
      toast.error("Could not connect to server.");
    }

  } else {
    toast.success("Delivery request sent! 🚴", {
      description: `A delivery partner will bring ${food.title} to you.`,
    });
  }
};

  // Filter and sort
  let filteredListings = listings.filter((food) => {
    return (
      searchQuery === "" ||
      food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (sortBy === "distance") {
    filteredListings = [...filteredListings].sort((a, b) => a.distance_km - b.distance_km);
  } else if (sortBy === "time") {
    filteredListings = [...filteredListings].sort(
      (a, b) => new Date(a.expiry_time) - new Date(b.expiry_time)
    );
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit",
    });
  };

  // ── Loading state ────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Finding food near you...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-green-500" />
              {userLocation
                ? `Showing within 5km of you`
                : `Using default location`}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-gray-700">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "distance" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("distance")}
                className={sortBy === "distance" ? "bg-gradient-to-r from-green-600 to-purple-600" : ""}
              >
                Distance
              </Button>
              <Button
                variant={sortBy === "time" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("time")}
                className={sortBy === "time" ? "bg-gradient-to-r from-green-600 to-purple-600" : ""}
              >
                Expiry Time
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold">{filteredListings.length}</span> food listings
          </p>
        </div>

        {/* Food Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredListings.map((food) => {
            const isNearby = food.distance_km <= 2;
            return (
              <div key={food.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">

                {/* Image */}
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={food.image_url}
                    alt={food.title}
                    className="w-full h-full object-cover"
                  />
                  {isNearby && (
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      Nearby
                    </Badge>
                  )}
                  <Badge className="absolute top-4 left-4 bg-white text-gray-700">
                    {food.food_type}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {food.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{food.vendor_name}</span>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="text-green-600 font-bold text-lg">
                        ₹{food.discounted_price}
                      </p>
                      <p className="text-gray-400 text-sm line-through">
                        ₹{food.original_price}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>Expires: {formatTime(food.expiry_time)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>{food.vendor_address} • {food.distance_km} km away</span>
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
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          <Bike className="h-4 w-4 mr-2" />
                          Request Delivery
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block bg-gray-100 p-8 rounded-full mb-4">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No food found nearby</h3>
            <p className="text-gray-600">Try adjusting your search or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
}