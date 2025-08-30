// // import { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import * as z from 'zod';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { Separator } from '@/components/ui/separator';
// // import { Alert, AlertDescription } from '@/components/ui/alert';
// // import { InfoIcon, Mail, Lock, User, Phone } from 'lucide-react';
// // import { Link } from 'react-router-dom';

// // const loginSchema = z.object({
// //   email: z.string().email('Please enter a valid email address'),
// //   password: z.string().min(6, 'Password must be at least 6 characters'),
// // });

// // const signupSchema = z.object({
// //   name: z.string().min(2, 'Name must be at least 2 characters'),
// //   email: z.string().email('Please enter a valid email address'),
// //   phone: z.string().min(10, 'Please enter a valid phone number'),
// //   password: z.string().min(6, 'Password must be at least 6 characters'),
// //   confirmPassword: z.string(),
// // }).refine((data) => data.password === data.confirmPassword, {
// //   message: "Passwords don't match",
// //   path: ["confirmPassword"],
// // });

// // type LoginFormValues = z.infer<typeof loginSchema>;
// // type SignupFormValues = z.infer<typeof signupSchema>;

// // const Login = () => {
// //   const [isLoading, setIsLoading] = useState(false);

// //   const loginForm = useForm<LoginFormValues>({
// //     resolver: zodResolver(loginSchema),
// //     defaultValues: {
// //       email: '',
// //       password: '',
// //     },
// //   });

// //   const signupForm = useForm<SignupFormValues>({
// //     resolver: zodResolver(signupSchema),
// //     defaultValues: {
// //       name: '',
// //       email: '',
// //       phone: '',
// //       password: '',
// //       confirmPassword: '',
// //     },
// //   });

// //   const onLogin = async (values: LoginFormValues) => {
// //     setIsLoading(true);
// //     // This will be implemented when Supabase is connected
// //     console.log('Login attempt:', values);
// //     alert('Login functionality will be available after connecting to Supabase!');
// //     setIsLoading(false);
// //   };

// //   const onSignup = async (values: SignupFormValues) => {
// //     setIsLoading(true);
// //     // This will be implemented when Supabase is connected
// //     console.log('Signup attempt:', values);
// //     alert('Signup functionality will be available after connecting to Supabase!');
// //     setIsLoading(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
// //       <div className="w-full max-w-md">
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
// //           <p className="text-muted-foreground">Join the Yashasv family</p>
// //         </div>

// //         <Alert className="mb-6">
// //           <InfoIcon className="h-4 w-4" />
// //           <AlertDescription>
// //             Authentication features will be available after connecting to Supabase. This is a preview of the login interface.
// //           </AlertDescription>
// //         </Alert>

// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Account Access</CardTitle>
// //             <CardDescription>
// //               Sign in to your account or create a new one
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <Tabs defaultValue="login" className="w-full">
// //               <TabsList className="grid w-full grid-cols-2">
// //                 <TabsTrigger value="login">Login</TabsTrigger>
// //                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
// //               </TabsList>

// //               <TabsContent value="login" className="space-y-4 mt-6">
// //                 <Form {...loginForm}>
// //                   <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
// //                     <FormField
// //                       control={loginForm.control}
// //                       name="email"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Email</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input placeholder="Enter your email" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <FormField
// //                       control={loginForm.control}
// //                       name="password"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Password</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input type="password" placeholder="Enter your password" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <Button type="submit" className="w-full" disabled={isLoading}>
// //                       {isLoading ? 'Signing in...' : 'Sign In'}
// //                     </Button>
// //                   </form>
// //                 </Form>
// //               </TabsContent>

// //               <TabsContent value="signup" className="space-y-4 mt-6">
// //                 <Form {...signupForm}>
// //                   <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
// //                     <FormField
// //                       control={signupForm.control}
// //                       name="name"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Full Name</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input placeholder="Enter your full name" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <FormField
// //                       control={signupForm.control}
// //                       name="email"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Email</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input placeholder="Enter your email" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <FormField
// //                       control={signupForm.control}
// //                       name="phone"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Phone Number</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input placeholder="Enter your phone number" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <FormField
// //                       control={signupForm.control}
// //                       name="password"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Password</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input type="password" placeholder="Create a password" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <FormField
// //                       control={signupForm.control}
// //                       name="confirmPassword"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Confirm Password</FormLabel>
// //                           <FormControl>
// //                             <div className="relative">
// //                               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                               <Input type="password" placeholder="Confirm your password" className="pl-10" {...field} />
// //                             </div>
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                     <Button type="submit" className="w-full" disabled={isLoading}>
// //                       {isLoading ? 'Creating account...' : 'Create Account'}
// //                     </Button>
// //                   </form>
// //                 </Form>
// //               </TabsContent>
// //             </Tabs>

// //             <Separator className="my-6" />
            
// //             <div className="text-center text-sm text-muted-foreground">
// //               <Link to="/" className="text-primary hover:underline">
// //                 Continue as guest
// //               </Link>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// //by Monu
// import { useMemo, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { InfoIcon, Mail, Lock, User, Phone } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { supabase } from '@/lib/supabaseClient'; // ← adjust path if needed
// import ReCAPTCHA from "react-google-recaptcha";

