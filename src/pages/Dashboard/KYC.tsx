
import React, { useState, useEffect } from 'react';
import { FileUp, Check, Clock, X, Shield, ArrowRight, FileDown, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DocumentUploader } from '@/components/KYC/DocumentUploader';
import { KYCDocument, fetchUserDocuments, downloadDocument } from '@/services/kycService';
import { useQuery } from '@tanstack/react-query';

export default function KYC() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [documentType, setDocumentType] = useState('Passport');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  
  const { 
    data: documents = [], 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['kycDocuments'],
    queryFn: fetchUserDocuments
  });
  
  useEffect(() => {
    // Show error if any
    if (error) {
      toast({
        title: 'Error fetching documents',
        description: 'Could not load your documents. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);
  
  const handleUploadSuccess = (newDoc: KYCDocument) => {
    refetch();
    setActiveTab('documents');
  };
  
  const handleViewDocument = async (filePath: string) => {
    try {
      const url = await downloadDocument(filePath);
      window.open(url, '_blank');
    } catch (error) {
      toast({
        title: 'Error viewing document',
        description: 'Could not open the document. Please try again later.',
        variant: 'destructive',
      });
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
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input 
                        id="dob" 
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input 
                        id="nationality" 
                        placeholder="United States"
                        value={nationality}
                        onChange={e => setNationality(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <select 
                      id="documentType" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                    >
                      <option value="Passport">Passport</option>
                      <option value="Driver's License">Driver's License</option>
                      <option value="National ID">National ID Card</option>
                      <option value="Address Proof">Address Proof</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="documentFile">Upload Document</Label>
                    <DocumentUploader 
                      onUploadSuccess={handleUploadSuccess}
                      documentType={documentType}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="mt-2 text-sm text-muted-foreground">Loading documents...</p>
                      </div>
                    </div>
                  ) : documents.length > 0 ? (
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
                          {doc.filePath && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDocument(doc.filePath!)}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          )}
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
