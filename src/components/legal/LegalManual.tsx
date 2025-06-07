
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Book, 
  Search, 
  Download, 
  ExternalLink,
  Shield,
  Scale,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface LegalSection {
  id: string;
  title: string;
  category: string;
  risk: 'low' | 'medium' | 'high';
  lastUpdated: string;
  content: string;
  relatedSections: string[];
  applicableLaws: string[];
}

const LegalManual = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSection, setSelectedSection] = useState<LegalSection | null>(null);

  const legalSections: LegalSection[] = [
    {
      id: 'data-privacy',
      title: 'Data Privacy & Protection',
      category: 'Privacy',
      risk: 'high',
      lastUpdated: '2024-01-15',
      content: `
# Data Privacy & Protection Guidelines

## Overview
This section covers all aspects of customer data handling, storage, and processing to ensure compliance with global privacy regulations.

## Key Requirements
- **Data Minimization**: Only collect data necessary for fraud detection
- **Consent Management**: Explicit consent for data processing
- **Data Retention**: Clear policies on data retention periods
- **Right to Erasure**: Implement customer data deletion requests
- **Cross-border Transfers**: Proper safeguards for international data transfers

## Implementation Guidelines
1. **Data Collection**: Implement privacy-by-design principles
2. **Storage**: Use encryption at rest and in transit
3. **Access Control**: Role-based access to sensitive data
4. **Audit Trails**: Log all data access and modifications
5. **Breach Response**: 72-hour notification procedures

## Compliance Checklist
- [ ] Privacy impact assessment completed
- [ ] Data processing agreements in place
- [ ] Customer consent mechanisms implemented
- [ ] Data retention policies documented
- [ ] Cross-border transfer safeguards established
      `,
      relatedSections: ['fraud-detection', 'ai-processing'],
      applicableLaws: ['GDPR', 'CCPA', 'PIPEDA', 'LGPD']
    },
    {
      id: 'fraud-detection',
      title: 'Fraud Detection Legal Framework',
      category: 'Fraud Detection',
      risk: 'medium',
      lastUpdated: '2024-01-10',
      content: `
# Fraud Detection Legal Framework

## Overview
Legal guidelines for fraud detection activities, including false positive handling and customer communication.

## Key Principles
- **Reasonable Suspicion**: Base decisions on legitimate fraud indicators
- **Proportional Response**: Response should match the risk level
- **Customer Rights**: Maintain customer service during investigations
- **Documentation**: Detailed records of all decisions and actions

## False Positive Management
1. **Quick Resolution**: Establish clear escalation procedures
2. **Customer Communication**: Transparent notification processes
3. **Compensation**: Guidelines for customer impact mitigation
4. **Process Improvement**: Learn from false positive incidents

## Legal Protections
- Safe harbor provisions for good faith fraud prevention
- Compliance with banking regulations
- Industry standard practices documentation
      `,
      relatedSections: ['data-privacy', 'customer-communication'],
      applicableLaws: ['Bank Secrecy Act', 'Fair Credit Reporting Act', 'Electronic Fund Transfer Act']
    },
    {
      id: 'ai-processing',
      title: 'AI & Machine Learning Compliance',
      category: 'AI/ML',
      risk: 'high',
      lastUpdated: '2024-01-12',
      content: `
# AI & Machine Learning Compliance

## Overview
Legal requirements for AI-driven fraud detection, including algorithmic transparency and bias prevention.

## Key Requirements
- **Algorithmic Transparency**: Explainable AI decisions
- **Bias Testing**: Regular algorithm bias assessments
- **Human Oversight**: Human review of AI decisions
- **Model Documentation**: Complete model lifecycle documentation

## Explainable AI Requirements
1. **Decision Rationale**: Clear explanation of fraud determinations
2. **Feature Importance**: Identify key decision factors
3. **Appeal Process**: Customer dispute mechanisms
4. **Audit Trail**: Complete decision history

## Bias Prevention
- Regular testing across demographic groups
- Fairness metrics monitoring
- Diverse training data requirements
- Ongoing model validation
      `,
      relatedSections: ['data-privacy', 'fraud-detection'],
      applicableLaws: ['EU AI Act', 'GDPR Article 22', 'FCRA Section 615']
    },
    {
      id: 'customer-communication',
      title: 'Customer Communication & Disclosure',
      category: 'Communication',
      risk: 'medium',
      lastUpdated: '2024-01-08',
      content: `
# Customer Communication & Disclosure

## Overview
Requirements for customer notifications, disclosures, and communication during fraud detection processes.

## Notification Requirements
- **Fraud Alerts**: Immediate notification of suspected fraud
- **Account Actions**: Clear communication of any account restrictions
- **Resolution Updates**: Regular status updates during investigations
- **Privacy Notices**: Clear data usage disclosures

## Communication Standards
1. **Clarity**: Use plain language in all communications
2. **Timeliness**: Prompt notification of relevant events
3. **Accessibility**: Multiple communication channels available
4. **Documentation**: Record all customer communications

## Disclosure Requirements
- Data collection and usage purposes
- Third-party data sharing practices
- Customer rights and options
- Contact information for inquiries
      `,
      relatedSections: ['data-privacy', 'fraud-detection'],
      applicableLaws: ['Truth in Lending Act', 'Fair Debt Collection Practices Act', 'Telephone Consumer Protection Act']
    }
  ];

  const categories = ['all', 'Privacy', 'Fraud Detection', 'AI/ML', 'Communication'];

  const filteredSections = legalSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Legal Compliance Manual</h2>
          <p className="text-muted-foreground">
            Comprehensive legal guidelines for platform operations
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Manual
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search legal guidelines..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Legal Sections</CardTitle>
              <CardDescription>
                Select a section to view detailed guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {filteredSections.map((section) => (
                    <div
                      key={section.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedSection?.id === section.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedSection(section)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{section.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {section.category} • Updated {section.lastUpdated}
                          </p>
                        </div>
                        {getRiskBadge(section.risk)}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedSection ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      {selectedSection.title}
                    </CardTitle>
                    <CardDescription>
                      Category: {selectedSection.category} • Last updated: {selectedSection.lastUpdated}
                    </CardDescription>
                  </div>
                  {getRiskBadge(selectedSection.risk)}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {selectedSection.content}
                    </pre>
                  </div>
                </ScrollArea>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Applicable Laws & Regulations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSection.applicableLaws.map((law, index) => (
                        <Badge key={index} variant="outline">
                          {law}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Related Sections</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSection.relatedSections.map((sectionId, index) => {
                        const relatedSection = legalSections.find(s => s.id === sectionId);
                        return relatedSection ? (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedSection(relatedSection)}
                            className="text-primary"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {relatedSection.title}
                          </Button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[600px]">
                <div className="text-center">
                  <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Legal Section</h3>
                  <p className="text-muted-foreground">
                    Choose a section from the left to view detailed legal guidelines
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalManual;
