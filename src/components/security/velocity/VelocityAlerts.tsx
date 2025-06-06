
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  User, 
  AlertTriangle, 
  Activity,
  Clock
} from 'lucide-react';

interface VelocityAlert {
  id: string;
  type: 'transaction' | 'login' | 'card_testing' | 'account_creation';
  userId: string;
  count: number;
  timeWindow: string;
  threshold: number;
  riskScore: number;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

interface VelocityAlertsProps {
  alerts: VelocityAlert[];
}

export default function VelocityAlerts({ alerts }: VelocityAlertsProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'login':
        return <User className="h-4 w-4 text-green-500" />;
      case 'card_testing':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'account_creation':
        return <User className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'High Transaction Volume';
      case 'login':
        return 'Rapid Login Attempts';
      case 'card_testing':
        return 'Card Testing Pattern';
      case 'account_creation':
        return 'Mass Account Creation';
      default:
        return 'Unknown Pattern';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-500 text-white';
      case 'investigating':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Velocity Alerts</CardTitle>
        <CardDescription>Real-time velocity-based fraud detection alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[340px] overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(alert.type)}
                  <h4 className="font-medium text-sm">{getTypeLabel(alert.type)}</h4>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User: {alert.userId}</span>
                  <span className="font-medium">{alert.count} actions in {alert.timeWindow}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Threshold: {alert.threshold} | Risk: {alert.riskScore}%
                  </span>
                </div>
                
                <Progress value={(alert.count / alert.threshold) * 100} className="h-2" />
              </div>
            </div>
          ))}
          
          {alerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <p>No velocity alerts detected</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
