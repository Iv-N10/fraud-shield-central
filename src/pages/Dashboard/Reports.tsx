
import React, { useState } from 'react';
import { FileDown, FileBarChart, Calendar, BarChart2, FileText, ChevronDown } from 'lucide-react';
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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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

export default function Reports() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  
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
  
  // Filter reports based on type and date range
  const filteredReports = availableReports.filter(report => {
    const matchesType = reportType === 'all' || report.type === reportType;
    
    // Simple date filtering logic (could be improved with proper date handling)
    const matchesDate = dateRange === 'all' || 
      (dateRange === 'last30' && new Date(report.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateRange === 'last90' && new Date(report.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    
    return matchesType && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Risk Reports</h1>
        <p className="text-muted-foreground">View and download compliance and risk assessment reports</p>
      </div>
      
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
                  <PieChart>
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
                  </PieChart>
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
    </div>
  );
}
