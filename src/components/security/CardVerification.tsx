
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Scan,
  Eye,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CardVerification = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verifyCard = async () => {
    if (!cardNumber) {
      toast({
        title: "Error",
        description: "Please enter a card number",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const mockResult = {
        cardNumber: cardNumber.replace(/\d(?=\d{4})/g, '*'),
        isValid: Math.random() > 0.3,
        issuer: 'Visa',
        cardType: 'Credit',
        country: 'United States',
        riskScore: Math.floor(Math.random() * 100),
        checks: {
          luhnValid: Math.random() > 0.1,
          binValid: Math.random() > 0.2,
          cvvValid: Math.random() > 0.15,
          holderNameMatch: Math.random() > 0.25,
          addressMatch: Math.random() > 0.3
        },
        fraudIndicators: [
          { type: 'Velocity Check', status: 'pass', description: 'Normal transaction frequency' },
          { type: 'Geolocation', status: 'warning', description: 'Transaction from new location' },
          { type: 'Device Fingerprint', status: 'pass', description: 'Recognized device' },
          { type: 'Behavioral Pattern', status: 'pass', description: 'Consistent with user behavior' }
        ]
      };
      
      setVerificationResult(mockResult);
      setIsVerifying(false);
      
      toast({
        title: "Verification Complete",
        description: `Card verification completed with ${mockResult.riskScore}% risk score`,
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fail': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskBadge = (score: number) => {
    if (score < 30) return <Badge className="bg-green-100 text-green-600">Low Risk</Badge>;
    if (score < 70) return <Badge className="bg-yellow-100 text-yellow-600">Medium Risk</Badge>;
    return <Badge className="bg-red-100 text-red-600">High Risk</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Card Verification System
          </CardTitle>
          <CardDescription>
            Verify payment card authenticity and detect potential fraud
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="Enter card number (e.g., 4242424242424242)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={verifyCard} 
            disabled={isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <>
                <Scan className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Verify Card
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {verificationResult && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Card Number</Label>
                  <p className="font-medium">{verificationResult.cardNumber}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Issuer</Label>
                  <p className="font-medium">{verificationResult.issuer}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Card Type</Label>
                  <p className="font-medium">{verificationResult.cardType}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Country</Label>
                  <p className="font-medium">{verificationResult.country}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label className="text-sm text-muted-foreground">Risk Score</Label>
                  <p className="text-2xl font-bold">{verificationResult.riskScore}%</p>
                </div>
                {getRiskBadge(verificationResult.riskScore)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(verificationResult.checks).map(([check, passed]) => (
                  <div key={check} className="flex items-center justify-between">
                    <span className="capitalize">{check.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center gap-2">
                      {passed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={passed ? 'text-green-600' : 'text-red-600'}>
                        {passed ? 'Pass' : 'Fail'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fraud Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {verificationResult.fraudIndicators.map((indicator: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getStatusIcon(indicator.status)}
                    <div className="flex-1">
                      <p className="font-medium">{indicator.type}</p>
                      <p className="text-sm text-muted-foreground">{indicator.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CardVerification;