// // inside component
// const [captchaToken, setCaptchaToken] = useState<string | null>(null);
// const recaptchaSiteKey = "6LdY_bcrAAAAAO2bfzWdMp_UMWYecG2CpkLUkSSr"; // ⬅ replace with your site key

// const phoneRegex = /^\+?[0-9]{10,15}$/;

// const loginSchema = z.object({
//   email: z.string().email('Please enter a valid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// const signupSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Please enter a valid email address'),
//   phone: z.string().regex(phoneRegex, 'Please enter a valid phone number'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string(),
// }).refine((d) => d.password === d.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// type LoginFormValues = z.infer<typeof loginSchema>;
// type SignupFormValues = z.infer<typeof signupSchema>;

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [globalMsg, setGlobalMsg] = useState<string | null>(null);
//   const [globalState, setGlobalState] = useState<'info' | 'error' | 'success'>('info');

//   const loginForm = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: '', password: '' },
//     mode: 'onTouched',
//   });

//   const signupForm = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
//     mode: 'onTouched',
//   });

// // const onLogin = async (values: LoginFormValues) => {
// //   setIsLoading(true);
// //   setGlobalMsg(null);
// //   try {
// //     const { data, error } = await supabase.auth.signInWithPassword({
// //       email: values.email,
// //       password: values.password,
// //     });
// //     if (error) throw error;

// //     // ❌ block employees from customer portal
// //     const role = (data.user?.user_metadata as any)?.role;
// //     if (role === "employee") {
// //       setGlobalState("error");
// //       setGlobalMsg("This email is registered as an employee. Please use the employee login.");
// //       await supabase.auth.signOut();
// //       return;
// //     }

// //     setGlobalState("success");
// //     setGlobalMsg("Signed in successfully!");
// //     navigate("/");
// //   } catch (e: any) {
// //     setGlobalState("error");
// //     setGlobalMsg(e?.message ?? "Failed to sign in.");
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };

// const onLogin = async (values: LoginFormValues) => {
//   if (!captchaToken) {
//     setGlobalState("error");
//     setGlobalMsg("Please complete the CAPTCHA.");
//     return;
//   }

//   setIsLoading(true);
//   setGlobalMsg(null);
//   try {
//     // (Optional) verify captchaToken with your backend here
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: values.email,
//       password: values.password,
//     });
//     if (error) throw error;

//     const role = (data.user?.user_metadata as any)?.role;
//     if (role === "employee") {
//       setGlobalState("error");
//       setGlobalMsg("This email is registered as an employee. Please use the employee login.");
//       await supabase.auth.signOut();
//       return;
//     }

//     setGlobalState("success");
//     setGlobalMsg("Signed in successfully!");
//     navigate("/");
//   } catch (e: any) {
//     setGlobalState("error");
//     setGlobalMsg(e?.message ?? "Failed to sign in.");
//   } finally {
//     setIsLoading(false);
//     setCaptchaToken(null); // reset captcha
//   }
// };

// const onSignup = async (values: SignupFormValues) => {
//   setIsLoading(true);
//   setGlobalMsg(null);
//   try {
//     // ✅ tag the account as a customer in user_metadata
//     const { data, error } = await supabase.auth.signUp({
//       email: values.email,
//       password: values.password,
//       options: {
//         data: { role: "customer", full_name: values.name, phone: values.phone },
//         // emailRedirectTo: `${window.location.origin}/auth/callback`,
//       },
//     });
//     if (error) throw error;

//     if (data.user && !data.session) {
//       setGlobalState("success");
//       setGlobalMsg("Account created! Check your email to confirm before logging in.");
//       return;
//     }
//     if (data.session) {
//       setGlobalState("success");
//       setGlobalMsg("Account created! Redirecting…");
//       navigate("/");
//     }
//   } catch (e: any) {
//     setGlobalState("error");
//     setGlobalMsg(e?.message ?? "Unexpected error during sign up.");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   const InfoBanner = useMemo(() => {
//     if (!globalMsg) return null;
//     return (
//       <Alert className="mb-6" variant={globalState === 'error' ? 'destructive' : 'default'}>
//         <InfoIcon className="h-4 w-4" />
//         <AlertDescription>{globalMsg}</AlertDescription>
//       </Alert>
//     );
//   }, [globalMsg, globalState]);

//   return (
//     <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
//           <p className="text-muted-foreground">Join the Yashasv family</p>
//         </div>

//         {InfoBanner}

//         <Card>
//           <CardHeader>
//             <CardTitle>Account Access</CardTitle>
//             <CardDescription>Sign in to your account or create a new one</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="login" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="login">Login</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//               </TabsList>

//               <TabsContent value="login" className="space-y-4 mt-6">
//                 <Form {...loginForm}>
//                   <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
//                     <FormField
//                       control={loginForm.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input placeholder="Enter your email" className="pl-10" autoComplete="email" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={loginForm.control}
//                       name="password"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Password</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 type="password"
//                                 placeholder="Enter your password"
//                                 className="pl-10"
//                                 autoComplete="current-password"
//                                 {...field}
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" className="w-full" disabled={isLoading}>
//                       {isLoading ? 'Signing in…' : 'Sign In'}
//                     </Button>
//                   </form>
//                 </Form>
//               </TabsContent>

