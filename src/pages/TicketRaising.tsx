import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Ticket, Clock, AlertCircle, CheckCircle, FileText, Upload } from "lucide-react";

const TicketRaising = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    email: "",
    phone: ""
  });

  const recentTickets = [
    {
      id: "TKT-2024-001",
      subject: "Product authentication query",
      status: "Open",
      priority: "Medium",
      created: "2 hours ago",
      category: "Product Support"
    },
    {
      id: "TKT-2024-002", 
      subject: "Delivery tracking issue",
      status: "In Progress",
      priority: "High",
      created: "1 day ago",
      category: "Order Support"
    },
    {
      id: "TKT-2024-003",
      subject: "Account access problem",
      status: "Resolved",
      priority: "Low",
      created: "3 days ago",
      category: "Technical Support"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-500";
      case "In Progress": return "bg-yellow-500";
      case "Resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Ticket submitted:", ticketForm);
  };

  const handleInputChange = (field: string, value: string) => {
    setTicketForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Support Ticket System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Create a support ticket for detailed assistance and track your requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Ticket Creation Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Ticket className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  <CardTitle className="text-xl md:text-2xl">Create Support Ticket</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm md:text-base">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm md:text-base">Phone Number</Label>
                      <Input
                        id="phone"
                        value={ticketForm.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div>
                    <Label htmlFor="subject" className="text-sm md:text-base">Subject *</Label>
                    <Input
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your issue"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-sm md:text-base">Category *</Label>
                      <select
                        id="category"
                        value={ticketForm.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="product">Product Support</option>
                        <option value="order">Order Support</option>
                        <option value="technical">Technical Support</option>
                        <option value="account">Account Management</option>
                        <option value="donation">Donation Issues</option>
                        <option value="farmer">Farmer Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-sm md:text-base">Priority *</Label>
                      <select
                        id="priority"
                        value={ticketForm.priority}
                        onChange={(e) => handleInputChange("priority", e.target.value)}
                        className="w-full mt-1 p-2 border border-input rounded-md bg-background text-foreground"
                        required
                      >
                        <option value="">Select priority</option>
                        <option value="Low">Low - General inquiry</option>
                        <option value="Medium">Medium - Standard issue</option>
                        <option value="High">High - Urgent matter</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm md:text-base">Description *</Label>
                    <Textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please provide detailed information about your issue, including any error messages, steps taken, and expected outcome..."
                      className="mt-1 min-h-[120px] md:min-h-[150px]"
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label className="text-sm md:text-base">Attachments (Optional)</Label>
                    <div className="mt-1 border-2 border-dashed border-input rounded-lg p-4 md:p-6 text-center">
                      <Upload className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground mx-auto mb-2 md:mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        Upload screenshots, documents, or files related to your issue
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Supported formats: JPG, PNG, PDF, DOC (Max 10MB)
                      </p>
                      <Button type="button" variant="outline" className="mt-3 text-sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Ticket className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Information */}
            <Card className="bg-gradient-warm">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Support Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">Response Time</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Usually within 2-4 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">Resolution Rate</p>
                    <p className="text-xs md:text-sm text-muted-foreground">98.5% first-contact resolution</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">Business Hours</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Mon-Fri 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Tickets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Your Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-border rounded-lg p-3 md:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground text-sm md:text-base">{ticket.id}</p>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">{ticket.subject}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(ticket.status)}`}></div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        <Badge variant="outline">{ticket.status}</Badge>
                        <span className="text-muted-foreground">{ticket.created}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Tickets
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">
                  Check Order Status
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Account Recovery
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Download Receipts
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Report Technical Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Tips */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            Tips for Better Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <FileText className="w-8 h-8 md:w-12 md:h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Be Specific</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Provide detailed information about your issue including steps to reproduce it
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <Upload className="w-8 h-8 md:w-12 md:h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Include Screenshots</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Visual evidence helps our team understand and resolve issues faster
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6 text-center">
                <Clock className="w-8 h-8 md:w-12 md:h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Set Right Priority</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Choose appropriate priority level to ensure proper response time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketRaising;