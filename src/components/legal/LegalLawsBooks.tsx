
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Scale, 
  AlertTriangle, 
  Search,
  FileText,
  Gavel,
  Shield,
  Eye,
  TrendingUp
} from 'lucide-react';

interface LegalCase {
  id: string;
  caseType: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  relevantLaws: string[];
  preventionSteps: string[];
  potentialConsequences: string[];
  relatedTransactions: number;
  dataSource: string[];
}

interface LegalBook {
  id: string;
  title: string;
  category: string;
  description: string;
  keyTopics: string[];
  applicableSections: string[];
  lastUpdated: string;
}

const LegalLawsBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const predictedCases: LegalCase[] = [
    {
      id: '1',
      caseType: 'Money Laundering Investigation',
      riskLevel: 'high',
      description: 'Pattern of transactions showing potential structuring to avoid reporting thresholds',
      relevantLaws: ['Bank Secrecy Act', '18 USC 1956', 'FinCEN Regulations'],
      preventionSteps: [
        'Enhanced customer due diligence',
        'Suspicious Activity Report filing',
        'Transaction monitoring alerts'
      ],
      potentialConsequences: [
        'Regulatory fines up to $1M',
        'Criminal prosecution',
        'License suspension'
      ],
      relatedTransactions: 15,
      dataSource: ['Transactions', 'KYC', 'Behavioral Analytics']
    },
    {
      id: '2',
      caseType: 'Privacy Violation Claim',
      riskLevel: 'medium',
      description: 'Cross-border data transfers without adequate privacy safeguards',
      relevantLaws: ['GDPR Article 46', 'CCPA Section 1798.140', 'Schrems II Decision'],
      preventionSteps: [
        'Standard Contractual Clauses implementation',
        'Data mapping and inventory',
        'Privacy impact assessments'
      ],
      potentialConsequences: [
        'GDPR fines up to 4% of revenue',
        'Class action lawsuits',
        'Operational restrictions'
      ],
      relatedTransactions: 45,
      dataSource: ['Data Privacy', 'AI Processing', 'Customer Data']
    },
    {
      id: '3',
      caseType: 'Discriminatory AI Practices',
      riskLevel: 'critical',
      description: 'AI fraud detection showing bias against protected classes',
      relevantLaws: ['Equal Credit Opportunity Act', 'Fair Housing Act', 'Civil Rights Act'],
      preventionSteps: [
        'Bias testing and validation',
        'Algorithmic impact assessments',
        'Diverse training datasets'
      ],
      potentialConsequences: [
        'Federal investigation',
        'Consent decree requirements',
        'Reputation damage'
      ],
      relatedTransactions: 89,
      dataSource: ['AI Monitor', 'Behavioral Analytics', 'Predictive Risk']
    },
    {
      id: '4',
      caseType: 'False Positive Damages',
      riskLevel: 'medium',
      description: 'High rate of incorrect fraud flags causing customer harm',
      relevantLaws: ['Fair Credit Reporting Act', 'State Consumer Protection Laws'],
      preventionSteps: [
        'Model accuracy improvements',
        'Fast dispute resolution',
        'Customer notification protocols'
      ],
      potentialConsequences: [
        'Individual damage claims',
        'Regulatory enforcement',
        'Model validation requirements'
      ],
      relatedTransactions: 234,
      dataSource: ['Transactions', 'AI Monitor', 'Customer Communications']
    }
  ];

  const legalBooks: LegalBook[] = [
    {
      id: '1',
      title: 'Banking Compliance Handbook',
      category: 'Financial Regulations',
      description: 'Comprehensive guide to banking laws, regulations, and compliance requirements',
      keyTopics: ['BSA/AML', 'OFAC Sanctions', 'Consumer Protection', 'Privacy Laws'],
      applicableSections: ['Transactions', 'KYC', 'Reports'],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'AI and Algorithmic Accountability Law',
      category: 'Technology Law',
      description: 'Legal framework for AI systems in financial services',
      keyTopics: ['Algorithmic Bias', 'Explainable AI', 'Model Governance', 'Fair Lending'],
      applicableSections: ['AI Monitor', 'Behavioral Analytics', 'Predictive Risk'],
      lastUpdated: '2024-01-10'
    },
    {
      id: '3',
      title: 'Data Privacy and Protection Guide',
      category: 'Privacy Law',
      description: 'Global privacy regulations and data protection requirements',
      keyTopics: ['GDPR', 'CCPA', 'Data Transfers', 'Consent Management'],
      applicableSections: ['Security', 'Customer Data', 'Reports'],
      lastUpdated: '2024-01-08'
    },
    {
      id: '4',
      title: 'Fraud Prevention Legal Framework',
      category: 'Fraud Law',
      description: 'Legal aspects of fraud detection and prevention systems',
      keyTopics: ['False Positives', 'Customer Rights', 'Evidence Standards', 'Liability'],
      applicableSections: ['Transactions', 'AI Monitor', 'Security'],
      lastUpdated: '2024-01-05'
    }
  ];

  const categories = ['all', 'Financial Regulations', 'Technology Law', 'Privacy Law', 'Fraud Law'];

  const filteredBooks = selectedCategory === 'all' 
    ? legalBooks 
    : legalBooks.filter(book => book.category === selectedCategory);

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <Badge variant="destructive" className="bg-red-600">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-600">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Book className="h-6 w-6" />
          Legal Laws & Books
        </h2>
        <p className="text-muted-foreground">
          Analyze potential legal cases based on platform data and access comprehensive legal resources
        </p>
      </div>

      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cases" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Predicted Cases
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Legal Library
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Case Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Potential Legal Cases Analysis
              </CardTitle>
              <CardDescription>
                AI-powered prediction of legal risks based on transaction patterns and platform data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {predictedCases.map((case_) => (
                  <div key={case_.id} className="p-6 border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{case_.caseType}</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on {case_.relatedTransactions} related transactions
                        </p>
                      </div>
                      {getRiskBadge(case_.riskLevel)}
                    </div>

                    <p className="text-sm mb-4">{case_.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Gavel className="h-4 w-4" />
                          Relevant Laws
                        </h4>
                        <ul className="text-sm space-y-1">
                          {case_.relevantLaws.map((law, index) => (
                            <li key={index} className="p-2 bg-muted rounded text-muted-foreground">
                              {law}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Prevention Steps
                        </h4>
                        <ul className="text-sm space-y-1">
                          {case_.preventionSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Potential Consequences
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {case_.potentialConsequences.map((consequence, index) => (
                          <Badge key={index} variant="outline" className="border-red-200 text-red-600">
                            {consequence}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Data Sources</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_.dataSource.map((source, index) => (
                          <Badge key={index} variant="secondary">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search legal books..."
                className="pl-10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>{book.category}</CardDescription>
                    </div>
                    <Book className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {book.keyTopics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Applicable Sections</h4>
                      <div className="flex flex-wrap gap-1">
                        {book.applicableSections.map((section, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last updated: {book.lastUpdated}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm">
                      <Book className="w-3 h-3 mr-1" />
                      Open Book
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-3 h-3 mr-1" />
                      Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-sm text-muted-foreground">High Risk Cases</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">2</div>
                <p className="text-sm text-muted-foreground">Medium Risk Cases</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">383</div>
                <p className="text-sm text-muted-foreground">Total Transactions Analyzed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Case Trend Analysis</CardTitle>
              <CardDescription>
                Legal risk trends over time based on platform data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Legal Risk Trends</h3>
                <p className="text-muted-foreground">
                  Trend analysis charts showing legal risk patterns over time would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalLawsBooks;
