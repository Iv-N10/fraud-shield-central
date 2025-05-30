import React, { useState } from 'react';
import { FileDown, FileBarChart, Calendar, BarChart2, FileText, ChevronDown, Building2, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample data for the chart
const riskDistributionData = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
];

// Sample report data
const availableReports = [
  {
    id: 'monthly-2023-04',
    name: 'April 2023 Monthly Compliance Report',
    type: 'monthly',
    date: '2023-04-30',
    size: '1.2 MB',
  },
  {
    id: 'monthly-2023-03',
    name: 'March 2023 Monthly Compliance Report',
    type: 'monthly',
    date: '2023-03-31',
    size: '1.4 MB',
  },
  {
    id: 'quarterly-2023-q1',
    name: 'Q1 2023 Quarterly Risk Assessment',
    type: 'quarterly',
    date: '2023-03-31',
    size: '3.5 MB',
  },
  {
    id: 'audit-2023-01',
    name: 'January 2023 Audit Report',
    type: 'audit',
    date: '2023-01-15',
    size: '2.8 MB',
  },
  {
    id: 'incident-2023-02-15',
    name: 'Security Incident Report - Feb 15, 2023',
    type: 'incident',
    date: '2023-02-15',
    size: '0.8 MB',
  },
];

// Financial statements data
const financialStatements = [
  {
    id: 'pl-2023-04',
    name: 'Statement of Profit and Loss - April 2023',
    type: 'profit-loss',
    date: '2023-04-30',
    size: '0.9 MB',
    status: 'ready'
  },
  {
    id: 'bs-2023-04',
    name: 'Statement of Financial Position - April 2023',
    type: 'balance-sheet',
    date: '2023-04-30',
    size: '1.1 MB',
    status: 'ready'
  },
  {
    id: 'equity-2023-04',
    name: 'Statement of Changes in Equity - April 2023',
    type: 'equity-changes',
    date: '2023-04-30',
    size: '0.7 MB',
    status: 'ready'
  },
  {
    id: 'cashflow-2023-04',
    name: 'Statement of Cash Flows - April 2023',
    type: 'cash-flows',
    date: '2023-04-30',
    size: '0.8 MB',
    status: 'ready'
  },
  {
    id: 'regulatory-2023-04',
    name: 'Regulatory Capital Report - April 2023',
    type: 'regulatory',
    date: '2023-04-30',
    size: '2.1 MB',
    status: 'generating'
  },
  {
    id: 'liquidity-2023-04',
    name: 'Liquidity Coverage Ratio Report - April 2023',
    type: 'liquidity',
    date: '2023-04-30',
    size: '1.3 MB',
    status: 'ready'
  }
];

