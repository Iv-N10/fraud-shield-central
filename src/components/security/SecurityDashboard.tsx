
import React, { useState } from 'react';
import { Shield, Eye, Lock, AlertTriangle, Zap, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ThreatDetection from './ThreatDetection';
import ComplianceMonitor from './ComplianceMonitor';

const SecurityDashboard: React.FC = () => {
  const [securityStatus] = useState({
    overallStatus: 'secure',
    activeThreats: 0,
    blockedAttacks: 847,
    uptime: 99.99,
    encryption: 'AES-256',
    lastScan: '5 minutes ago'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-500" />
            Security Command Center
          </h1>
          <p className="text-muted-foreground">Enterprise-grade cybersecurity monitoring and threat detection</p>
        </div>
      </div>

      {/* Security Status Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">System Secure</AlertTitle>
        <AlertDescription className="text-green-700">
          All security systems operational. Zero active threats detected. Last security scan: {securityStatus.lastScan}
        </AlertDescription>
      </Alert>

      {/* Security Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-green-600">SECURE</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityStatus.activeThreats}</div>
            <p className="text-xs text-muted-foreground">All neutralized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Attacks Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityStatus.blockedAttacks}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{securityStatus.uptime}%</div>
            <p className="text-xs text-muted-foreground">99.99% SLA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-500" />
              <span className="font-bold">{securityStatus.encryption}</span>
            </div>
            <p className="text-xs text-muted-foreground">Military grade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Last Scan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">{securityStatus.lastScan}</span>
            </div>
            <p className="text-xs text-muted-foreground">Continuous monitoring</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Tabs */}
      <Tabs defaultValue="threats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="threats">Threat Detection</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="threats">
          <ThreatDetection />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceMonitor />
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Zero-Trust Access Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Multi-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-2">Enforced for all users</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Active</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Role-Based Access</h4>
                    <p className="text-sm text-muted-foreground mb-2">Granular permissions</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Configured</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Session Management</h4>
                    <p className="text-sm text-muted-foreground mb-2">Secure session handling</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Enforced</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encryption">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Advanced Encryption Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Data at Rest</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                      <span>Database Encryption</span>
                      <span className="font-medium text-green-600">AES-256</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                      <span>File Storage</span>
                      <span className="font-medium text-green-600">AES-256</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                      <span>Backup Encryption</span>
                      <span className="font-medium text-green-600">AES-256</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Data in Transit</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded">
                      <span>HTTPS/TLS</span>
                      <span className="font-medium text-blue-600">TLS 1.3</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded">
                      <span>API Communications</span>
                      <span className="font-medium text-blue-600">TLS 1.3</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded">
                      <span>Database Connections</span>
                      <span className="font-medium text-blue-600">TLS 1.3</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Security Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">System Monitoring</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>Network Traffic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Monitoring</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>User Behavior</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Anomaly Detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Learning</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Incident Response</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">Automated Response</span>
                      </div>
                      <p className="text-sm text-green-700">Immediate threat neutralization</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-600">Quarantine System</span>
                      </div>
                      <p className="text-sm text-blue-700">Isolate suspicious activities</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-600">Forensic Analysis</span>
                      </div>
                      <p className="text-sm text-purple-700">Post-incident investigation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
