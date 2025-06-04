
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  Brain, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Users,
  DollarSign,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const queryExamples = [
  "Show me all high-risk transactions from last week",
  "What are the top 5 fraud patterns this month?",
  "Find transactions over $10,000 from new devices",
  "Which users have the highest risk scores?",
  "Show me fraud trends by geographic location",
  "What's the average transaction amount for flagged users?",
];

const queryResults = [
  {
    id: '1',
    query: "Show me all high-risk transactions from last week",
    results: 23,
    type: 'transactions',
    summary: "Found 23 high-risk transactions totaling $156,780",
    insights: [
      "67% occurred during non-business hours",
      "Most common: card-not-present transactions",
      "Average amount: $6,816 per transaction"
    ]
  },
  {
    id: '2',
    query: "What are the top fraud patterns this month?",
    results: 8,
    type: 'patterns',
    summary: "Identified 8 distinct fraud patterns",
    insights: [
      "Velocity fraud increased 34%",
      "Account takeover attempts up 12%",
      "Synthetic identity fraud stable"
    ]
  },
  {
    id: '3',
    query: "Find users with suspicious location changes",
    results: 47,
    type: 'users',
    summary: "47 users with irregular location patterns",
    insights: [
      "15 users traveled >1000 miles in 24h",
      "VPN usage detected in 8 cases",
      "Cross-border transactions flagged: 24"
    ]
  }
];

export default function NaturalLanguageQuery() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState(queryResults);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Query Processed",
        description: `AI has analyzed your query: "${query}"`,
      });
      
      // Add to search history
      const newResult = {
        id: Date.now().toString(),
        query: query,
        results: Math.floor(Math.random() * 100) + 1,
        type: 'mixed',
        summary: `AI analysis completed for: "${query}"`,
        insights: [
          "Analysis based on latest data patterns",
          "Cross-referenced with fraud indicators",
          "Results filtered for relevance"
        ]
      };
      
      setSearchHistory([newResult, ...searchHistory.slice(0, 4)]);
      setQuery('');
    }, 2000);
  };

  const useExampleQuery = (example: string) => {
    setQuery(example);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'transactions':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'patterns':
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case 'users':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8" />
          Natural Language Query
        </h1>
        <p className="text-muted-foreground">Ask questions about your fraud data in plain English</p>
      </div>

      {/* Query Input */}
      <Card>
        <CardHeader>
          <CardTitle>Ask FraudShield AI</CardTitle>
          <CardDescription>
            Type your question in natural language - our AI will analyze your data and provide insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="e.g., Show me all suspicious transactions over $5,000 this week..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !query.trim()}
              className="flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Ask AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Query Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Try These Examples</CardTitle>
          <CardDescription>Click on any example to use it as your query</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {queryExamples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 text-left justify-start"
                onClick={() => useExampleQuery(example)}
              >
                <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{example}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search History & Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Queries</CardTitle>
          <CardDescription>Your recent AI-powered fraud analysis queries and results</CardDescription>
        </CardHeader>
        <CardContent>
          {searchHistory.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No queries yet</h3>
              <p className="text-muted-foreground">
                Start asking questions to see your analysis history here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchHistory.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2">
                      {getResultIcon(result.type)}
                      <div>
                        <h4 className="font-medium text-sm">{result.query}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{result.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{result.results} results</Badge>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Key Insights:</p>
                    {result.insights.map((insight, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>AI Query Capabilities</CardTitle>
          <CardDescription>What you can ask FraudShield AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 border rounded-lg">
              <DollarSign className="h-5 w-5 text-green-500 mb-2" />
              <h4 className="font-medium text-sm mb-1">Transaction Analysis</h4>
              <p className="text-xs text-muted-foreground">
                Query transactions by amount, time, location, risk score, and patterns
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <Users className="h-5 w-5 text-blue-500 mb-2" />
              <h4 className="font-medium text-sm mb-1">User Behavior</h4>
              <p className="text-xs text-muted-foreground">
                Analyze user patterns, risk profiles, and behavioral anomalies
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-500 mb-2" />
              <h4 className="font-medium text-sm mb-1">Fraud Patterns</h4>
              <p className="text-xs text-muted-foreground">
                Identify trends, compare periods, and discover emerging threats
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <MapPin className="h-5 w-5 text-orange-500 mb-2" />
              <h4 className="font-medium text-sm mb-1">Geographic Data</h4>
              <p className="text-xs text-muted-foreground">
                Location-based analysis, travel patterns, and regional risks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
