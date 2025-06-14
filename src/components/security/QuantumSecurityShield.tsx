
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, 
  Shield, 
  Zap, 
  Key, 
  Atom, 
  Wifi,
  Database,
  Eye,
  Activity
} from 'lucide-react';

export default function QuantumSecurityShield() {
  const [quantumStatus, setQuantumStatus] = useState('active');
  const [encryptionStrength, setEncryptionStrength] = useState(256);
  const [quantumReadiness, setQuantumReadiness] = useState(94.8);

  const securityLayers = [
    {
      layer: 'Quantum Key Distribution',
      status: 'active',
      strength: 100,
      description: 'Quantum-entangled key exchange',
      icon: Atom
    },
    {
      layer: 'Post-Quantum Cryptography', 
      status: 'active',
      strength: 96,
      description: 'Lattice-based encryption algorithms',
      icon: Lock
    },
    {
      layer: 'Homomorphic Encryption',
      status: 'active', 
      strength: 92,
      description: 'Compute on encrypted data',
      icon: Database
    },
    {
      layer: 'Zero-Knowledge Proofs',
      status: 'active',
      strength: 89,
      description: 'Verify without revealing data',
      icon: Eye
    },
    {
      layer: 'Quantum Random Generator',
      status: 'active',
      strength: 100,
      description: 'True quantum randomness',
      icon: Zap
    },
    {
      layer: 'Quantum-Safe TLS',
      status: 'active',
      strength: 94,
      description: 'Quantum-resistant transport security',
      icon: Wifi
    }
  ];

  const [threatSimulation] = useState({
    quantumAttacks: 0,
    classicalAttacks: 1247,
    mitigatedThreats: 100,
    encryptionBreakAttempts: 0
  });

  useEffect(() => {
    // Simulate quantum security monitoring
    const interval = setInterval(() => {
      setQuantumReadiness(prev => {
        const variation = (Math.random() - 0.5) * 2;
        return Math.max(90, Math.min(100, prev + variation));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Quantum Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quantum Readiness</p>
                <p className="text-2xl font-bold text-purple-600">{quantumReadiness.toFixed(1)}%</p>
              </div>
              <Atom className="h-8 w-8 text-purple-500" />
            </div>
            <Progress value={quantumReadiness} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Encryption Strength</p>
                <p className="text-2xl font-bold text-green-600">{encryptionStrength}-bit</p>
              </div>
              <Lock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quantum Attacks</p>
                <p className="text-2xl font-bold text-green-600">{threatSimulation.quantumAttacks}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Break Attempts</p>
                <p className="text-2xl font-bold text-green-600">{threatSimulation.encryptionBreakAttempts}</p>
              </div>
              <Key className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quantum Security Layers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5" />
            Quantum Security Architecture
          </CardTitle>
          <CardDescription>
            Multi-layered quantum-resistant security framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="layers" className="space-y-4">
            <TabsList>
              <TabsTrigger value="layers">Security Layers</TabsTrigger>
              <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
              <TabsTrigger value="monitoring">Real-time Monitor</TabsTrigger>
            </TabsList>

            <TabsContent value="layers" className="space-y-4">
              <div className="grid gap-4">
                {securityLayers.map((layer, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <layer.icon className="h-5 w-5 text-purple-500" />
                          <div>
                            <h4 className="font-medium">{layer.layer}</h4>
                            <p className="text-sm text-muted-foreground">{layer.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={layer.status === 'active' ? 'default' : 'secondary'}>
                            {layer.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {layer.strength}% strength
                          </div>
                        </div>
                      </div>
                      <Progress value={layer.strength} className="mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="algorithms" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Post-Quantum Algorithms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>CRYSTALS-Kyber</span>
                        <Badge>Key Encapsulation</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>CRYSTALS-Dilithium</span>
                        <Badge>Digital Signatures</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>FALCON</span>
                        <Badge>Signatures</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SPHINCS+</span>
                        <Badge>Hash-based Signatures</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quantum Protocols</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>BB84 Protocol</span>
                        <Badge variant="outline">QKD</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>E91 Protocol</span>
                        <Badge variant="outline">Entanglement</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SARG04</span>
                        <Badge variant="outline">Enhanced Security</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Device-Independent QKD</span>
                        <Badge variant="outline">Future-Proof</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Quantum State Monitor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Coherence Time</span>
                        <span className="text-sm font-medium">127μs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fidelity</span>
                        <span className="text-sm font-medium">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Entanglement</span>
                        <span className="text-sm font-medium">Stable</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Error Rate</span>
                        <span className="text-sm font-medium">0.02%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Quantum channel secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Keys distributed safely</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>No eavesdropping detected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Encryption integrity verified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Key Generation</span>
                        <span className="text-sm font-medium">1.2M/sec</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Encryption Speed</span>
                        <span className="text-sm font-medium">50GB/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Latency</span>
                        <span className="text-sm font-medium">0.05ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Throughput</span>
                        <span className="text-sm font-medium">99.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quantum Threat Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5" />
            Quantum Attack Simulation
          </CardTitle>
          <CardDescription>
            Test quantum resistance against future quantum computers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Shor's Algorithm Simulation</h4>
              <p className="text-sm text-muted-foreground">
                Testing RSA factorization resistance with 4096-qubit simulator
              </p>
            </div>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Run Simulation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
