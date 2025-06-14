
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  PieChart,
  Users,
  DollarSign
} from 'lucide-react';

export default function AdvancedReporting() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');

  const reportTemplates = [
    {
      id: 'fraud-summary',
      name: 'Fraud Detection Summary',
      description: 'Comprehensive fraud detection metrics and trends',
      frequency: 'Daily',
      lastGenerated: '2 hours ago',
      status: 'ready'
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance status and audit trail',
      frequency: 'Monthly',
      lastGenerated: '1 day ago',
      status: 'ready'
    },
    {
      id: 'kyc-verification',
      name: 'KYC Verification Report',
      description: 'Customer verification status and metrics',
      frequency: 'Weekly',
      lastGenerated: '3 days ago',
      status: 'generating'
    },
    {
      id: 'transaction-analysis',
      name: 'Transaction Analysis',
      description: 'Detailed transaction patterns and risk analysis',
      frequency: 'Real-time',
      lastGenerated: '30 minutes ago',
      status: 'ready'
    }
  ];

  const kpiMetrics = [
    {
      title: 'Total Transactions',
      value: '156,420',
      change: '+12.5%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Fraud Detected',
      value: '1,240',
      change: '-8.3%',
      trend: 'down',
      icon: PieChart
    },
    {
      title: 'False Positives',
      value: '342',
      change: '-15.2%',
      trend: 'down',
      icon: TrendingUp
    },
    {
      title: 'Revenue Protected',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign
    }
  ];

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Advanced Reporting & Analytics
          </CardTitle>
          <CardDescription>
            Generate comprehensive reports and analyze key performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {kpiMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change} from last period
                      </p>
                    </div>
                    <metric.icon className={`h-8 w-8 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Generator</CardTitle>
              <CardDescription>Create custom reports with specific date ranges and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <DatePickerWithRange />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={generateReport} disabled={isGenerating || !selectedReport}>
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={66} />
                  <p className="text-sm text-muted-foreground">Generating report... 66% complete</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Access previously generated reports and templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant={
                          template.status === 'ready' ? 'default' :
                          template.status === 'generating' ? 'secondary' : 'outline'
                        }>
                          {template.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {template.frequency} • Last generated: {template.lastGenerated}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled={template.status !== 'ready'}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
