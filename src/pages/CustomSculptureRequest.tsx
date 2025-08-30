import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Hammer, Clock, DollarSign } from "lucide-react";

const CustomSculptureRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sculptureType: "",
    size: "",
    material: "",
    description: "",
    budget: "",
    timeline: "",
    reference: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Hammer className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Custom Sculpture Request
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Commission a unique handcrafted sculpture that tells your story. Our skilled artisans 
              create bespoke pieces using traditional techniques and premium materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Hammer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Handcrafted Excellence</h3>
              <p className="text-sm text-muted-foreground">Each piece is meticulously crafted by master artisans</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Custom Timeline</h3>
              <p className="text-sm text-muted-foreground">Flexible delivery schedules to meet your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fair Pricing</h3>
              <p className="text-sm text-muted-foreground">Transparent pricing with no hidden costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Your Vision</CardTitle>
              <CardDescription>
                Fill out the form below to request a custom sculpture. Our team will review your requirements 
                and get back to you within 24-48 hours with a detailed proposal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                {/* Sculpture Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sculpture Type *</label>
                    <Select value={formData.sculptureType} onValueChange={(value) => handleInputChange("sculptureType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sculpture type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="religious">Religious Figures</SelectItem>
                        <SelectItem value="abstract">Abstract Art</SelectItem>
                        <SelectItem value="portrait">Portrait/Bust</SelectItem>
                        <SelectItem value="animal">Animal Figures</SelectItem>
                        <SelectItem value="decorative">Decorative Pieces</SelectItem>
                        <SelectItem value="architectural">Architectural Elements</SelectItem>
                        <SelectItem value="other">Other (specify in description)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Material Preference</label>
                    <Select value={formData.material} onValueChange={(value) => handleInputChange("material", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandalwood">Sandalwood</SelectItem>
                        <SelectItem value="teak">Teak Wood</SelectItem>
                        <SelectItem value="rosewood">Rosewood</SelectItem>
                        <SelectItem value="marble">Marble</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="stone">Natural Stone</SelectItem>
                        <SelectItem value="mixed">Mixed Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Size/Dimensions</label>
                    <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select approximate size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (up to 12 inches)</SelectItem>
                        <SelectItem value="medium">Medium (12-24 inches)</SelectItem>
                        <SelectItem value="large">Large (24-48 inches)</SelectItem>
                        <SelectItem value="life-size">Life Size (48+ inches)</SelectItem>
                        <SelectItem value="custom">Custom (specify in description)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5000-15000">₹5,000 - ₹15,000</SelectItem>
                        <SelectItem value="15000-50000">₹15,000 - ₹50,000</SelectItem>
                        <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="100000+">₹1,00,000+</SelectItem>
                        <SelectItem value="discuss">Prefer to discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">Detailed Description *</label>
                  <Textarea
                    placeholder="Please describe your vision in detail. Include specific features, poses, expressions, cultural significance, intended use, placement location, and any other important details..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Timeline and Reference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Timeline</label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rush">Rush (2-4 weeks)</SelectItem>
                        <SelectItem value="standard">Standard (1-2 months)</SelectItem>
                        <SelectItem value="extended">Extended (2-3 months)</SelectItem>
                        <SelectItem value="flexible">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Reference Images</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Upload reference images (optional)
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, PDF up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <Textarea
                    placeholder="Any special requirements, cultural considerations, or additional information..."
                    rows={2}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto px-8">
                    Submit Request
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    We'll review your request and contact you within 24-48 hours with a detailed proposal.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Our Custom Sculpture Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm text-muted-foreground">We discuss your vision, requirements, and provide initial design concepts</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold mb-2">Design & Approval</h3>
              <p className="text-sm text-muted-foreground">Detailed sketches and 3D models are created for your approval</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold mb-2">Crafting</h3>
              <p className="text-sm text-muted-foreground">Our master artisans begin the meticulous crafting process</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-sm text-muted-foreground">Careful packaging and safe delivery to your location</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does a custom sculpture take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Typical timeline ranges from 2-12 weeks depending on size, complexity, and material. 
                  We provide detailed timelines during consultation.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What materials do you work with?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We specialize in sandalwood, teak, rosewood, marble, bronze, and natural stone. 
                  We can also work with other materials upon request.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide design mockups?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! We create detailed sketches and 3D models for approval before beginning 
                  the crafting process to ensure your vision is perfectly captured.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are the payment terms?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We typically require 50% advance payment to begin work, with the balance 
                  due upon completion and before delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomSculptureRequest;