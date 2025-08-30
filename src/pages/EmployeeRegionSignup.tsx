// src/pages/EmployeeRegionSignup.tsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, MapPin, Eye, EyeOff } from "lucide-react";

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const INDIAN_CITIES = [
  "Bengaluru",
  "Chikkamagaluru",
  "Mysuru",
  "Mangalore",
  "Hyderabad",
  "Chennai",
  "Delhi",
  "Mumbai",
  "Kolkata",
];

function makeRegionLabel(params: { region?: string; country?: string; city?: string }) {
  if (params.city && params.country) {
    return `${params.city.replace(/-/g, " ")}, ${params.country.toUpperCase()}`;
  }
  if (params.region) {
    return params.region.replace(/-/g, " ");
  }
  return "unknown";
}

function isSupported(params: { region?: string; country?: string; city?: string }) {
  if (params.country && params.city) {
    if (slug(params.country) !== "india") return false;
    return INDIAN_CITIES.map(slug).includes(slug(params.city));
  }
  if (params.region) {
    // Allow direct /employee-signup/bengaluru etc.
    return INDIAN_CITIES.map(slug).includes(slug(params.region));
  }
  return false;
}

const EmployeeRegionSignup: React.FC = () => {
  const { region, country, city } = useParams();
  const navigate = useNavigate();

  const regionDisplay = useMemo(
    () => makeRegionLabel({ region, country, city }),
    [region, country, city]
  );
  const validRegion = useMemo(
    () => isSupported({ region, country, city }),
    [region, country, city]
  );

  const canonicalPath =
    country && city
      ? `/employee-login/${slug(country)}/${slug(city)}`
      : region
      ? `/employee-login/${slug(region)}`
      : "/employee-login";

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple password “strength” check
  const passwordStrong =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validRegion) {
      setError("Selected region is not supported.");
      return;
    }
    if (!passwordStrong) {
      setError("Password must be 8+ chars with upper, lower, number.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!fullName || !email || !empId) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with your signup API
      await new Promise((r) => setTimeout(r, 800));
      // After successful signup, send them to login for this region
      navigate(canonicalPath);
    } catch (e) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              Region:&nbsp;
              <span className="font-medium capitalize">{regionDisplay}</span>
            </span>
          </div>
          <CardTitle className="mt-2">Employee Signup</CardTitle>
          <CardDescription>
            Create your account for the {validRegion ? "selected region" : "regional"} portal.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!validRegion && (
            <div className="mb-4 flex items-start gap-2 rounded-md border p-3 text-red-600">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <div className="text-sm">
                The selected region isn’t supported.{" "}
                <button
                  className="underline underline-offset-4"
                  onClick={() => navigate("/employee-signup/india/bengaluru")}
                >
                  Choose Bengaluru
                </button>
                .
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-md border p-3 text-red-600">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <div className="text-sm">{error}</div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@org.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="empId">Employee ID</Label>
              <Input
                id="empId"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                placeholder="EMP12345"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Department (optional)</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Operations"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9xxxxxxxxx"
                inputMode="tel"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className={`text-xs ${password ? (passwordStrong ? "text-green-600" : "text-orange-600") : "text-muted-foreground"}`}>
                Must be 8+ chars & include upper, lower, and a number.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Region is displayed, not editable here */}
            <div className="grid gap-2">
              <Label>Selected Region</Label>
              <Input value={regionDisplay} disabled />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={loading || !validRegion}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm">
          <span>
            Already have an account?{" "}
            <Link to={canonicalPath} className="underline underline-offset-4">
              Log in
            </Link>
          </span>
          <button
            className="underline underline-offset-4"
            onClick={() => navigate("/employee-signup/india/bengaluru")}
          >
            Switch region
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmployeeRegionSignup;
