
import React, { useState } from 'react';
import { FileUp, Check, Clock, X, Shield, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function KYC() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [documents, setDocuments] = useState<{
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'verified' | 'rejected';
    dateUploaded: string;
  }[]>([
    {
      id: '1',
      name: 'passport.jpg',
      type: 'Passport',
      status: 'verified',
      dateUploaded: '2023-10-12'
    },
    {
      id: '2',
      name: 'address_proof.pdf',
      type: 'Address Proof',
      status: 'verified',
      dateUploaded: '2023-10-12'
    }
  ]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Start fake progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null) return 0;
          if (prev >= 95) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      // After "upload" completes
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(null);
        
        const newDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: 'ID Document',
          status: 'pending' as const,
          dateUploaded: new Date().toISOString().split('T')[0]
        };
        
        setDocuments(prev => [...prev, newDocument]);
        
        toast({
          title: 'Document uploaded',
          description: 'Your document has been uploaded and is pending verification.'
        });
        
        setActiveTab('documents');
      }, 2000);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="border-amber-500 text-amber-600">Pending</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground">Upload and manage identity verification documents</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Identity Verification</CardTitle>
                <TabsList>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                Upload identification documents to complete verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="upload" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input id="nationality" placeholder="United States" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <select 
                      id="documentType" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select document type</option>
                      <option value="passport">Passport</option>
                      <option value="driverLicense">Driver's License</option>
                      <option value="nationalId">National ID Card</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="documentFile">Upload Document</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/30">
                      <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="mb-1 font-medium">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supported formats: JPG, PNG, PDF, max 10MB
                      </p>
                      <Input 
                        id="documentFile" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      <Button onClick={() => document.getElementById('documentFile')?.click()}>
                        Select File
                      </Button>
                      
                      {uploadProgress !== null && (
                        <div className="w-full mt-4 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="space-y-4">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <div key={doc.id} className="p-4 border rounded-md flex items-center justify-between bg-card">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(doc.status)}
                          <div>
                            <p className="font-medium">{doc.type}</p>
                            <p className="text-sm text-muted-foreground">{doc.name} • {doc.dateUploaded}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No documents uploaded yet</p>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => setActiveTab('upload')}
                      >
                        Upload Document
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save & Continue</Button>
            </CardFooter>
          </Tabs>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">Mostly Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Basic verification complete. Enhanced verification pending.
                </p>
                <Progress value={75} className="h-2 w-full mt-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Basic Identity Verification</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Document Upload</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Enhanced Verification</span>
                </div>
                
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full border border-dashed flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Account Approval</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
