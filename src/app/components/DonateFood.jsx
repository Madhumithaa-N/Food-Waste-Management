import { useState } from "react";
import { Plus, Upload, Clock, MapPin, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createFoodItem, uploadImage, getToken } from "../../api";

export function DonateFood() {
  const navigate = useNavigate();
  const token    = getToken();          // ← only declared ONCE here

  const [formData, setFormData] = useState({
    title            : "",
    description      : "",
    original_price   : "",
    discounted_price : "",
    expiry_time      : "",
    food_type        : "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login as a vendor first!");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image for your listing.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload image
      toast.info("Uploading image...");
      const uploadResult = await uploadImage(imageFile, token);

      if (!uploadResult.image_url) {
        toast.error("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }

      // Step 2: Create food listing
      const listingData = {
        ...formData,
        image_url        : uploadResult.image_url,
        original_price   : parseFloat(formData.original_price),
        discounted_price : parseFloat(formData.discounted_price),
      };

      const result = await createFoodItem(listingData, token);

      if (result.foodItemId) {
        toast.success("Food donation listed successfully! 🎉", {
          description: "Your food will now be visible to those in need.",
        });
        setFormData({
          title: "", description: "", original_price: "",
          discounted_price: "", expiry_time: "", food_type: "",
        });
        setImageFile(null);
      } else {
        toast.error(result.message || "Failed to create listing.");
      }

    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-green-500 p-4 rounded-full mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Donate Food</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have surplus food? Share it with those who need it!
          </p>
        </div>

        {/* ── NOT LOGGED IN — show button instead of form ── */}
        {!token ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <p className="text-yellow-800 font-medium text-lg mb-4">
              ⚠️ You need to be logged in as a vendor to post food listings.
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-green-600 to-orange-500 text-white px-8 py-3"
            >
              Login / Register as Vendor
            </Button>
          </div>
        ) : (
          /* ── LOGGED IN — show the form ── */
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Food Name */}
              <div>
                <Label htmlFor="title" className="text-gray-700">Food Name</Label>
                <div className="relative mt-2">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Vegetable Biryani, Sandwich Platter"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the food, ingredients, dietary info, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2"
                  rows={4}
                  required
                />
              </div>

              {/* Prices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="original_price" className="text-gray-700">
                    Original Price (₹)
                  </Label>
                  <Input
                    id="original_price"
                    type="number"
                    placeholder="e.g., 200"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="discounted_price" className="text-gray-700">
                    Discounted Price (₹)
                  </Label>
                  <Input
                    id="discounted_price"
                    type="number"
                    placeholder="e.g., 80"
                    value={formData.discounted_price}
                    onChange={(e) => setFormData({ ...formData, discounted_price: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              {/* Expiry Time + Food Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="expiry_time" className="text-gray-700">
                    Best Before (Time)
                  </Label>
                  <div className="relative mt-2">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="expiry_time"
                      type="datetime-local"
                      value={formData.expiry_time}
                      onChange={(e) => setFormData({ ...formData, expiry_time: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="food_type" className="text-gray-700">Food Type</Label>
                  <Select
                    value={formData.food_type}
                    onValueChange={(value) => setFormData({ ...formData, food_type: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Veg">Veg</SelectItem>
                      <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="image" className="text-gray-700">Food Photo</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    {imageFile ? (
                      <span className="text-green-600 font-medium">
                        ✅ {imageFile.name}
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Click to upload a photo of your food
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white py-6"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Uploading & Listing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      List Food Donation
                    </span>
                  )}
                </Button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}