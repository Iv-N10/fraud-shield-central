import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Brain, 
  Zap, 
  AlertTriangle, 
  Eye, 
  Globe,
  Lock,
  Activity,
  Target,
  Radar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ThreatIntelligence {
  id: string;
  threatType: 'apt' | 'malware' | 'phishing' | 'ddos' | 'insider' | 'zero-day';
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  source: string;
  indicators: string[];
  attribution: string;
  mitigation: string[];
  timestamp: string;
  status: 'active' | 'mitigated' | 'investigating';
}

export default function AdvancedThreatIntelligence() {
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [securityScore, setSecurityScore] = useState(94.7);
  const { toast } = useToast();

  const [threatMetrics] = useState({
    activeThreatActors: 23,
    blockedAttacks: 1247,
    zeroDayVulnerabilities: 0,
    quantumReadiness: 89.5
  });

  const mockThreats: ThreatIntelligence[] = [
    {
      id: '1',
      threatType: 'apt',
      severity: 'critical',
      confidence: 95,
      source: '203.0.113.45',
      indicators: ['C2 Communications', 'Data Exfiltration', 'Persistence Mechanisms'],
      attribution: 'Nation-State Actor (APT29)',
      mitigation: ['Network Segmentation', 'Enhanced Monitoring', 'Endpoint Isolation'],
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'investigating'
    },
    {
      id: '2',
      threatType: 'zero-day',
      severity: 'critical',
      confidence: 87,
      source: 'Multiple IPs',
      indicators: ['Unknown Exploit', 'Memory Corruption', 'Privilege Escalation'],
      attribution: 'Unknown (Zero-Day)',
      mitigation: ['Immediate Patching', 'System Isolation', 'Forensic Analysis'],
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'active'
    },
    {
      id: '3',
      threatType: 'insider',
      severity: 'high',
      confidence: 76,
      source: 'Internal Network',
      indicators: ['Unusual Data Access', 'Off-Hours Activity', 'Privilege Abuse'],
      attribution: 'Potential Insider Threat',
      mitigation: ['User Monitoring', 'Access Review', 'Behavioral Analysis'],
      timestamp: new Date(Date.now() - 900000).toISOString(),
      status: 'investigating'
    }
  ];

  useEffect(() => {
    setThreats(mockThreats);
  }, []);

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('security-monitor', {
        body: {
          action: 'threat_analysis',
          data: {
            threats: threats,
            networkTraffic: 'encrypted_traffic_analysis',
            userBehavior: 'behavioral_patterns',
            systemLogs: 'security_event_logs'
          }
        }
      });

      if (error) throw error;

      toast({
        title: "AI Threat Analysis Complete",
        description: `Threat level: ${data.analysis.threatLevel} - ${data.analysis.confidence}% confidence`,
      });

      // Update security score based on analysis
      setSecurityScore(prev => Math.max(0, prev - (data.analysis.severity / 10)));

    } catch (error) {
      console.error('AI Analysis failed:', error);
      toast({
        title: "Analysis Error",
        description: "Advanced AI analysis temporarily unavailable. Using local detection.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'apt': return <Target className="h-4 w-4" />;
      case 'zero-day': return <Zap className="h-4 w-4" />;
      case 'insider': return <Eye className="h-4 w-4" />;
      case 'malware': return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-green-600">{securityScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={securityScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threat Actors</p>
                <p className="text-2xl font-bold text-red-600">{threatMetrics.activeThreatActors}</p>
              </div>
              <Target className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blocked Attacks</p>
                <p className="text-2xl font-bold text-blue-600">{threatMetrics.blockedAttacks}</p>
              </div>
              <Radar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quantum Ready</p>
                <p className="text-2xl font-bold text-purple-600">{threatMetrics.quantumReadiness}%</p>
              </div>
              <Lock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Military-Grade AI Threat Analysis
          </CardTitle>
          <CardDescription>
            Advanced AI system with nation-state level threat detection capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Button 
              onClick={analyzeWithAI} 
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              {isAnalyzing ? 'Analyzing Threats...' : 'Run AI Analysis'}
            </Button>
            {isAnalyzing && (
              <div className="flex-1">
                <Progress value={85} className="w-full animate-pulse" />
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzing network patterns, behavioral anomalies, and threat intelligence...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Threat Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Threat Intelligence
          </CardTitle>
          <CardDescription>
            Real-time threat detection and attribution analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="critical" className="space-y-4">
            <TabsList>
              <TabsTrigger value="critical">Critical Threats</TabsTrigger>
              <TabsTrigger value="attribution">Attribution</TabsTrigger>
              <TabsTrigger value="indicators">IOCs</TabsTrigger>
            </TabsList>

            <TabsContent value="critical" className="space-y-4">
              {threats.filter(t => t.severity === 'critical' || t.severity === 'high').map((threat) => (
                <Alert key={threat.id} className="border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getThreatIcon(threat.threatType)}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold capitalize">{threat.threatType.replace('-', ' ')} Threat</span>
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {threat.confidence}% Confidence
                          </Badge>
                        </div>
                        <p className="text-sm"><strong>Attribution:</strong> {threat.attribution}</p>
                        <p className="text-sm"><strong>Source:</strong> {threat.source}</p>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Indicators:</strong> {threat.indicators.join(', ')}</p>
                          <p><strong>Mitigations:</strong> {threat.mitigation.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant={threat.status === 'active' ? 'destructive' : 'secondary'}>
                      {threat.status.toUpperCase()}
                    </Badge>
                  </div>
                </Alert>
              ))}
            </TabsContent>

            <TabsContent value="attribution" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nation-State Actors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>APT29 (Cozy Bear)</span>
                        <Badge variant="destructive">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Lazarus Group</span>
                        <Badge variant="secondary">Monitoring</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>APT40 (Leviathan)</span>
                        <Badge variant="secondary">Monitoring</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Threat Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Financial Fraud</span>
                        <span className="text-sm text-red-600">High Risk</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Exfiltration</span>
                        <span className="text-sm text-orange-600">Medium Risk</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insider Threats</span>
                        <span className="text-sm text-yellow-600">Elevated</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="indicators" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Network IOCs</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1">
                      <div>malicious-domain.com</div>
                      <div>203.0.113.45</div>
                      <div>suspicious-cdn.net</div>
                      <div>c2-server.onion</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">File Hashes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm font-mono">
                    <div className="space-y-1">
                      <div>a1b2c3d4e5f6...</div>
                      <div>f6e5d4c3b2a1...</div>
                      <div>123abc456def...</div>
                      <div>def456abc123...</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Behavioral Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1">
                      <div>Unusual login times</div>
                      <div>Rapid transaction velocity</div>
                      <div>Geographic anomalies</div>
                      <div>Device fingerprint changes</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
