
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Ban, AlertTriangle, CheckCircle } from 'lucide-react';

interface IPStatsCardsProps {
  stats: {
    totalChecked: number;
    blocked: number;
    flagged: number;
    clean: number;
  };
}

export default function IPStatsCards({ stats }: IPStatsCardsProps) {
  return (
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
  );
}
