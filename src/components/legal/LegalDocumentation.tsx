import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Upload, 
  Calendar, 
  Shield,
  Gavel,
  Building,
  Users
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'policy' | 'contract' | 'compliance' | 'procedure';
  version: string;
  lastUpdated: string;
  status: 'current' | 'outdated' | 'draft';
  description: string;
  downloadUrl?: string;
}

const LegalDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const documents: Document[] = [
    {
      id: '1',
      title: 'Data Processing Agreement Template',
      type: 'contract',
      version: '2.1',
      lastUpdated: '2024-01-15',
      status: 'current',
      description: 'Standard DPA template for client onboarding'
    },
    {
      id: '2',
      title: 'Privacy Policy Framework',
      type: 'policy',
      version: '1.8',
      lastUpdated: '2024-01-10',
      status: 'current',
      description: 'Comprehensive privacy policy template'
    },
    {
      id: '3',
      title: 'GDPR Compliance Checklist',
      type: 'compliance',
      version: '3.0',
      lastUpdated: '2024-01-08',
      status: 'current',
      description: 'Step-by-step GDPR compliance verification'
    },
    {
      id: '4',
      title: 'Incident Response Procedures',
      type: 'procedure',
      version: '1.5',
      lastUpdated: '2023-12-20',
      status: 'outdated',
      description: 'Legal procedures for data breach incidents'
    },
    {
      id: '5',
      title: 'AI Ethics Guidelines',
      type: 'policy',
      version: '1.0',
      lastUpdated: '2024-01-12',
      status: 'current',
      description: 'Ethical AI development and deployment standards'
    },
    {
      id: '6',
      title: 'Customer Terms of Service',
      type: 'contract',
      version: '2.3',
      lastUpdated: '2024-01-05',
      status: 'draft',
      description: 'Updated terms of service for platform users'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge className="bg-green-100 text-green-600 border-green-200">Current</Badge>;
      case 'outdated':
        return <Badge className="bg-red-100 text-red-600 border-red-200">Outdated</Badge>;
      case 'draft':
        return <Badge className="bg-amber-100 text-amber-600 border-amber-200">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'policy':
        return <Shield className="h-4 w-4" />;
      case 'contract':
        return <Gavel className="h-4 w-4" />;
      case 'compliance':
        return <Building className="h-4 w-4" />;
      case 'procedure':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const documentStats = {
    total: documents.length,
    current: documents.filter(d => d.status === 'current').length,
    outdated: documents.filter(d => d.status === 'outdated').length,
    draft: documents.filter(d => d.status === 'draft').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Legal Documentation</h2>
          <p className="text-muted-foreground">
            Manage and access all legal documents and templates
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{documentStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{documentStats.current}</div>
            <p className="text-sm text-muted-foreground">Current</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{documentStats.draft}</div>
            <p className="text-sm text-muted-foreground">Draft</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{documentStats.outdated}</div>
            <p className="text-sm text-muted-foreground">Outdated</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="policy">Policies</TabsTrigger>
            <TabsTrigger value="contract">Contracts</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="procedure">Procedures</TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <Input
              placeholder="Search documents..."
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Legal Documents</CardTitle>
              <CardDescription>
                Complete library of legal documents and templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(doc.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{doc.title}</h4>
                          <span className="text-sm text-muted-foreground">v{doc.version}</span>
                          {getStatusBadge(doc.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {doc.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would filter by type */}
        <TabsContent value="policy">
          <Card>
            <CardHeader>
              <CardTitle>Policy Documents</CardTitle>
              <CardDescription>
                Internal policies and guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.filter(d => d.type === 'policy').map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(doc.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{doc.title}</h4>
                          <span className="text-sm text-muted-foreground">v{doc.version}</span>
                          {getStatusBadge(doc.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {doc.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalDocumentation;
