import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Users, 
  Leaf, 
  BookOpen, 
  CreditCard, 
  Smartphone,
  InfoIcon,
  Check
} from 'lucide-react';

const donationSchema = z.object({
  amount: z.string().min(1, 'Please select or enter an amount'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
  frequency: z.enum(['one-time', 'monthly', 'yearly']),
  paymentMethod: z.enum(['upi', 'card', 'netbanking']),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const Donate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: '',
      name: '',
      email: '',
      phone: '',
      message: '',
      frequency: 'one-time',
      paymentMethod: 'upi',
    },
  });

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000'];

  const onSubmit = async (values: DonationFormValues) => {
    setIsLoading(true);
    // This will be implemented when Supabase is connected
    console.log('Donation attempt:', values);
    alert('Donation functionality will be available after connecting to Supabase!');
    setIsLoading(false);
  };

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    form.setValue('amount', amount);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Support Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your contribution helps empower sandalwood farmers, preserve traditional crafts, 
            and protect Karnataka's cultural heritage for future generations.
          </p>
          <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            Every Donation Makes a Difference
          </Badge>
        </div>

        <Alert className="mb-8">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            This is a preview of the donation portal. Payment processing will be available after connecting to Supabase.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Impact Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Your Impact
                </CardTitle>
                <CardDescription>
                  See how your donation directly helps our community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-warm rounded-lg p-4">
                    <Users className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">₹500</h3>
                    <p className="text-sm text-muted-foreground">Supports one farmer's legal training session</p>
                  </div>
                  <div className="bg-gradient-warm rounded-lg p-4">
                    <BookOpen className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">₹1,000</h3>
                    <p className="text-sm text-muted-foreground">Funds educational materials for 10 farmers</p>
                  </div>
                  <div className="bg-gradient-warm rounded-lg p-4">
                    <Leaf className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">₹2,500</h3>
                    <p className="text-sm text-muted-foreground">Provides toolkit for artisan training</p>
                  </div>
                  <div className="bg-gradient-warm rounded-lg p-4">
                    <Heart className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">₹5,000</h3>
                    <p className="text-sm text-muted-foreground">Sponsors a complete workshop for rural community</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Trained 150+ farmers in legal rights (2024)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Supported 50+ artisans with skill development</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Conducted 20+ awareness campaigns across Karnataka</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Helped establish 10+ legal sandalwood farms</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Choose your contribution amount and payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Amount Selection */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Amount (₹)</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                              {predefinedAmounts.map((amount) => (
                                <Button
                                  key={amount}
                                  type="button"
                                  variant={selectedAmount === amount ? "default" : "outline"}
                                  onClick={() => handleAmountSelect(amount)}
                                  className="h-12"
                                >
                                  ₹{amount}
                                </Button>
                              ))}
                              <Button
                                type="button"
                                variant={!predefinedAmounts.includes(selectedAmount) && selectedAmount ? "default" : "outline"}
                                onClick={() => {
                                  setSelectedAmount('custom');
                                  form.setValue('amount', '');
                                }}
                                className="h-12"
                              >
                                Custom
                              </Button>
                            </div>
                            {(selectedAmount === 'custom' || !predefinedAmounts.includes(selectedAmount)) && (
                              <Input
                                placeholder="Enter custom amount"
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setSelectedAmount(e.target.value);
                                }}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Frequency */}
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Frequency</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="one-time" id="one-time" />
                              <Label htmlFor="one-time">One-time</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yearly" id="yearly" />
                              <Label htmlFor="yearly">Yearly</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share why you're supporting our cause..."
                            className="resize-none"
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Payment Method */}
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-4"
                          >
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi" className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4" />
                                UPI
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Card
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                              <RadioGroupItem value="netbanking" id="netbanking" />
                              <Label htmlFor="netbanking" className="text-sm">Net Banking</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Donate Now'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;