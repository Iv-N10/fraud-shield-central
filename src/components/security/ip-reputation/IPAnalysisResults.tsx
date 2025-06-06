
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Ban, AlertTriangle, CheckCircle } from 'lucide-react';

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

interface IPAnalysisResultsProps {
  recentIPs: IPRisk[];
}

export default function IPAnalysisResults({ recentIPs }: IPAnalysisResultsProps) {
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
        return <Ban className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
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
  );
}
