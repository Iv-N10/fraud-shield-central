
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, FileText, Calendar, Download, Send } from 'lucide-react';

export default function ComplianceAutomation() {
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);

  const reports = [
    {
      type: 'SAR',
      name: 'Suspicious Activity Report',
      status: 'scheduled',
      nextDue: '2 days',
      lastGenerated: '28 days ago',
      count: 15
    },
    {
      type: 'CTR',
      name: 'Currency Transaction Report',
      status: 'ready',
      nextDue: 'Today',
      lastGenerated: '7 days ago',
      count: 8
    },
    {
      type: 'BSA',
      name: 'Bank Secrecy Act Report',
      status: 'pending',
      nextDue: '5 days',
      lastGenerated: '21 days ago',
      count: 3
    },
    {
      type: 'AML',
      name: 'Anti-Money Laundering Report',
      status: 'completed',
      nextDue: '14 days',
      lastGenerated: '1 day ago',
      count: 12
    }
  ];

  const complianceMetrics = [
    { label: 'Reports Generated', value: '47', color: 'text-blue-600' },
    { label: 'Auto-Filed', value: '89%', color: 'text-green-600' },
    { label: 'Pending Reviews', value: '3', color: 'text-amber-600' },
    { label: 'Compliance Score', value: '98.5%', color: 'text-green-600' }
  ];

  const generateReport = (reportType: string) => {
    setGeneratingReport(true);
    setReportProgress(0);
    
    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGeneratingReport(false);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'border-green-500 text-green-600';
      case 'scheduled':
        return 'border-blue-500 text-blue-600';
      case 'pending':
        return 'border-amber-500 text-amber-600';
      case 'completed':
        return 'border-gray-500 text-gray-600';
      default:
        return 'border-gray-300 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Automated Report Generation
          </CardTitle>
          <CardDescription>
            Auto-generate regulatory reports (SAR, CTR, BSA, AML) based on transaction data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {generatingReport && (
            <div className="space-y-2">
              <Progress value={reportProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Generating compliance report... {reportProgress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regulatory Reports</CardTitle>
          <CardDescription>
            Automated compliance reporting and filing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{report.name}</h3>
                    <Badge className="text-xs">
                      {report.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Next due: {report.nextDue} • Last generated: {report.lastGenerated}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {report.count} items to report
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateReport(report.type)}
                    disabled={generatingReport}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Generate
                  </Button>
                  {report.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                  {report.status === 'ready' && (
                    <Button size="sm">
                      <Send className="h-3 w-3 mr-1" />
                      File Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Calendar</CardTitle>
          <CardDescription>
            Upcoming regulatory deadlines and filing requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">CTR Filing Deadline</p>
                  <p className="text-sm text-green-600">Currency Transaction Reports due today</p>
                </div>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                File Now
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">SAR Review Due</p>
                  <p className="text-sm text-amber-600">Suspicious Activity Reports due in 2 days</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">BSA Compliance Check</p>
                  <p className="text-sm text-blue-600">Bank Secrecy Act reports due in 5 days</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Prepare
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