//               <TabsContent value="signup" className="space-y-4 mt-6">
//                 <Form {...signupForm}>
//                   <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
//                     <FormField
//                       control={signupForm.control}
//                       name="name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Full Name</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input placeholder="Enter your full name" className="pl-10" autoComplete="name" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={signupForm.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input placeholder="Enter your email" className="pl-10" autoComplete="email" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={signupForm.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Phone Number</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input placeholder="e.g. +911234567890" className="pl-10" autoComplete="tel" {...field} />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={signupForm.control}
//                       name="password"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Password</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 type="password"
//                                 placeholder="Create a password"
//                                 className="pl-10"
//                                 autoComplete="new-password"
//                                 {...field}
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={signupForm.control}
//                       name="confirmPassword"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Confirm Password</FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 type="password"
//                                 placeholder="Confirm your password"
//                                 className="pl-10"
//                                 autoComplete="new-password"
//                                 {...field}
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" className="w-full" disabled={isLoading}>
//                       {isLoading ? 'Creating account…' : 'Create Account'}
//                     </Button>
//                   </form>
//                 </Form>
//               </TabsContent>
//             </Tabs>

//             <Separator className="my-6" />

//             <div className="text-center text-sm text-muted-foreground">
//               <Link to="/" className="text-primary hover:underline">
//                 Continue as guest
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;
//by Monu
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, Mail, Lock, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; 
import ReCAPTCHA from "react-google-recaptcha";

const phoneRegex = /^\+?[0-9]{10,15}$/;

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalMsg, setGlobalMsg] = useState<string | null>(null);
  const [globalState, setGlobalState] = useState<'info' | 'error' | 'success'>('info');

  // ✅ move captchaToken inside component
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaSiteKey = "6LdY_bcrAAAAAO2bfzWdMp_UMWYecG2CpkLUkSSr"; // replace with your key

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  const onLogin = async (values: LoginFormValues) => {
    if (!captchaToken) {
      setGlobalState("error");
      setGlobalMsg("Please complete the CAPTCHA.");
      return;
    }

    setIsLoading(true);
    setGlobalMsg(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;

      const role = (data.user?.user_metadata as any)?.role;
      if (role === "employee") {
        setGlobalState("error");
        setGlobalMsg("This email is registered as an employee. Please use the employee login.");
        await supabase.auth.signOut();
        return;
      }

      setGlobalState("success");
      setGlobalMsg("Signed in successfully!");
      navigate("/");
    } catch (e: any) {
      setGlobalState("error");
      setGlobalMsg(e?.message ?? "Failed to sign in.");
    } finally {
      setIsLoading(false);
      setCaptchaToken(null); // reset captcha
    }
  };

  const onSignup = async (values: SignupFormValues) => {
    if (!captchaToken) {
      setGlobalState("error");
      setGlobalMsg("Please complete the CAPTCHA.");
      return;
    }

    setIsLoading(true);
    setGlobalMsg(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { role: "customer", full_name: values.name, phone: values.phone },
        },
      });
      if (error) throw error;

      if (data.user && !data.session) {
        setGlobalState("success");
        setGlobalMsg("Account created! Check your email to confirm before logging in.");
        return;
      }
      if (data.session) {
        setGlobalState("success");
        setGlobalMsg("Account created! Redirecting…");
        navigate("/");
      }
    } catch (e: any) {
      setGlobalState("error");
      setGlobalMsg(e?.message ?? "Unexpected error during sign up.");
    } finally {
      setIsLoading(false);
      setCaptchaToken(null);
    }
  };

  const InfoBanner = useMemo(() => {
    if (!globalMsg) return null;
    return (
      <Alert className="mb-6" variant={globalState === 'error' ? 'destructive' : 'default'}>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>{globalMsg}</AlertDescription>
      </Alert>
    );
  }, [globalMsg, globalState]);

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Join the Yashasv family</p>
        </div>

        {InfoBanner}

        <Card>
          <CardHeader>
            <CardTitle>Account Access</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4 mt-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Enter your email" className="pl-10" autoComplete="email" {...field} />
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
                                placeholder="Enter your password"
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

                    {/* ✅ CAPTCHA here */}
                    <ReCAPTCHA
                      sitekey={recaptchaSiteKey}
                      onChange={(token) => setCaptchaToken(token)}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in…' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup" className="space-y-4 mt-6">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Enter your full name" className="pl-10" autoComplete="name" {...field} />
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
                              <Input placeholder="Enter your email" className="pl-10" autoComplete="email" {...field} />
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
                              <Input placeholder="e.g. +911234567890" className="pl-10" autoComplete="tel" {...field} />
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

                    {/* ✅ CAPTCHA here */}
                    <ReCAPTCHA
                      sitekey={recaptchaSiteKey}
                      onChange={(token) => setCaptchaToken(token)}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating account…' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <div className="text-center text-sm text-muted-foreground">
              <Link to="/" className="text-primary hover:underline">
                Continue as guest
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
