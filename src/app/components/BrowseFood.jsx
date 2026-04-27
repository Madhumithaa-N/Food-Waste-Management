import { useState, useEffect } from "react";
import { Search, Clock, MapPin, Package, User, Bike, MapPinned, X, Navigation } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getFoodItems } from "../../api";

export function BrowseFood() {
  const [searchQuery, setSearchQuery]   = useState("");
  const [sortBy, setSortBy]             = useState("distance");
  const [listings, setListings]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null); // for modal
  const [claiming, setClaiming]         = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        try {
          const result = await getFoodItems(latitude, longitude);
          if (result.data) setListings(result.data);
        } catch { toast.error("Could not connect to server."); }
        finally { setLoading(false); }
      },
      async () => {
        toast.warning("Location access denied. Showing default area.");
        try {
          const result = await getFoodItems(12.9716, 77.5946);
          if (result.data) setListings(result.data);
        } catch { toast.error("Could not connect to server."); }
        finally { setLoading(false); }
      }
    );
  }, []);

  const handleClaim = async (food) => {
    setClaiming(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/food-items/${food.id}/claim`,
        {
          method : "PATCH",
          headers: { "Content-Type": "application/json" },
          body   : JSON.stringify({ status: "claimed" }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setListings((prev) => prev.filter((item) => item.id !== food.id));
        setSelectedFood({ ...food, claimed: true });
        toast.success("Item claimed successfully!");
      } else {
        toast.error(data.message || "Could not claim item.");
        setSelectedFood(null);
      }
    } catch {
      toast.error("Could not connect to server.");
    } finally {
      setClaiming(false);
    }
  };

  const openDirections = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  let filteredListings = listings.filter((food) =>
    searchQuery === "" ||
    food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortBy === "distance") {
    filteredListings = [...filteredListings].sort((a, b) => a.distance_km - b.distance_km);
  } else {
    filteredListings = [...filteredListings].sort(
      (a, b) => new Date(a.expiry_time) - new Date(b.expiry_time)
    );
  }

  const formatTime = (d) => new Date(d).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit"
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Finding food near you...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-500 to-purple-500 p-4 rounded-full mb-4">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Available Food</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find fresh food near you. Pick it up yourself or request delivery!
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-green-500" />
              {userLocation ? "Showing within 5km of you" : "Using default location"}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-gray-700">Sort by:</span>
            <div className="flex gap-2">
              {["distance", "time"].map((s) => (
                <Button
                  key={s}
                  variant={sortBy === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(s)}
                  className={sortBy === s ? "bg-gradient-to-r from-green-600 to-purple-600" : ""}
                >
                  {s === "distance" ? "Distance" : "Expiry Time"}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold">{filteredListings.length}</span> food listings
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredListings.map((food) => {
            const isNearby = food.distance_km <= 2;
            return (
              <div key={food.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback src={food.image_url} alt={food.title} className="w-full h-full object-cover" />
                  {isNearby && <Badge className="absolute top-4 right-4 bg-green-500">Nearby</Badge>}
                  <Badge className="absolute top-4 left-4 bg-white text-gray-700">{food.food_type}</Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{food.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{food.vendor_name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-bold text-lg">₹{food.discounted_price}</p>
                      <p className="text-gray-400 text-sm line-through">₹{food.original_price}</p>
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
                  <p className="text-gray-600 mb-4 line-clamp-2">{food.description}</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setSelectedFood(food)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700"
                    >
                      <MapPinned className="h-4 w-4 mr-2" />
                      Self Pickup {isNearby ? "(Free)" : ""}
                    </Button>
                    <Button
                      onClick={() => toast.info("Delivery feature coming soon!")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Bike className="h-4 w-4 mr-2" />
                      Delivery
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No food found nearby</h3>
            <p className="text-gray-600">Check back later!</p>
          </div>
        )}
      </div>

      {/* ── PICKUP CONFIRMATION MODAL ── */}
      {selectedFood && (
        <div
          style={{ minHeight: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
          className="fixed inset-0 z-50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedFood(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

            {selectedFood.claimed ? (
              /* ── SUCCESS STATE ── */
              <>
                <div className="text-center mb-6">
                  <div className="inline-block bg-green-100 p-4 rounded-full mb-3">
                    <MapPinned className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">You're all set!</h2>
                  <p className="text-gray-500">Head over to pick up your food</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Food item</p>
                    <p className="font-semibold text-gray-900">{selectedFood.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Vendor</p>
                    <p className="font-semibold text-gray-900">{selectedFood.vendor_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Pickup address</p>
                    <p className="font-semibold text-gray-900">{selectedFood.vendor_address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Pay at pickup</p>
                    <p className="font-bold text-green-600 text-lg">₹{selectedFood.discounted_price}</p>
                  </div>
                </div>
                <Button
                  onClick={() => openDirections(selectedFood.vendor_address)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white mb-3"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions on Google Maps
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFood(null)}
                  className="w-full"
                >
                  Done
                </Button>
              </>
            ) : (
              /* ── CONFIRM STATE ── */
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900">Confirm Pickup</h2>
                  <button onClick={() => setSelectedFood(null)}>
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                <div className="flex gap-4 mb-5">
                  <img
                    src={selectedFood.image_url}
                    alt={selectedFood.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedFood.title}</h3>
                    <p className="text-gray-500 text-sm">{selectedFood.vendor_name}</p>
                    <p className="text-green-600 font-bold mt-1">₹{selectedFood.discounted_price}
                      <span className="text-gray-400 text-xs font-normal line-through ml-2">
                        ₹{selectedFood.original_price}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Pickup from</p>
                      <p className="text-sm font-medium text-gray-900">{selectedFood.vendor_address}</p>
                      <p className="text-xs text-gray-400">{selectedFood.distance_km} km away</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Pick up before</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedFood.expiry_time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleClaim(selectedFood)}
                  disabled={claiming}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 mb-3"
                >
                  {claiming ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Confirming...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4" />
                      Confirm Pickup
                    </span>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setSelectedFood(null)} className="w-full">
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}