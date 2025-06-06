
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Key,
  Globe,
  Lock,
  Wifi,
  Database
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BankIntegrationVerification = () => {
  const [bankDetails, setBankDetails] = useState({
    bankCode: '',
    apiEndpoint: '',
    apiKey: ''
  });
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verifyBankIntegration = async () => {
    if (!bankDetails.bankCode || !bankDetails.apiEndpoint) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate bank verification process
    setTimeout(() => {
      const mockResults = {
        bankInfo: {
          name: 'First National Bank',
          country: 'United States',
          regulatoryBody: 'FDIC',
          swiftCode: 'FNBKUS33',
          isRegulated: true
        },
        apiValidation: {
          endpointReachable: Math.random() > 0.1,
          sslValid: Math.random() > 0.05,
          authenticationValid: Math.random() > 0.2,
          responseTimeMs: Math.floor(Math.random() * 500) + 50,
          rateLimit: '1000 requests/hour',
          apiVersion: 'v2.1'
        },
        complianceChecks: {
          pci_dss: 'compliant',
          sox: 'compliant',
          gdpr: 'compliant',
          psd2: 'compliant',
          aml: 'compliant'
        },
        securityScore: Math.floor(Math.random() * 30) + 70,
        riskFactors: [
          { 
            category: 'API Security',
            level: 'low',
            description: 'Strong encryption and authentication'
          },
          {
            category: 'Regulatory Compliance',
            level: 'low',
            description: 'All required certifications present'
          },
          {
            category: 'Data Protection',
            level: 'medium',
            description: 'Standard data retention policies'
          }
        ]
      };
      
      setVerificationResults(mockResults);
      setIsVerifying(false);
      
      toast({
        title: "Verification Complete",
        description: `Bank integration verified with ${mockResults.securityScore}% security score`,
      });
    }, 3000);
  };

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge className="bg-green-100 text-green-600">Compliant</Badge>;
      case 'partial': return <Badge className="bg-yellow-100 text-yellow-600">Partial</Badge>;
      case 'non-compliant': return <Badge className="bg-red-100 text-red-600">Non-Compliant</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return <Badge className="bg-green-100 text-green-600">Low Risk</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-600">Medium Risk</Badge>;
      case 'high': return <Badge className="bg-red-100 text-red-600">High Risk</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Bank Integration Verification
          </CardTitle>
          <CardDescription>
            Verify bank system integration authenticity and security compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankCode">Bank Code / SWIFT</Label>
              <Input
                id="bankCode"
                placeholder="e.g., FNBKUS33"
                value={bankDetails.bankCode}
                onChange={(e) => setBankDetails({...bankDetails, bankCode: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">API Endpoint</Label>
              <Input
                id="apiEndpoint"
                placeholder="https://api.bank.com/v1"
                value={bankDetails.apiEndpoint}
                onChange={(e) => setBankDetails({...bankDetails, apiEndpoint: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key (Optional)</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter API key for enhanced verification"
              value={bankDetails.apiKey}
              onChange={(e) => setBankDetails({...bankDetails, apiKey: e.target.value})}
            />
          </div>
          
          <Button 
            onClick={verifyBankIntegration} 
            disabled={isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <>
                <Shield className="w-4 h-4 mr-2 animate-spin" />
                Verifying Bank Integration...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Verify Bank Integration
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {verificationResults && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api">API Status</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bank Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Bank Name</Label>
                    <p className="font-medium">{verificationResults.bankInfo.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Country</Label>
                    <p className="font-medium">{verificationResults.bankInfo.country}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">SWIFT Code</Label>
                    <p className="font-medium">{verificationResults.bankInfo.swiftCode}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Regulatory Body</Label>
                    <p className="font-medium">{verificationResults.bankInfo.regulatoryBody}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <Label className="text-sm text-muted-foreground">Security Score</Label>
                    <p className="text-2xl font-bold">{verificationResults.securityScore}%</p>
                  </div>
                  <Badge className="bg-green-100 text-green-600">Verified Bank</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Validation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span>Endpoint Reachable</span>
                    <div className="flex items-center gap-2">
                      {verificationResults.apiValidation.endpointReachable ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>SSL Certificate</span>
                    <div className="flex items-center gap-2">
                      {verificationResults.apiValidation.sslValid ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Authentication</span>
                    <div className="flex items-center gap-2">
                      {verificationResults.apiValidation.authenticationValid ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Response Time</span>
                    <span className="font-medium">{verificationResults.apiValidation.responseTimeMs}ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(verificationResults.complianceChecks).map(([standard, status]) => (
                  <div key={standard} className="flex items-center justify-between">
                    <span className="uppercase font-medium">{standard.replace('_', '-')}</span>
                    {getComplianceBadge(status as string)}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {verificationResults.riskFactors.map((factor: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{factor.category}</p>
                        {getRiskBadge(factor.level)}
                      </div>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default BankIntegrationVerification;
