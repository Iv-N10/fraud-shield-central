
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Eye,
  BarChart3,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

interface AIDecision {
  transactionId: string;
  decision: 'approved' | 'flagged' | 'blocked';
  riskScore: number;
  confidence: number;
  factors: AIFactor[];
  timestamp: string;
  userId: string;
  amount: number;
}

interface AIFactor {
  name: string;
  impact: number;
  value: string | number;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

export default function ExplainableAI() {
  const [searchTransactionId, setSearchTransactionId] = useState('');
  const [selectedDecision, setSelectedDecision] = useState<AIDecision | null>(null);
  
  const [recentDecisions] = useState<AIDecision[]>([
    {
      transactionId: 'TXN-789123',
      decision: 'flagged',
      riskScore: 85,
      confidence: 92,
      userId: 'user_12345',
      amount: 2500,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      factors: [
        {
          name: 'Velocity Pattern',
          impact: 35,
          value: '5 transactions in 10 minutes',
          description: 'Unusually high transaction frequency detected',
          type: 'negative'
        },
        {
          name: 'Geolocation',
          impact: 25,
          value: 'New York → London (2 hours)',
          description: 'Impossible travel time between locations',
          type: 'negative'
        },
        {
          name: 'Amount Pattern',
          impact: 15,
          value: '$2,500',
          description: 'Amount significantly higher than user average ($150)',
          type: 'negative'
        },
        {
          name: 'Device Fingerprint',
          impact: 10,
          value: 'New device',
          description: 'Transaction from unrecognized device',
          type: 'negative'
        },
        {
          name: 'User History',
          impact: -5,
          value: '2 years, clean record',
          description: 'Long-standing customer with good history',
          type: 'positive'
        }
      ]
    },
    {
      transactionId: 'TXN-456789',
      decision: 'approved',
      riskScore: 25,
      confidence: 88,
      userId: 'user_67890',
      amount: 89,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      factors: [
        {
          name: 'Behavioral Pattern',
          impact: -20,
          value: 'Consistent with user profile',
          description: 'Transaction matches typical user behavior',
          type: 'positive'
        },
        {
          name: 'Time Pattern',
          impact: -15,
          value: 'Regular business hours',
          description: 'Transaction during user\'s typical active hours',
          type: 'positive'
        },
        {
          name: 'Location',
          impact: -10,
          value: 'Home location',
          description: 'Transaction from user\'s registered location',
          type: 'positive'
        },
        {
          name: 'Amount',
          impact: 5,
          value: '$89',
          description: 'Slightly above average but within normal range',
          type: 'neutral'
        }
      ]
    },
    {
      transactionId: 'TXN-321654',
      decision: 'blocked',
      riskScore: 96,
      confidence: 99,
      userId: 'user_54321',
      amount: 5000,
      timestamp: new Date(Date.now() - 900000).toISOString(),
      factors: [
        {
          name: 'Known Fraud Pattern',
          impact: 40,
          value: 'Card testing signature',
          description: 'Matches known fraudulent transaction patterns',
          type: 'negative'
        },
        {
          name: 'IP Reputation',
          impact: 30,
          value: 'Blacklisted IP range',
          description: 'Transaction from known malicious IP address',
          type: 'negative'
        },
        {
          name: 'Synthetic Identity',
          impact: 20,
          value: '85% probability',
          description: 'High likelihood of synthetic identity fraud',
          type: 'negative'
        },
        {
          name: 'Account Age',
          impact: 15,
          value: '2 days old',
          description: 'Very new account with high-value transaction',
          type: 'negative'
        }
      ]
    }
  ]);

  const searchDecision = () => {
    if (!searchTransactionId) return;
    
    const found = recentDecisions.find(d => d.transactionId === searchTransactionId);
    if (found) {
      setSelectedDecision(found);
    } else {
      // Generate mock decision for demo
      const mockDecision: AIDecision = {
        transactionId: searchTransactionId,
        decision: Math.random() > 0.5 ? 'approved' : 'flagged',
        riskScore: Math.floor(Math.random() * 100),
        confidence: Math.floor(Math.random() * 40) + 60,
        userId: `user_${Math.floor(Math.random() * 100000)}`,
        amount: Math.floor(Math.random() * 5000) + 10,
        timestamp: new Date().toISOString(),
        factors: [
          {
            name: 'User Behavior',
            impact: Math.floor(Math.random() * 40) - 20,
            value: 'Analysis complete',
            description: 'Behavioral analysis based on historical patterns',
            type: Math.random() > 0.5 ? 'positive' : 'negative'
          }
        ]
      };
      setSelectedDecision(mockDecision);
    }
    setSearchTransactionId('');
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'approved':
        return 'bg-green-500 text-white';
      case 'flagged':
        return 'bg-amber-500 text-white';
      case 'blocked':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getFactorIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return 'text-red-600';
    if (impact < 0) return 'text-green-600';
    return 'text-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* AI Explanation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Decisions Explained</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Model Accuracy</p>
                <p className="text-2xl font-bold">96.8%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Explain AI Decision
          </CardTitle>
          <CardDescription>
            Search for any transaction to understand why the AI made its decision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter transaction ID (e.g., TXN-789123)"
              value={searchTransactionId}
              onChange={(e) => setSearchTransactionId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchDecision()}
              className="flex-1"
            />
            <Button onClick={searchDecision} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Explain Decision
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision Explanation */}
        {selectedDecision && (
          <Card>
            <CardHeader>
              <CardTitle>AI Decision Explanation</CardTitle>
              <CardDescription>
                Detailed breakdown of factors that influenced the AI decision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Decision Summary */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Transaction {selectedDecision.transactionId}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${selectedDecision.amount.toLocaleString()} • {selectedDecision.userId}
                      </p>
                    </div>
                    <Badge className={getDecisionColor(selectedDecision.decision)}>
                      {selectedDecision.decision.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Score</span>
                      <span className="font-medium">{selectedDecision.riskScore}%</span>
                    </div>
                    <Progress value={selectedDecision.riskScore} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>AI Confidence</span>
                      <span className="font-medium">{selectedDecision.confidence}%</span>
                    </div>
                    <Progress value={selectedDecision.confidence} className="h-2" />
                  </div>
                </div>

                {/* Factor Analysis */}
                <div>
                  <h5 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Contributing Factors
                  </h5>
                  <div className="space-y-3">
                    {selectedDecision.factors
                      .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
                      .map((factor, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getFactorIcon(factor.type)}
                            <span className="font-medium text-sm">{factor.name}</span>
                          </div>
                          <span className={`text-sm font-medium ${getImpactColor(factor.impact)}`}>
                            {factor.impact > 0 ? '+' : ''}{factor.impact}%
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Value:</strong> {factor.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {factor.description}
                        </div>
                        <div className="mt-2">
                          <Progress 
                            value={Math.abs(factor.impact) * 2.5} 
                            className={`h-1 ${factor.impact > 0 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Decisions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Decisions</CardTitle>
            <CardDescription>Latest transactions with AI explanations available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDecisions.map((decision) => (
                <div
                  key={decision.transactionId}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setSelectedDecision(decision)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{decision.transactionId}</span>
                    <Badge className={getDecisionColor(decision.decision)}>
                      {decision.decision}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${decision.amount.toLocaleString()} • Risk: {decision.riskScore}%
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(decision.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Model Insights</CardTitle>
          <CardDescription>Understanding how our AI makes fraud detection decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Machine Learning Model</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ensemble of gradient boosting and neural networks trained on 50M+ transactions
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Feature Engineering</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                200+ engineered features including behavioral patterns, velocity metrics, and risk indicators
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-amber-500" />
                <h4 className="font-medium">Continuous Learning</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Model retrains daily on new data and adapts to emerging fraud patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
