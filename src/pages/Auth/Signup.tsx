
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [accountType, setAccountType] = useState('individual');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const { signUp, user, loading } = useAuth();

  // Redirect if user is already logged in
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    try {
      await signUp(email, password, name, company, accountType);
      // The auth context will handle redirection
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xl">FS</div>
            <h1 className="text-2xl font-bold">FraudShield Central</h1>
          </div>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <RadioGroup value={accountType} onValueChange={setAccountType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="financial_institution" id="financial_institution" />
                    <Label htmlFor="financial_institution">Financial Institution / Bank</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">
                  {accountType === 'individual' 
                    ? 'Access fraud protection and payment monitoring features'
                    : 'Access banking integration and institutional fraud monitoring'
                  }
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">
                  {accountType === 'individual' ? 'Company (Optional)' : 'Institution Name'}
                </Label>
                <Input
                  id="company"
                  placeholder={accountType === 'individual' ? 'Your Company' : 'Bank/Institution Name'}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required={accountType === 'financial_institution'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters and include a number and special character
                </p>
              </div>
              
              <div className="flex items-start space-x-2 mt-6">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setAgreed(checked);
                    }
                  }}
                />
                <Label htmlFor="terms" className="text-sm leading-tight">
                  I agree to the{' '}
                  <a href="#" className="text-secondary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-secondary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-secondary hover:underline font-medium">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
