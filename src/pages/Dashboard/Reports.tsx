
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Calendar,
  Building,
  DollarSign,
  BarChart3,
  PieChart,
  FileBarChart
} from 'lucide-react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBank, setSelectedBank] = useState('all');

  const riskReports = [
    {
      id: 1,
      title: 'Monthly Risk Assessment',
      description: 'Comprehensive risk analysis for the current month',
      status: 'completed',
      generatedAt: '2024-01-15',
      type: 'risk'
    },
    {
      id: 2,
      title: 'Fraud Detection Report',
      description: 'Analysis of suspicious activities and fraud patterns',
      status: 'pending',
      generatedAt: '2024-01-14',
      type: 'fraud'
    },
    {
      id: 3,
      title: 'Compliance Audit',
      description: 'Regulatory compliance status and recommendations',
      status: 'completed',
      generatedAt: '2024-01-13',
      type: 'compliance'
    }
  ];

  const financialStatements = [
    {
      id: 1,
      title: 'Statement of Profit and Loss',
      description: 'Income statement showing revenues, expenses, and profit',
      period: 'Q4 2023',
      status: 'available'
    },
    {
      id: 2,
      title: 'Statement of Financial Position',
      description: 'Balance sheet showing assets, liabilities, and equity',
      period: 'Q4 2023',
      status: 'available'
    },
    {
      id: 3,
      title: 'Statement of Cash Flows',
      description: 'Cash flow from operating, investing, and financing activities',
      period: 'Q4 2023',
      status: 'generating'
    },
    {
      id: 4,
      title: 'Statement of Changes in Equity',
      description: 'Changes in ownership equity over the reporting period',
      period: 'Q4 2023',
      status: 'available'
    }
  ];

  const regulatoryReports = [
    {
      id: 1,
      title: 'Anti-Money Laundering Report',
      description: 'AML compliance and suspicious activity reporting',
      deadline: '2024-02-01',
      status: 'draft'
    },
    {
      id: 2,
      title: 'Capital Adequacy Report',
      description: 'Basel III capital requirements compliance',
      deadline: '2024-02-15',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Liquidity Coverage Ratio',
      description: 'LCR reporting for regulatory compliance',
      deadline: '2024-01-30',
      status: 'submitted'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage financial and risk reports</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      <Tabs defaultValue="risk-reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="risk-reports" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Reports
          </TabsTrigger>
          <TabsTrigger value="financial-statements" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            Financial Statements
          </TabsTrigger>
          <TabsTrigger value="regulatory" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Regulatory Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk-reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Risk Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">7</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72</div>
                <p className="text-xs text-muted-foreground">Medium risk level</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Reports</CardTitle>
              <CardDescription>Generated risk assessment and fraud detection reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Generated: {report.generatedAt}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial-statements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="period">Reporting Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="entity">Business Entity</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="main">Main Branch</SelectItem>
                  <SelectItem value="subsidiary">Subsidiaries</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialStatements.map((statement) => (
              <Card key={statement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{statement.title}</CardTitle>
                    <Badge variant={statement.status === 'available' ? 'default' : 'secondary'}>
                      {statement.status}
                    </Badge>
                  </div>
                  <CardDescription>{statement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {statement.period}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" disabled={statement.status !== 'available'}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generate New Statement</CardTitle>
              <CardDescription>Create financial statements for specific periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Statement Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pnl">Profit & Loss</SelectItem>
                      <SelectItem value="balance">Balance Sheet</SelectItem>
                      <SelectItem value="cashflow">Cash Flow</SelectItem>
                      <SelectItem value="equity">Changes in Equity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Input type="month" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Statement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulatory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Due this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Reports</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
                <p className="text-xs text-muted-foreground">Immediate action required</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94%</div>
                <p className="text-xs text-muted-foreground">Above target</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Reports</CardTitle>
              <CardDescription>Compliance and regulatory filing requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Deadline: {report.deadline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        report.status === 'submitted' ? 'default' : 
                        report.status === 'draft' ? 'secondary' : 'outline'
                      }>
                        {report.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
