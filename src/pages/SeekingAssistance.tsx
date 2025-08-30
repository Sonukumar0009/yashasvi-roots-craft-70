import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle, Users, Heart, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const SeekingAssistance = () => {
  return (
    <div className="min-h-screen py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Seeking Assistance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help you navigate our programs and find the support you need
          </p>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth text-center">
            <CardContent className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">Speak with our support team</p>
              <p className="font-semibold text-accent">+91 98765 43210</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth text-center">
            <CardContent className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">Get detailed assistance</p>
              <p className="font-semibold text-accent text-sm md:text-base">help@yashasv.org</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth text-center sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">Instant support available</p>
              <Button size="sm" className="text-xs md:text-sm">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        {/* Assistance Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                <CardTitle className="text-lg md:text-xl">Program Assistance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How can we help you?</h4>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>• Information about our sandalwood programs</li>
                    <li>• Farmer registration and certification</li>
                    <li>• Artisan training opportunities</li>
                    <li>• Legal documentation assistance</li>
                    <li>• Product authentication and quality</li>
                  </ul>
                </div>
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Get Program Help</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                <CardTitle className="text-lg md:text-xl">Donation Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Donation Assistance</h4>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li>• Tax receipt and certificate queries</li>
                    <li>• Donation tracking and history</li>
                    <li>• Recurring donation setup</li>
                    <li>• Impact reports and updates</li>
                    <li>• Corporate sponsorship programs</li>
                  </ul>
                </div>
                <Link to="/donate">
                  <Button variant="outline" className="w-full">Donation Help</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Request Form */}
        <Card className="bg-gradient-warm">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              <CardTitle className="text-xl md:text-2xl">Quick Assistance Request</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm md:text-base">Full Name *</Label>
                  <Input id="name" placeholder="Enter your full name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm md:text-base">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm md:text-base">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm md:text-base">Assistance Category *</Label>
                  <select id="category" className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground">
                    <option value="">Select category</option>
                    <option value="programs">Program Information</option>
                    <option value="farmer">Farmer Support</option>
                    <option value="artisan">Artisan Training</option>
                    <option value="donation">Donation Help</option>
                    <option value="legal">Legal Documentation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm md:text-base">How can we help you? *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe how we can assist you..."
                  className="mt-1 min-h-[100px] md:min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">How do I become a farmer partner?</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Contact our farmer support team for registration process and requirements.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Where can I find tax receipts?</h3>
                <p className="text-xs md:text-sm text-muted-foreground">All tax receipts are available in your account dashboard under "Tax Documents".</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">How to verify product authenticity?</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Each product has a unique certificate number that can be verified on our website.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Can I visit your facilities?</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Yes, we conduct guided tours for supporters. Schedule through our contact form.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekingAssistance;