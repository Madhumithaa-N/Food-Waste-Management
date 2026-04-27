import { useState } from "react";
import { Mail, Lock, MapPin, Store, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { loginVendor, registerVendor, saveToken } from "../../api";
import { useNavigate } from "react-router-dom";

export function VendorAuth() {
  const [mode, setMode]       = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const [loginData, setLoginData] = useState({
    email   : "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name    : "",
    email   : "",
    password: "",
    address : "",
    lat     : "",
    lng     : "",
  });

  // ── Get user's location automatically ───────────────────
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegisterData((prev) => ({
          ...prev,
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        }));
        toast.success("Location captured! ✅");
      },
      () => toast.error("Could not get location. Enter manually.")
    );
  };

  // ── Handle Login ─────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginVendor(loginData);
      if (result.token) {
        saveToken(result.token, result.vendor);
        toast.success(`Welcome back, ${result.vendor.name}! 🎉`);
        navigate("/donate");
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (err) {
      toast.error("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Register ──────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerData.lat || !registerData.lng) {
      toast.error("Please capture your location first!");
      return;
    }

    setLoading(true);
    try {
      const result = await registerVendor({
        name    : registerData.name,
        email   : registerData.email,
        password: registerData.password,
        address : registerData.address,
        lat     : parseFloat(registerData.lat),
        lng     : parseFloat(registerData.lng),
      });

      if (result.vendorId) {
        toast.success("Registered successfully! Please login. 🎉");
        setMode("login");
        setLoginData({ email: registerData.email, password: "" });
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-green-500 to-orange-500 p-4 rounded-full mb-4">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === "login" ? "Vendor Login" : "Register Your Shop"}
          </h1>
          <p className="text-gray-600 mt-2">
            {mode === "login"
              ? "Login to post your surplus food listings"
              : "Join us and start reducing food waste!"}
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "login"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "register"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* ── LOGIN FORM ── */}
        {mode === "login" && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Logging in...
                  </span>
                ) : "Login"}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-green-600 font-medium hover:underline"
                >
                  Register here
                </button>
              </p>
            </form>
          </div>
        )}

        {/* ── REGISTER FORM ── */}
        {mode === "register" && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleRegister} className="space-y-5">

              {/* Name */}
              <div>
                <Label htmlFor="name">Shop / Restaurant Name</Label>
                <div className="relative mt-2">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g., Main Street Bakery"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="reg-email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="reg-address">Shop Address</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="reg-address"
                    type="text"
                    placeholder="e.g., 123 Main Street, Downtown"
                    value={registerData.address}
                    onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <Label>Shop Location (for 5km filter)</Label>
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getLocation}
                    className="flex-1"
                  >
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    {registerData.lat
                      ? `📍 ${parseFloat(registerData.lat).toFixed(4)}, ${parseFloat(registerData.lng).toFixed(4)}`
                      : "Capture My Location"}
                  </Button>
                </div>
                {/* Manual fallback */}
                {!registerData.lat && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Latitude"
                      value={registerData.lat}
                      onChange={(e) => setRegisterData({ ...registerData, lat: e.target.value })}
                      step="any"
                    />
                    <Input
                      type="number"
                      placeholder="Longitude"
                      value={registerData.lng}
                      onChange={(e) => setRegisterData({ ...registerData, lng: e.target.value })}
                      step="any"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Registering...
                  </span>
                ) : "Create Account"}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-green-600 font-medium hover:underline"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}