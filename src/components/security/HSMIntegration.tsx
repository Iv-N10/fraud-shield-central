
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Shield, Lock, Key, Server, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HSMIntegration() {
  const [hsmStatus, setHsmStatus] = useState('connected');
  const [keyRotationInProgress, setKeyRotationInProgress] = useState(false);
  const { toast } = useToast();

  const hsmModules = [
    {
      name: 'Primary HSM',
      model: 'Thales Luna Network HSM 7',
      status: 'online',
      utilization: 45,
      keysStored: 2847,
      lastBackup: '2 hours ago'
    },
    {
      name: 'Secondary HSM',
      model: 'AWS CloudHSM',
      status: 'online',
      utilization: 32,
      keysStored: 2847,
      lastBackup: '2 hours ago'
    },
    {
      name: 'Disaster Recovery HSM',
      model: 'Utimaco CryptoServer',
      status: 'standby',
      utilization: 0,
      keysStored: 2847,
      lastBackup: '2 hours ago'
    }
  ];

  const cryptoOperations = [
    { operation: 'AES-256 Encryption', throughput: '12,450 ops/sec', latency: '0.8ms' },
    { operation: 'RSA-4096 Signing', throughput: '1,240 ops/sec', latency: '3.2ms' },
    { operation: 'ECDSA P-384', throughput: '8,920 ops/sec', latency: '1.1ms' },
    { operation: 'Key Generation', throughput: '450 keys/sec', latency: '2.2ms' }
  ];

  const handleKeyRotation = async () => {
    setKeyRotationInProgress(true);
    toast({
      title: "Key Rotation Started",
      description: "Automatic key rotation process initiated across all HSM modules",
    });

    setTimeout(() => {
      setKeyRotationInProgress(false);
      toast({
        title: "Key Rotation Complete",
        description: "All encryption keys have been successfully rotated",
      });
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Hardware Security Modules (HSM) provide FIPS 140-2 Level 3 certified cryptographic operations 
          with tamper-evident hardware protection for all encryption keys and digital certificates.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">HSM Status</p>
                <p className="text-xl font-bold text-green-600">ONLINE</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Keys</p>
                <p className="text-xl font-bold">2,847</p>
              </div>
              <Key className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crypto Ops/sec</p>
                <p className="text-xl font-bold">23,060</p>
              </div>
              <Lock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance</p>
                <p className="text-xl font-bold text-green-600">FIPS 140-2</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>HSM Module Status</CardTitle>
            <CardDescription>Real-time status of hardware security modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hsmModules.map((module, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{module.name}</h4>
                    <Badge variant={module.status === 'online' ? 'default' : 'secondary'}>
                      {module.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{module.model}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization</span>
                      <span>{module.utilization}%</span>
                    </div>
                    <Progress value={module.utilization} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <span>Keys: {module.keysStored.toLocaleString()}</span>
                      <span>Backup: {module.lastBackup}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cryptographic Operations</CardTitle>
            <CardDescription>Performance metrics for crypto operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cryptoOperations.map((op, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{op.operation}</p>
                    <p className="text-xs text-muted-foreground">Latency: {op.latency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{op.throughput}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Management Operations</CardTitle>
          <CardDescription>Automated key lifecycle management and rotation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleKeyRotation} 
              disabled={keyRotationInProgress}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              {keyRotationInProgress ? 'Rotating Keys...' : 'Rotate All Keys'}
            </Button>
            {keyRotationInProgress && (
              <div className="flex-1">
                <Progress value={75} className="w-full animate-pulse" />
                <p className="text-sm text-muted-foreground mt-1">
                  Rotating encryption keys across all HSM modules...
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Key Generation</span>
              </div>
              <p className="text-xs text-muted-foreground">Automated daily key generation for new certificates</p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Key Escrow</span>
              </div>
              <p className="text-xs text-muted-foreground">Secure key backup and recovery processes</p>
            </div>
            
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Server className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-sm">Key Archival</span>
              </div>
              <p className="text-xs text-muted-foreground">Long-term secure storage of retired keys</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
