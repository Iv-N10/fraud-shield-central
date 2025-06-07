
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  FileText,
  Calculator,
  Target,
  Globe,
  Users
} from 'lucide-react';

interface RiskArea {
  id: string;
  name: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  impact: number;
  likelihood: number;
  score: number;
  description: string;
  mitigations: string[];
  recommendations: string[];
}

const RiskAssessment = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const riskAreas: RiskArea[] = [
    {
      id: '1',
      name: 'Cross-Border Data Transfers',
      category: 'Data Privacy',
      riskLevel: 'high',
      impact: 85,
      likelihood: 40,
      score: 34,
      description: 'Risk of inadequate safeguards for international data transfers',
      mitigations: [
        'Standard Contractual Clauses implemented',
        'Regular adequacy decision monitoring',
        'Data mapping and inventory maintained'
      ],
      recommendations: [
        'Implement additional technical safeguards',
        'Regular legal basis assessments',
        'Data localization where required'
      ]
    },
    {
      id: '2',
      name: 'AI Model Bias',
      category: 'AI/ML',
      riskLevel: 'medium',
      impact: 70,
      likelihood: 35,
      score: 25,
      description: 'Risk of discriminatory outcomes from AI fraud detection',
      mitigations: [
        'Regular bias testing implemented',
        'Diverse training datasets used',
        'Human oversight in place'
      ],
      recommendations: [
        'Expand bias testing across all demographics',
        'Implement explainable AI features',
        'Regular model retraining schedule'
      ]
    },
    {
      id: '3',
      name: 'False Positive Customer Impact',
      category: 'Customer Relations',
      riskLevel: 'medium',
      impact: 60,
      likelihood: 50,
      score: 30,
      description: 'Risk of customer dissatisfaction from incorrect fraud flags',
      mitigations: [
        'Fast appeal process established',
        'Customer service team trained',
        'Compensation policies in place'
      ],
      recommendations: [
        'Reduce false positive thresholds',
        'Improve customer communication',
        'Enhanced dispute resolution process'
      ]
    },
    {
      id: '4',
      name: 'Regulatory Compliance Gaps',
      category: 'Compliance',
      riskLevel: 'high',
      impact: 90,
      likelihood: 25,
      score: 23,
      description: 'Risk of non-compliance with evolving regulations',
      mitigations: [
        'Regular compliance audits',
        'Legal team monitoring updates',
        'Policy update procedures'
      ],
      recommendations: [
        'Automated compliance monitoring',
        'External legal counsel engagement',
        'Industry association participation'
      ]
    }
  ];

  const categories = ['all', 'Data Privacy', 'AI/ML', 'Customer Relations', 'Compliance'];

  const filteredRisks = selectedCategory === 'all' 
    ? riskAreas 
    : riskAreas.filter(risk => risk.category === selectedCategory);

  const getRiskBadge = (level: string) => {
    switch (level) {
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

  const overallRiskScore = Math.round(
    riskAreas.reduce((sum, risk) => sum + risk.score, 0) / riskAreas.length
  );

  const riskDistribution = {
    high: riskAreas.filter(r => r.riskLevel === 'high').length,
    medium: riskAreas.filter(r => r.riskLevel === 'medium').length,
    low: riskAreas.filter(r => r.riskLevel === 'low').length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Legal Risk Assessment</h2>
          <p className="text-muted-foreground">
            Comprehensive risk analysis and mitigation strategies
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{overallRiskScore}</div>
            <p className="text-sm text-muted-foreground">Overall Risk Score</p>
            <Progress value={overallRiskScore} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{riskDistribution.high}</div>
            <p className="text-sm text-muted-foreground">High Risk Areas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{riskDistribution.medium}</div>
            <p className="text-sm text-muted-foreground">Medium Risk Areas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{riskDistribution.low}</div>
            <p className="text-sm text-muted-foreground">Low Risk Areas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="risks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risks">Risk Areas</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Plans</TabsTrigger>
          <TabsTrigger value="trends">Risk Trends</TabsTrigger>
          <TabsTrigger value="calculator">Risk Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="risks">
          <div className="space-y-4">
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

            <div className="grid gap-4">
              {filteredRisks.map((risk) => (
                <Card key={risk.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{risk.name}</CardTitle>
                        <CardDescription>{risk.category}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskBadge(risk.riskLevel)}
                        <div className="text-right">
                          <div className="text-lg font-bold">{risk.score}</div>
                          <div className="text-xs text-muted-foreground">Risk Score</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{risk.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium">Impact Level</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={risk.impact} className="flex-1" />
                          <span className="text-sm">{risk.impact}%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Likelihood</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={risk.likelihood} className="flex-1" />
                          <span className="text-sm">{risk.likelihood}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Current Mitigations</h4>
                        <ul className="text-sm space-y-1">
                          {risk.mitigations.map((mitigation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Shield className="h-3 w-3 mt-0.5 text-green-500" />
                              {mitigation}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="text-sm space-y-1">
                          {risk.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-3 w-3 mt-0.5 text-blue-500" />
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mitigation">
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Dashboard</CardTitle>
              <CardDescription>
                Track implementation of risk mitigation strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskAreas.map((risk) => (
                  <div key={risk.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{risk.name}</h4>
                      {getRiskBadge(risk.riskLevel)}
                    </div>
                    <div className="space-y-2">
                      {risk.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{rec}</span>
                          <Button size="sm" variant="outline">
                            Assign
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Risk Trend Analysis
              </CardTitle>
              <CardDescription>
                Historical risk trends and projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Risk Trend Charts</h3>
                <p className="text-muted-foreground">
                  Historical risk analysis and trend visualization would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Risk Calculator
              </CardTitle>
              <CardDescription>
                Calculate custom risk scenarios and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Risk Calculation Tool</h3>
                <p className="text-muted-foreground">
                  Interactive risk calculation interface would be implemented here
                </p>
                <Button className="mt-4">
                  Launch Calculator
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessment;
