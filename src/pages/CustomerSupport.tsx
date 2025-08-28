import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HeadphonesIcon, TicketIcon, SearchIcon, SendIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Form schemas
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ticketFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  priority: z.enum(["low", "medium", "high"]),
});

const trackingSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  ticketId: z.string().min(6, "Please enter a valid ticket ID"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type TicketFormData = z.infer<typeof ticketFormSchema>;
type TrackingFormData = z.infer<typeof trackingSchema>;

const CustomerSupport = () => {
  const [generatedTicketId, setGeneratedTicketId] = useState<string | null>(null);
  const { toast } = useToast();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const ticketForm = useForm<TicketFormData>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      description: "",
      priority: "medium",
    },
  });

  const trackingForm = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      email: "",
      ticketId: "",
    },
  });

  const generateTicketId = () => {
    const prefix = "YCT";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const onContactSubmit = (data: ContactFormData) => {
    // This will be connected to Supabase later
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    contactForm.reset();
  };

  const onTicketSubmit = (data: TicketFormData) => {
    // This will be connected to Supabase later
    const ticketId = generateTicketId();
    setGeneratedTicketId(ticketId);
    console.log("Ticket submitted:", { ...data, ticketId });
    toast({
      title: "Ticket Created!",
      description: `Your ticket ID is ${ticketId}. Please save it for tracking.`,
    });
    ticketForm.reset();
  };

  const onTrackingSubmit = (data: TrackingFormData) => {
    // This will be connected to Supabase later
    console.log("Tracking request:", data);
    toast({
      title: "Ticket Status",
      description: "We're working on connecting this to our database. Please check back soon!",
    });
  };

  const categories = [
    { value: "donations", label: "Donations & Fundraising" },
    { value: "volunteer", label: "Volunteer Support" },
    { value: "technical", label: "Technical Issues" },
    { value: "products", label: "Product Support" },
    { value: "events", label: "Events & Campaigns" },
    { value: "general", label: "General Inquiry" },
  ];

  return (
    <div className="min-h-screen bg-gradient-page">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-hero rounded-full">
              <HeadphonesIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Customer Support</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help! Get in touch with us through our contact form, 
            raise a support ticket, or track your existing tickets.
          </p>
        </div>

        {/* Success Message for Generated Ticket */}
        {generatedTicketId && (
          <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <TicketIcon className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Ticket Created Successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Your ticket ID: <Badge variant="secondary" className="ml-2">{generatedTicketId}</Badge>
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Please save this ID for tracking. You'll also receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="contact" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <MessageSquareIcon className="w-4 h-4" />
              <span>Contact Us</span>
            </TabsTrigger>
            <TabsTrigger value="ticket" className="flex items-center space-x-2">
              <TicketIcon className="w-4 h-4" />
              <span>Raise Ticket</span>
            </TabsTrigger>
            <TabsTrigger value="track" className="flex items-center space-x-2">
              <SearchIcon className="w-4 h-4" />
              <span>Track Ticket</span>
            </TabsTrigger>
          </TabsList>

          {/* Contact Form Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Send us a message and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us how we can help you..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      <SendIcon className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ticket Form Tab */}
          <TabsContent value="ticket">
            <Card>
              <CardHeader>
                <CardTitle>Raise a Support Ticket</CardTitle>
                <CardDescription>
                  Create a detailed support ticket for technical issues or specific requests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...ticketForm}>
                  <form onSubmit={ticketForm.handleSubmit(onTicketSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={ticketForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={ticketForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={ticketForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={ticketForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <FormField
                          control={ticketForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description of your issue" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={ticketForm.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={ticketForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide as much detail as possible about your issue or request..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The more details you provide, the better we can assist you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      <TicketIcon className="w-4 h-4 mr-2" />
                      Create Support Ticket
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ticket Tracking Tab */}
          <TabsContent value="track">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Ticket</CardTitle>
                <CardDescription>
                  Enter your email and ticket ID to check the status of your support request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...trackingForm}>
                  <form onSubmit={trackingForm.handleSubmit(onTrackingSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={trackingForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={trackingForm.control}
                        name="ticketId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ticket ID</FormLabel>
                            <FormControl>
                              <Input placeholder="YCT-123456-ABC" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <SearchIcon className="w-4 h-4 mr-2" />
                      Track Ticket Status
                    </Button>
                  </form>
                </Form>

                <Separator className="my-8" />

                {/* Sample Ticket Status (will be dynamic later) */}
                <div className="bg-secondary/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Sample Ticket Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ticket ID:</span>
                      <Badge variant="secondary">YCT-154823-XYZ</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Status:</span>
                      <Badge variant="default">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Priority:</span>
                      <Badge variant="outline">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Created:</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Last Update:</span>
                      <span className="text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Note:</strong> This is a sample display. Once connected to Supabase, 
                    you'll see real-time ticket status updates here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Information */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <HeadphonesIcon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground">Mon-Fri, 9AM-6PM</p>
                <p className="font-medium">+91 (XXX) XXX-XXXX</p>
              </div>
              <div className="text-center">
                <MessageSquareIcon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground">24/7 Response</p>
                <p className="font-medium">support@yashasv.org</p>
              </div>
              <div className="text-center">
                <TicketIcon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Ticket System</h3>
                <p className="text-muted-foreground">Track & Manage</p>
                <p className="font-medium">Online Portal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerSupport;