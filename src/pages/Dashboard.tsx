import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Package, 
  Heart, 
  FileText, 
  HelpCircle, 
  MapPin,
  Calendar,
  Download,
  Eye,
  InfoIcon
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Mock data - will be replaced with real data from Supabase
  const mockUser = {
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '+91 98765 43210',
    joinedDate: '2024-01-15'
  };

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-20',
      status: 'Delivered',
      total: 2500,
      items: 'Sandalwood Elephant Sculpture, Bead Chain'
    },
    {
      id: 'ORD002',
      date: '2024-01-15',
      status: 'Shipped',
      total: 1200,
      items: 'Pure Sandalwood Oil'
    }
  ];

  const mockWishlist = [
    { id: 1, name: 'Premium Sandalwood Mala', price: '₹1,500', category: 'Spiritual Items' },
    { id: 2, name: 'Ganesha Carved Idol', price: '₹3,200', category: 'Sculptures' }
  ];

  const mockTickets = [
    {
      id: 'TKT001',
      subject: 'Delivery Query',
      status: 'Open',
      date: '2024-01-22',
      priority: 'Medium'
    },
    {
      id: 'TKT002',
      subject: 'Product Information',
      status: 'Resolved',
      date: '2024-01-18',
      priority: 'Low'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your account and orders</p>
        </div>

        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            This is a preview of the user dashboard. Full functionality will be available after connecting to Supabase.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Section */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-lg">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{mockUser.name}</CardTitle>
              <CardDescription>{mockUser.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Joined {mockUser.joinedDate}</span>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders">
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="invoices">
                  <FileText className="w-4 h-4 mr-2" />
                  Invoices
                </TabsTrigger>
                <TabsTrigger value="support">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Track and manage your orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{order.items}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">₹{order.total.toLocaleString()}</span>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3 mr-1" />
                                Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>Items you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {mockWishlist.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="font-semibold text-accent">{item.price}</p>
                          </div>
                          <div className="space-x-2">
                            <Button size="sm">Add to Cart</Button>
                            <Button size="sm" variant="outline">Remove</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoices" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>Download your purchase invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Invoice #{order.id}</h4>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                            <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>Track your support requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      {mockTickets.map((ticket) => (
                        <div key={ticket.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">#{ticket.id} - {ticket.subject}</h4>
                              <p className="text-sm text-muted-foreground">{ticket.date}</p>
                            </div>
                            <div className="space-x-2">
                              <Badge variant={ticket.status === 'Open' ? 'destructive' : 'default'}>
                                {ticket.status}
                              </Badge>
                              <Badge variant="outline">{ticket.priority}</Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full">
                      Create New Ticket
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;