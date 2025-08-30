// src/pages/EmployeeRegionLogin.tsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AlertCircle,
  InfoIcon,
  Lock,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // ← adjust if needed

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const supportedSingles = [
  "bengaluru",
  "chennai",
  "delhi",
  "mumbai",
  "kolkata",
  "hyderabad",
  "mysuru",
  "mangalore",
  "chikkamagaluru",
];

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

function makeRegionLabel(params: {
  region?: string;
  country?: string;
  city?: string;
}) {
  if (params.city && params.country) {
    return `${params.city.replace(/-/g, " ")}, ${params.country.toUpperCase()}`;
  }
  if (params.region) return params.region.replace(/-/g, " ");
  return "unknown";
}

function isSupported(params: {
  region?: string;
  country?: string;
  city?: string;
}) {
  // /employee-login/:country/:city
  if (params.country && params.city) {
    if (slug(params.country) !== "india") return false;
    const citySlug = slug(params.city);
    return INDIAN_CITIES.map(slug).includes(citySlug);
  }
  // /employee-login/:region
  if (params.region) return supportedSingles.includes(slug(params.region));
  return false;
}

const regionKey = (
  country?: string,
  city?: string,
  region?: string
): string =>
  country && city
    ? `${slug(country)}/${slug(city)}`
    : region
    ? slug(region)
    : "unknown";

// ──────────────────────────────────────────────────────────────────────────────
// Validation Schemas
// ──────────────────────────────────────────────────────────────────────────────
const phoneRegex = /^\+?[0-9]{10,15}$/;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type SignupFormValues = z.infer<typeof signupSchema>;

// ──────────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────────
const EmployeeRegionLogin: React.FC = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [globalMsg, setGlobalMsg] = useState<string | null>(null);
  const [globalState, setGlobalState] = useState<"info" | "error" | "success">(
    "info"
  );

  // Forms
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ────────────────────────────────────────────────────────────────────────────
  const onLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setGlobalMsg(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;

      const user = data.user;
      const metaRole = (user?.user_metadata as any)?.role;

      // Fallback to profiles.role if no metadata available
      let effectiveRole = metaRole;
      if (!effectiveRole && user?.id) {
        const { data: p, error: pErr } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (pErr) {
          console.warn("profiles fetch error:", pErr.message);
        }
        effectiveRole = p?.role;
      }

      if (effectiveRole !== "employee") {
        setGlobalState("error");
        setGlobalMsg(
          "This area is for employees. Please use the customer login."
        );
        await supabase.auth.signOut();
        return;
      }

      setGlobalState("success");
      setGlobalMsg("Signed in successfully!");
      if (data.session) console.log("Employee logged in:", data.user);

     navigate("/");

    } catch (e: any) {
      setGlobalState("error");
      setGlobalMsg(e?.message ?? "Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    setGlobalMsg(null);
    try {
      const role = "employee";
      const regionSlug = regionKey(country, city, region);

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            role, // store on auth.users as user_metadata.role
            full_name: values.name,
            phone: values.phone,
            region: regionSlug,
          },
          // emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;

      // Mirror role/region into app table for RLS-friendly joins
      const userId = data.user?.id;
      if (userId) {
        const { error: upsertErr } = await supabase.from("profiles").upsert(
          {
            id: userId,
            full_name: values.name,
            phone: values.phone,
            role, // 'employee'
            region: regionSlug,
          },
          { onConflict: "id" }
        );
        if (upsertErr) {
          // Not fatal for auth, but log for visibility
          console.warn("profiles upsert error:", upsertErr.message);
        }
      }

      if (data.user && !data.session) {
        setGlobalState("success");
        setGlobalMsg(
          "Account created! Check your email to confirm before logging in."
        );
        return;
      }

      if (data.session) {
        setGlobalState("success");
        setGlobalMsg("Account created! Redirecting…");
        navigate(`${canonicalPath}/dashboard`);
      }
    } catch (e: any) {
      setGlobalState("error");
      setGlobalMsg(e?.message ?? "Unexpected error during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // UI
  // ────────────────────────────────────────────────────────────────────────────
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
          <CardTitle className="mt-2">Employee Access</CardTitle>
          <CardDescription>
            Sign in to your regional dashboard or create an account.
          </CardDescription>
        </CardHeader>

        {!validRegion && (
          <CardContent>
            <div className="flex items-start gap-2 rounded-md border p-3 text-red-600">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <div className="text-sm">
                The selected region isn’t supported.{" "}
                <button
                  className="underline underline-offset-4"
                  onClick={() =>
                    navigate("/employee-login/india/bengaluru")
                  }
                >
                  Go to Bengaluru login
                </button>
                .
              </div>
            </div>
          </CardContent>
        )}

        {globalMsg && (
          <CardContent className="pt-0">
            <Alert
              variant={globalState === "error" ? "destructive" : "default"}
              className="mb-2"
            >
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>{globalMsg}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login" className="space-y-4 mt-6">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLogin)}
                  className="space-y-4"
                >
                  <div className="grid gap-2">
                    <Label>Selected Region</Label>
                    <Input value={regionDisplay} disabled />
                  </div>

                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="you@org.com"
                              className="pl-10"
                              autoComplete="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              autoComplete="current-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={!validRegion || isLoading}
                  >
                    {isLoading ? "Signing in…" : "Sign In"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* SIGN UP */}
            <TabsContent value="signup" className="space-y-4 mt-6">
              <Form {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(onSignup)}
                  className="space-y-4"
                >
                  <div className="grid gap-2">
                    <Label>Selected Region</Label>
                    <Input value={regionDisplay} disabled />
                  </div>

                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter your full name"
                              className="pl-10"
                              autoComplete="name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter your email"
                              className="pl-10"
                              autoComplete="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="e.g. +911234567890"
                              className="pl-10"
                              autoComplete="tel"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="Create a password"
                              className="pl-10"
                              autoComplete="new-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              className="pl-10"
                              autoComplete="new-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={!validRegion || isLoading}>
                    {isLoading ? "Creating account…" : "Create Account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="underline underline-offset-4">
            Forgot password?
          </Link>
          <Link to="/login" className="underline underline-offset-4">
            Customer login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmployeeRegionLogin;

// src/pages/EmployeeRegionLogin.tsx
// src/pages/EmployeeRegionLogin.tsx
// import React, { useMemo, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { AlertCircle, InfoIcon, Lock, Mail, MapPin, Phone, User as UserIcon } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient"; // ← adjust if needed

// // ---- Helpers ----
// const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// const supportedSingles = [
//   "bengaluru","chennai","delhi","mumbai","kolkata","hyderabad","mysuru","mangalore","chikkamagaluru",
// ];

// const INDIAN_CITIES = [
//   "Bengaluru","Chikkamagaluru","Mysuru","Mangalore","Hyderabad","Chennai","Delhi","Mumbai","Kolkata",
// ];

// function makeRegionLabel(params: { region?: string; country?: string; city?: string }) {
//   if (params.city && params.country) {
//     return `${params.city.replace(/-/g, " ")}, ${params.country.toUpperCase()}`;
//   }
//   if (params.region) return params.region.replace(/-/g, " ");
//   return "unknown";
// }

// function isSupported(params: { region?: string; country?: string; city?: string }) {
//   if (params.country && params.city) {
//     if (slug(params.country) !== "india") return false;
//     const citySlug = slug(params.city);
//     return INDIAN_CITIES.map(slug).includes(citySlug);
//   }
//   if (params.region) return supportedSingles.includes(slug(params.region));
//   return false;
// }

// // ---- Validation Schemas (same style as your main Login page) ----
// const phoneRegex = /^\+?[0-9]{10,15}$/;

// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });
// type LoginFormValues = z.infer<typeof loginSchema>;

// const signupSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email address"),
//     phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((d) => d.password === d.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });
// type SignupFormValues = z.infer<typeof signupSchema>;

// const EmployeeRegionLogin: React.FC = () => {
//   const { region, country, city } = useParams();
//   const navigate = useNavigate();

//   const regionDisplay = useMemo(
//     () => makeRegionLabel({ region, country, city }),
//     [region, country, city]
//   );
//   const validRegion = useMemo(
//     () => isSupported({ region, country, city }),
//     [region, country, city]
//   );

//   const canonicalPath =
//     country && city
//       ? `/employee-login/${slug(country)}/${slug(city)}`
//       : region
//       ? `/employee-login/${slug(region)}`
//       : "/employee-login";

//   const [isLoading, setIsLoading] = useState(false);
//   const [globalMsg, setGlobalMsg] = useState<string | null>(null);
//   const [globalState, setGlobalState] = useState<"info" | "error" | "success">("info");

//   const loginForm = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "" },
//     mode: "onTouched",
//   });

//   const signupForm = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
//     mode: "onTouched",
//   });

//   const onLogin = async (values: LoginFormValues) => {
//     setIsLoading(true);
//     setGlobalMsg(null);
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: values.email,
//         password: values.password,
//       });
//       if (error) {
//         setGlobalState("error");
//         setGlobalMsg(error.message || "Failed to sign in.");
//         return;
//       }
//       if (data?.user) {
//         setGlobalState("success");
//         setGlobalMsg("Signed in successfully!");
//         if (data.session) console.log("Employee logged in:", data.user);
//         navigate(`${canonicalPath}/dashboard`);
//       }
//     } catch (e: any) {
//       setGlobalState("error");
//       setGlobalMsg(e?.message ?? "Unexpected error during sign in.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onSignup = async (values: SignupFormValues) => {
//     setIsLoading(true);
//     setGlobalMsg(null);
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email: values.email,
//         password: values.password,
//         options: {
//           data: { full_name: values.name, phone: values.phone, region: regionDisplay },
//           // emailRedirectTo: `${window.location.origin}/auth/callback`,
//         },
//       });
//       if (error) {
//         setGlobalState("error");
//         setGlobalMsg(error.message || "Failed to create account.");
//         return;
//       }
//       if (data?.user && !data.session) {
//         setGlobalState("success");
//         setGlobalMsg("Account created! Check your email to confirm before logging in.");
//         return;
//       }
//       if (data?.session) {
//         setGlobalState("success");
//         setGlobalMsg("Account created! Redirecting…");
//         navigate(`${canonicalPath}/dashboard`);
//       }
//     } catch (e: any) {
//       setGlobalState("error");
//       setGlobalMsg(e?.message ?? "Unexpected error during sign up.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <MapPin className="w-4 h-4" />
//             <span>
//               Region:&nbsp;<span className="font-medium capitalize">{regionDisplay}</span>
//             </span>
//           </div>
//           <CardTitle className="mt-2">Employee Access</CardTitle>
//           <CardDescription>Sign in to your regional dashboard or create an account</CardDescription>
//         </CardHeader>

//         {!validRegion && (
//           <CardContent>
//             <div className="flex items-start gap-2 rounded-md border p-3 text-red-600">
//               <AlertCircle className="w-4 h-4 mt-0.5" />
//               <div className="text-sm">
//                 The selected region isn’t supported.{" "}
//                 <button
//                   className="underline underline-offset-4"
//                   onClick={() => navigate("/employee-login/india/bengaluru")}
//                 >
//                   Go to Bengaluru login
//                 </button>
//                 .
//               </div>
//             </div>
//           </CardContent>
//         )}

//         {globalMsg && (
//           <CardContent className="pt-0">
//             <Alert variant={globalState === "error" ? "destructive" : "default"} className="mb-2">
//               <InfoIcon className="h-4 w-4" />
//               <AlertDescription>{globalMsg}</AlertDescription>
//             </Alert>
//           </CardContent>
//         )}

//         <CardContent>
//           <Tabs defaultValue="login" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>

//             {/* LOGIN TAB */}
//             <TabsContent value="login" className="space-y-4 mt-6">
//               <Form {...loginForm}>
//                 <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
//                   <div className="grid gap-2">
//                     <Label>Selected Region</Label>
//                     <Input value={regionDisplay} disabled />
//                   </div>

//                   <FormField
//                     control={loginForm.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Employee Email</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input
//                               type="email"
//                               placeholder="you@org.com"
//                               className="pl-10"
//                               autoComplete="email"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={loginForm.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input
//                               type="password"
//                               placeholder="••••••••"
//                               className="pl-10"
//                               autoComplete="current-password"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
//                     disabled={!validRegion || isLoading}
//                   >
//                     {isLoading ? "Signing in…" : "Sign In"}
//                   </Button>
//                 </form>
//               </Form>
//             </TabsContent>

//             {/* SIGNUP TAB */}
//             <TabsContent value="signup" className="space-y-4 mt-6">
//               <Form {...signupForm}>
//                 <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
//                   <div className="grid gap-2">
//                     <Label>Selected Region</Label>
//                     <Input value={regionDisplay} disabled />
//                   </div>

//                   <FormField
//                     control={signupForm.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input placeholder="Enter your full name" className="pl-10" autoComplete="name" {...field} />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={signupForm.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input placeholder="Enter your email" className="pl-10" autoComplete="email" {...field} />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={signupForm.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input placeholder="e.g. +911234567890" className="pl-10" autoComplete="tel" {...field} />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={signupForm.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input
//                               type="password"
//                               placeholder="Create a password"
//                               className="pl-10"
//                               autoComplete="new-password"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={signupForm.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Confirm Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input
//                               type="password"
//                               placeholder="Confirm your password"
//                               className="pl-10"
//                               autoComplete="new-password"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={!validRegion || isLoading}
//                   >
//                     {isLoading ? "Creating account…" : "Create Account"}
//                   </Button>
//                 </form>
//               </Form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>

//         <CardFooter className="flex items-center justify-between text-sm">
//           <Link to="/forgot-password" className="underline underline-offset-4">
//             Forgot password?
//           </Link>
//           <button
//             className="underline underline-offset-4"
//             onClick={() =>
//               navigate(`/employee-signup${canonicalPath.replace("/employee-login", "")}`)
//             }
//           >
//             Sign-up
//           </button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default EmployeeRegionLogin;
