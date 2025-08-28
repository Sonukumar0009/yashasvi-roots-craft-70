import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Trust Office",
      details: [
        "Yashasv Charitable Trust",
        "123 Sandalwood Avenue",
        "Mysuru, Karnataka 570001",
        "India"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Main Office: +91 821 2345678",
        "WhatsApp Orders: +91 9876543210",
        "Emergency: +91 9123456789"
      ]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "General: info@yashashvitrust.org",
        "Orders: orders@yashashvitrust.org",
        "Partnerships: partners@yashashvitrust.org"
      ]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
        "Public Holidays: Closed"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us for product inquiries, partnerships, volunteer opportunities, or any questions about our mission
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Product Inquiry</SelectItem>
                          <SelectItem value="bulk">Bulk Orders</SelectItem>
                          <SelectItem value="volunteer">Volunteer Opportunity</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="donation">Donation</SelectItem>
                          <SelectItem value="general">General Question</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject of your message"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-warm shadow-card hover:shadow-warm transition-smooth text-center">
              <CardContent className="p-8">
                <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">WhatsApp Orders</h3>
                <p className="text-muted-foreground mb-6">
                  Quick orders and instant responses for product inquiries
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-warm shadow-card hover:shadow-warm transition-smooth text-center">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Email Inquiry</h3>
                <p className="text-muted-foreground mb-6">
                  Detailed inquiries and formal communication
                </p>
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-warm shadow-card hover:shadow-warm transition-smooth text-center">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Schedule a Call</h3>
                <p className="text-muted-foreground mb-6">
                  Personal consultation for partnerships and bulk orders
                </p>
                <Button variant="outline" className="w-full">
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Location Note */}
        <section className="mt-20 bg-gradient-hero rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">Visit Our Trust Office</h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Located in the heart of Mysuru, Karnataka, our office is open to visitors who want to learn more about our work, see our products, or discuss partnerships in person.
          </p>
          <p className="text-primary-foreground/80 text-sm">
            We recommend calling ahead to schedule an appointment for the best experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;