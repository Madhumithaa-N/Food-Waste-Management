import { useState, useEffect } from "react";
import { Store, Package, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getToken, getVendorInfo, getMyListings, updateFoodStatus } from "../../api";

export function VendorDashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();
  const token                 = getToken();
  const vendor                = getVendorInfo();

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const result = await getMyListings(token);
      if (result.stats) {
        setData(result);
      } else {
        toast.error("Failed to load listings.");
      }
    } catch (err) {
      toast.error("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const result = await updateFoodStatus(itemId, newStatus, token);
      if (result.message) {
        toast.success(`Status updated to ${newStatus}!`);
        fetchListings(); // Refresh list
      } else {
        toast.error(result.message || "Update failed.");
      }
    } catch (err) {
      toast.error("Could not update status.");
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "claimed"  : return "bg-blue-100 text-blue-800";
      case "expired"  : return "bg-red-100 text-red-800";
      default         : return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-green-500 to-orange-500 p-3 rounded-xl">
              <Store className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {vendor?.name}
              </h1>
              <p className="text-gray-500 text-sm">{vendor?.email}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/donate")}
            className="bg-gradient-to-r from-orange-500 to-green-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Listing
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-5 w-5 text-gray-500" />
              <span className="text-gray-500 text-sm">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {data?.stats.total}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-gray-500 text-sm">Available</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {data?.stats.available}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="text-gray-500 text-sm">Claimed</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {data?.stats.claimed}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <span className="text-gray-500 text-sm">Expired</span>
            </div>
            <p className="text-3xl font-bold text-red-400">
              {data?.stats.expired}
            </p>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Food Listings
            </h2>
          </div>

          {data?.listings.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No listings yet.</p>
              <Button
                onClick={() => navigate("/donate")}
                className="mt-4 bg-gradient-to-r from-orange-500 to-green-600 text-white"
              >
                Post Your First Listing
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data?.listings.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      {/* Item */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                            <p className="text-gray-400 text-xs line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      {/* Food Type */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{item.food_type}</span>
                      </td>
                      {/* Price */}
                      <td className="px-6 py-4">
                        <p className="text-green-600 font-medium text-sm">₹{item.discounted_price}</p>
                        <p className="text-gray-400 text-xs line-through">₹{item.original_price}</p>
                      </td>
                      {/* Expiry */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(item.expiry_time)}
                        </span>
                      </td>
                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      {/* Action */}
                      <td className="px-6 py-4">
                        <Select
                          value={item.status}
                          onValueChange={(val) => handleStatusChange(item.id, val)}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="claimed">Claimed</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}