export default function Reports() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [financialReportType, setFinancialReportType] = useState('all');
  const [financialDateRange, setFinancialDateRange] = useState('all');
  
  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would trigger a download
    toast({
      title: 'Downloading report',
      description: 'Your report is being downloaded.',
    });
  };
  
  const handleGenerateReport = () => {
    toast({
      title: 'Generating report',
      description: 'Your custom report is being generated and will be available shortly.',
    });
  };

  const handleGenerateFinancialStatement = () => {
    toast({
      title: 'Generating financial statement',
      description: 'Your financial statement is being generated and will be available shortly.',
    });
  };
  
  // Filter reports based on type and date range
  const filteredReports = availableReports.filter(report => {
    const matchesType = reportType === 'all' || report.type === reportType;
    
    // Simple date filtering logic (could be improved with proper date handling)
    const matchesDate = dateRange === 'all' || 
      (dateRange === 'last30' && new Date(report.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateRange === 'last90' && new Date(report.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    
    return matchesType && matchesDate;
  });

  // Filter financial statements
  const filteredFinancialStatements = financialStatements.filter(statement => {
    const matchesType = financialReportType === 'all' || statement.type === financialReportType;
    
    const matchesDate = financialDateRange === 'all' || 
      (financialDateRange === 'last30' && new Date(statement.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (financialDateRange === 'last90' && new Date(statement.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    
    return matchesType && matchesDate;
  });

  const getStatementIcon = (type: string) => {
    switch (type) {
      case 'profit-loss': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'balance-sheet': return <Building2 className="h-5 w-5 text-blue-600" />;
      case 'equity-changes': return <PieChart className="h-5 w-5 text-purple-600" />;
      case 'cash-flows': return <DollarSign className="h-5 w-5 text-emerald-600" />;
      case 'regulatory': return <FileBarChart className="h-5 w-5 text-orange-600" />;
      case 'liquidity': return <BarChart2 className="h-5 w-5 text-cyan-600" />;
      default: return <FileText className="h-5 w-5 text-secondary" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return <Badge variant="outline" className="border-green-500 text-green-600">Ready</Badge>;
      case 'generating': return <Badge variant="outline" className="border-orange-500 text-orange-600">Generating</Badge>;
      case 'failed': return <Badge variant="outline" className="border-red-500 text-red-600">Failed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Financial Statements</h1>
        <p className="text-muted-foreground">Access compliance reports and generate standard financial statements</p>
      </div>
      
      <Tabs defaultValue="compliance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compliance">Risk & Compliance Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>
                  Access and download your compliance and risk assessment reports
                </CardDescription>
                
                <div className="flex flex-col gap-4 mt-4 sm:flex-row">
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="incident">Incident</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="last30">Last 30 Days</SelectItem>
                      <SelectItem value="last90">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <div 
                        key={report.id} 
                        className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between bg-card hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                          <div className="p-2 rounded-md bg-secondary/20">
                            <FileText className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{report.date}</span>
                              <span className="mx-2">•</span>
                              <span>{report.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2 sm:mt-0">
                          <Badge 
                            variant="outline" 
                            className="mr-4 capitalize border-secondary text-secondary"
                          >
                            {report.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <FileDown className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reports found with the selected filters</p>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          setReportType('all');
                          setDateRange('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Current risk profile breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Generate Report</CardTitle>
                  <CardDescription>Create a custom compliance report</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="compliance">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance Report</SelectItem>
                        <SelectItem value="risk">Risk Assessment</SelectItem>
                        <SelectItem value="activity">Activity Report</SelectItem>
                        <SelectItem value="audit">Audit Trail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Start Date</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">End Date</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={handleGenerateReport} className="w-full">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Insights</CardTitle>
              <CardDescription>Key metrics and analytics for your compliance program</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList className="mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-muted/30 rounded-md flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-green-100">
                        <FileBarChart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Compliance Rate</p>
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-green-600">+1.2% from last month</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-md flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-amber-100">
                        <BarChart2 className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Risk Score</p>
                        <p className="text-2xl font-bold">27/100</p>
                        <p className="text-xs text-green-600">-3.5% from last month</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-md flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Audit</p>
                        <p className="text-2xl font-bold">15 days</p>
                        <p className="text-xs text-muted-foreground">May 10, 2023</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-md">
                    <h3 className="font-medium mb-2">Recent Findings</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-medium">•</span>
                        <span>KYC verification process compliance rate increased by 4.2% in the last 30 days.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-600 font-medium">•</span>
                        <span>2 policy exceptions were recorded for high-value transactions that require additional review.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-medium">•</span>
                        <span>Risk assessment model accuracy improved by 2.1% after last calibration.</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="trends">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Trend analysis will be available in the next update</p>
                  </div>
                </TabsContent>
                <TabsContent value="recommendations">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">AI-powered recommendations will be available in the next update</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Financial Statements</CardTitle>
                <CardDescription>
                  Generate and access standard financial statements and regulatory reports
                </CardDescription>
                
                <div className="flex flex-col gap-4 mt-4 sm:flex-row">
                  <Select value={financialReportType} onValueChange={setFinancialReportType}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Statement Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statements</SelectItem>
                      <SelectItem value="profit-loss">Profit & Loss</SelectItem>
                      <SelectItem value="balance-sheet">Financial Position</SelectItem>
                      <SelectItem value="equity-changes">Changes in Equity</SelectItem>
                      <SelectItem value="cash-flows">Cash Flows</SelectItem>
                      <SelectItem value="regulatory">Regulatory Reports</SelectItem>
                      <SelectItem value="liquidity">Liquidity Reports</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={financialDateRange} onValueChange={setFinancialDateRange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="last30">Last 30 Days</SelectItem>
                      <SelectItem value="last90">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {filteredFinancialStatements.length > 0 ? (
                    filteredFinancialStatements.map((statement) => (
                      <div 
                        key={statement.id} 
                        className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between bg-card hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                          <div className="p-2 rounded-md bg-secondary/20">
                            {getStatementIcon(statement.type)}
                          </div>
                          <div>
                            <p className="font-medium">{statement.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{statement.date}</span>
                              <span className="mx-2">•</span>
                              <span>{statement.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          {getStatusBadge(statement.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDownloadReport(statement.id)}
                            disabled={statement.status === 'generating'}
                          >
                            <FileDown className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No financial statements found with the selected filters</p>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          setFinancialReportType('all');
                          setFinancialDateRange('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Financial Statement</CardTitle>
                  <CardDescription>Create standard financial statements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statement Type</label>
                    <Select defaultValue="profit-loss">
                      <SelectTrigger>
                        <SelectValue placeholder="Select statement type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profit-loss">Statement of Profit and Loss</SelectItem>
                        <SelectItem value="balance-sheet">Statement of Financial Position</SelectItem>
                        <SelectItem value="equity-changes">Statement of Changes in Equity</SelectItem>
                        <SelectItem value="cash-flows">Statement of Cash Flows</SelectItem>
                        <SelectItem value="comprehensive-income">Statement of Comprehensive Income</SelectItem>
                        <SelectItem value="notes">Notes to Financial Statements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reporting Period</label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Start Date</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">End Date</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={handleGenerateFinancialStatement} className="w-full">
                      Generate Statement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Reports</CardTitle>
                  <CardDescription>Quick access to regulatory compliance reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileBarChart className="h-4 w-4 mr-2" />
                    Capital Adequacy Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Liquidity Coverage Ratio
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Net Stable Funding Ratio
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Large Exposure Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Supervisory Review Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
