import { useState } from "react";
import { Plus, Upload, Clock, MapPin, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

export function DonateFood() {
  const [formData, setFormData] = useState({
    donorType: "",
    foodName: "",
    quantity: "",
    description: "",
    expiryTime: "",
    location: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, this would send to backend
    toast.success("Food donation listed successfully! 🎉", {
      description: "Your food will now be visible to those in need.",
    });
    setFormData({
      donorType: "",
      foodName: "",
      quantity: "",
      description: "",
      expiryTime: "",
      location: "",
      address: "",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-green-500 p-4 rounded-full mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Donate Food
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have surplus food? Share it with those who need it. Every
            contribution makes a difference!
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Type */}
            <div>
              <Label htmlFor="donorType" className="text-gray-700">
                I am a
              </Label>
              <Select
                value={formData.donorType}
                onValueChange={(value) =>
                  setFormData({ ...formData, donorType: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select donor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="resident">Resident</SelectItem>
                  <SelectItem value="caterer">Caterer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Food Name */}
            <div>
              <Label htmlFor="foodName" className="text-gray-700">
                Food Name
              </Label>
              <div className="relative mt-2">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="foodName"
                  type="text"
                  placeholder="e.g., Vegetable Biryani, Sandwich Platter"
                  value={formData.foodName}
                  onChange={(e) =>
                    setFormData({ ...formData, foodName: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" className="text-gray-700">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="text"
                placeholder="e.g., 20 servings, 5 kg"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="mt-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Provide details about the food, ingredients, dietary info (veg/non-veg), etc."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-2"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Best Before Time */}
              <div>
                <Label htmlFor="expiryTime" className="text-gray-700">
                  Best Before (Time)
                </Label>
                <div className="relative mt-2">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="expiryTime"
                    type="datetime-local"
                    value={formData.expiryTime}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryTime: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Location/Area */}
              <div>
                <Label htmlFor="location" className="text-gray-700">
                  Area/Locality
                </Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Downtown, North Street"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Full Address */}
            <div>
              <Label htmlFor="address" className="text-gray-700">
                Pickup Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter full pickup address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="mt-2"
                rows={2}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white py-6"
              >
                <Upload className="h-5 w-5 mr-2" />
                List Food Donation
              </Button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
            <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Time Sealed</h3>
            <p className="text-gray-600">
              Set expiry times to ensure food safety
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Local Pickup</h3>
            <p className="text-gray-600">
              Connect with nearby people for quick pickup
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Easy Tracking</h3>
            <p className="text-gray-600">
              Monitor who picks up your donations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
