
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Search,
  Globe,
  Ban,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface IPRisk {
  ip: string;
  riskScore: number;
  country: string;
  city: string;
  isp: string;
  threatTypes: string[];
  lastSeen: string;
  transactionCount: number;
  status: 'clean' | 'suspicious' | 'malicious' | 'blocked';
}

export default function IPReputationScoring() {
  const [searchIP, setSearchIP] = useState('');
  const [recentIPs, setRecentIPs] = useState<IPRisk[]>([
    {
      ip: '192.168.1.45',
      riskScore: 85,
      country: 'Russia',
      city: 'Moscow',
      isp: 'VPN Provider Ltd',
      threatTypes: ['VPN', 'Proxy', 'Botnet'],
      lastSeen: new Date(Date.now() - 300000).toISOString(),
      transactionCount: 23,
      status: 'malicious'
    },
    {
      ip: '10.0.0.123',
      riskScore: 65,
      country: 'United States',
      city: 'New York',
      isp: 'Residential ISP',
      threatTypes: ['High Velocity'],
      lastSeen: new Date(Date.now() - 600000).toISOString(),
      transactionCount: 8,
      status: 'suspicious'
    },
    {
      ip: '203.45.67.89',
      riskScore: 15,
      country: 'United Kingdom',
      city: 'London',
      isp: 'BT Group',
      threatTypes: [],
      lastSeen: new Date(Date.now() - 1800000).toISOString(),
      transactionCount: 3,
      status: 'clean'
    }
  ]);

  const [stats] = useState({
    totalChecked: 1247,
    blocked: 89,
    flagged: 156,
    clean: 1002
  });

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (score >= 30) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'malicious':
        return <Ban className="h-4 w-4 text-red-500" />;
      case 'suspicious':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'blocked':
        return <Shield className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const handleSearch = () => {
    if (!searchIP) return;
    
    // Simulate IP lookup
    const mockResult: IPRisk = {
      ip: searchIP,
      riskScore: Math.floor(Math.random() * 100),
      country: 'Unknown',
      city: 'Unknown',
      isp: 'Unknown ISP',
      threatTypes: Math.random() > 0.5 ? ['Proxy'] : [],
      lastSeen: new Date().toISOString(),
      transactionCount: Math.floor(Math.random() * 50),
      status: Math.random() > 0.7 ? 'suspicious' : 'clean'
    };

    setRecentIPs(prev => [mockResult, ...prev.slice(0, 9)]);
    setSearchIP('');
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Checked</p>
                <p className="text-2xl font-bold">{stats.totalChecked.toLocaleString()}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blocked IPs</p>
                <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
              </div>
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-2xl font-bold text-amber-600">{stats.flagged}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clean</p>
                <p className="text-2xl font-bold text-green-600">{stats.clean}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IP Search */}
      <Card>
        <CardHeader>
          <CardTitle>IP Address Lookup</CardTitle>
          <CardDescription>Check the reputation and risk score of any IP address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter IP address (e.g., 192.168.1.1)"
              value={searchIP}
              onChange={(e) => setSearchIP(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Check IP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent IP Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Recent IP Analysis</CardTitle>
          <CardDescription>Latest IP reputation checks and risk assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIPs.map((ipData, index) => (
              <div key={`${ipData.ip}-${index}`} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(ipData.status)}
                  <div>
                    <div className="font-mono font-medium">{ipData.ip}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{ipData.city}, {ipData.country}</span>
                      <span>•</span>
                      <span>{ipData.isp}</span>
                    </div>
                    {ipData.threatTypes.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {ipData.threatTypes.map((threat) => (
                          <Badge key={threat} variant="outline" className="text-xs">
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(ipData.riskScore)}`}>
                    Risk: {ipData.riskScore}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {ipData.transactionCount} transactions
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(ipData.lastSeen).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
