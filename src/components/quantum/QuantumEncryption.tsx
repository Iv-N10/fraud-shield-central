
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Zap, Lock, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuantumMetrics {
  encryptionStrength: number;
  quantumReadiness: number;
  keyRotationFreq: number;
  protocolsActive: number;
  threatsBlocked: number;
}

export default function QuantumEncryption() {
  const [metrics, setMetrics] = useState<QuantumMetrics>({
    encryptionStrength: 98.7,
    quantumReadiness: 85.4,
    keyRotationFreq: 24,
    protocolsActive: 5,
    threatsBlocked: 127
  });

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [securityEvents, setSecurityEvents] = useState([
    {
      id: '1',
      type: 'Key Rotation',
      description: 'Quantum-safe key rotation completed successfully',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      severity: 'info'
    },
    {
      id: '2',
      type: 'Threat Detected',
      description: 'Potential quantum computer attack vector identified and blocked',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      severity: 'warning'
    },
    {
      id: '3',
      type: 'Protocol Update',
      description: 'CRYSTALS-Kyber encryption protocol updated to latest version',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      severity: 'success'
    }
  ]);

  const { toast } = useToast();

  const handleQuantumUpgrade = async () => {
    setIsUpgrading(true);
    toast({
      title: 'Quantum Upgrade Initiated',
      description: 'Upgrading to next-generation quantum-resistant protocols...',
    });

    // Simulate upgrade process
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        quantumReadiness: Math.min(100, prev.quantumReadiness + 5),
        encryptionStrength: Math.min(100, prev.encryptionStrength + 2),
        protocolsActive: prev.protocolsActive + 1
      }));
      
      setIsUpgrading(false);
      toast({
        title: 'Quantum Upgrade Complete',
        description: 'Successfully upgraded to quantum-resistant encryption protocols',
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'bg-amber-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantum Security Alert */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Quantum-Resistant Security Active</AlertTitle>
        <AlertDescription>
          Your system is protected with post-quantum cryptography protocols including CRYSTALS-Kyber and CRYSTALS-Dilithium.
          All transactions are secured against future quantum computer threats.
        </AlertDescription>
      </Alert>

      {/* Quantum Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Encryption Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.encryptionStrength}%</div>
              <Lock className="h-5 w-5 text-green-500" />
            </div>
            <Progress value={metrics.encryptionStrength} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Quantum-resistant</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quantum Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.quantumReadiness}%</div>
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <Progress value={metrics.quantumReadiness} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Future-proof protocols</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.protocolsActive}</div>
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Post-quantum algorithms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Threats Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.threatsBlocked}</div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Quantum attack attempts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quantum Protocols */}
        <Card>
          <CardHeader>
            <CardTitle>Active Quantum-Safe Protocols</CardTitle>
            <CardDescription>Post-quantum cryptography standards in use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <h4 className="font-medium">CRYSTALS-Kyber</h4>
                <p className="text-sm text-muted-foreground">Key encapsulation mechanism</p>
              </div>
              <Badge variant="default" className="bg-green-500">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <h4 className="font-medium">CRYSTALS-Dilithium</h4>
                <p className="text-sm text-muted-foreground">Digital signature algorithm</p>
              </div>
              <Badge variant="default" className="bg-green-500">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <h4 className="font-medium">FALCON</h4>
                <p className="text-sm text-muted-foreground">Compact digital signatures</p>
              </div>
              <Badge variant="default" className="bg-green-500">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <h4 className="font-medium">SPHINCS+</h4>
                <p className="text-sm text-muted-foreground">Hash-based signatures</p>
              </div>
              <Badge variant="outline">Standby</Badge>
            </div>

            <Button 
              onClick={handleQuantumUpgrade} 
              disabled={isUpgrading}
              className="w-full flex items-center gap-2"
            >
              {isUpgrading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Upgrading Protocols...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Upgrade Quantum Protocols
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Quantum security monitoring and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className={`mt-0.5 p-1 rounded-full ${getSeverityColor(event.severity)} text-white`}>
                    {getSeverityIcon(event.severity)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.type}</h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
