
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Calendar as CalendarIcon,
  Clock,
  Mail,
  Settings
} from 'lucide-react';
import { format } from 'date-fns';

const AdvancedReporting = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState('');
  const [scheduleFrequency, setScheduleFrequency] = useState('');

  const reportTemplates = [
    {
      name: 'Fraud Summary Report',
      description: 'Daily overview of fraud detection metrics',
      type: 'fraud_summary',
      estimatedTime: '2-3 minutes'
    },
    {
      name: 'Risk Analytics Report',
      description: 'Detailed risk analysis and trends',
      type: 'risk_analytics',
      estimatedTime: '5-7 minutes'
    },
    {
      name: 'Compliance Report',
      description: 'Regulatory compliance status and audit trail',
      type: 'compliance',
      estimatedTime: '3-5 minutes'
    },
    {
      name: 'Performance Metrics',
      description: 'System performance and accuracy metrics',
      type: 'performance',
      estimatedTime: '2-4 minutes'
    }
  ];

  const scheduledReports = [
    {
      name: 'Daily Fraud Summary',
      frequency: 'Daily at 8:00 AM',
      lastRun: '2024-01-06 08:00:00',
      status: 'active'
    },
    {
      name: 'Weekly Risk Analysis',
      frequency: 'Monday at 9:00 AM',
      lastRun: '2024-01-01 09:00:00',
      status: 'active'
    },
    {
      name: 'Monthly Compliance',
      frequency: '1st of month at 10:00 AM',
      lastRun: '2024-01-01 10:00:00',
      status: 'paused'
    }
  ];

  const exportFormats = ['PDF', 'Excel', 'CSV', 'JSON'];

  const generateReport = () => {
    console.log('Generating report with:', {
      type: reportType,
      dateFrom,
      dateTo
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Advanced Reporting</h2>
        <p className="text-muted-foreground">
          Generate comprehensive reports with scheduling and export capabilities
        </p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="exports">Export History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>
                  Configure your custom report parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fraud_summary">Fraud Summary</SelectItem>
                      <SelectItem value="risk_analytics">Risk Analytics</SelectItem>
                      <SelectItem value="compliance">Compliance Report</SelectItem>
                      <SelectItem value="performance">Performance Metrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label>Export Format</Label>
                  <div className="flex gap-2 mt-2">
                    {exportFormats.map((format) => (
                      <Button key={format} variant="outline" size="sm">
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button onClick={generateReport} className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
                <CardDescription>
                  Use pre-configured report templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportTemplates.map((template, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {template.estimatedTime}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {template.description}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        <FileText className="w-3 h-3 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Report</CardTitle>
                <CardDescription>
                  Set up automated report generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Report Name</Label>
                  <Input placeholder="Enter report name" />
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email Recipients</Label>
                  <Input placeholder="admin@company.com, team@company.com" />
                </div>
                <Button className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Schedules</CardTitle>
                <CardDescription>
                  Manage your scheduled reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledReports.map((report, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{report.name}</h4>
                        <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {report.frequency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last run: {report.lastRun}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Run Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Pre-built templates for common reporting needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {reportTemplates.map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm">
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>
                Download and manage your generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Fraud Summary Report - January 2024', date: '2024-01-06', format: 'PDF', size: '2.3 MB' },
                  { name: 'Risk Analytics Report - December 2023', date: '2024-01-01', format: 'Excel', size: '5.1 MB' },
                  { name: 'Compliance Report - Q4 2023', date: '2023-12-31', format: 'PDF', size: '1.8 MB' }
                ].map((export_item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{export_item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {export_item.date} • {export_item.format} • {export_item.size}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedReporting;
