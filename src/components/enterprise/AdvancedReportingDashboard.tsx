import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Plus, 
  Play, 
  Settings, 
  Share2,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  query_config: any;
  chart_config: any;
  is_public: boolean;
  created_at: string;
}

interface ReportExecution {
  id: string;
  template_id: string;
  execution_time_ms: number;
  row_count: number;
  status: string;
  created_at: string;
}

const AdvancedReportingDashboard = () => {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [executions, setExecutions] = useState<ReportExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [reportData, setReportData] = useState<any[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    dataSource: 'transactions',
    chartType: 'bar',
    metrics: ['count']
  });

  useEffect(() => {
    fetchTemplates();
    fetchExecutions();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('report_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchExecutions = async () => {
    try {
      const { data, error } = await supabase
        .from('report_executions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setExecutions(data || []);
    } catch (error) {
      console.error('Error fetching executions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async () => {
    try {
      const queryConfig = {
        table: newTemplate.dataSource,
        metrics: newTemplate.metrics,
        groupBy: newTemplate.dataSource === 'transactions' ? 'DATE(created_at)' : 'created_at'
      };

      const chartConfig = {
        type: newTemplate.chartType,
        xAxis: 'date',
        yAxis: newTemplate.metrics[0]
      };

      const { data, error } = await supabase
        .from('report_templates')
        .insert({
          name: newTemplate.name,
          description: newTemplate.description,
          query_config: queryConfig,
          chart_config: chartConfig
        })
        .select()
        .single();

      if (error) throw error;

      setTemplates([data, ...templates]);
      setIsCreateDialogOpen(false);
      setNewTemplate({
        name: '',
        description: '',
        dataSource: 'transactions',
        chartType: 'bar',
        metrics: ['count']
      });
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const executeReport = async (template: ReportTemplate) => {
    try {
      setLoading(true);
      const startTime = Date.now();

      // Execute the report query based on template configuration
      let query = supabase.from(template.query_config.table).select('*');
      
      if (template.query_config.table === 'transactions') {
        query = query.limit(1000);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      const executionTime = Date.now() - startTime;

      // Process data for chart display
      const processedData = processDataForChart(data || [], template);
      setReportData(processedData);
      setSelectedTemplate(template);

      // Log execution
      await supabase
        .from('report_executions')
        .insert({
          template_id: template.id,
          execution_time_ms: executionTime,
          row_count: data?.length || 0,
          status: 'completed'
        });

      fetchExecutions();
    } catch (error) {
      console.error('Error executing report:', error);
    } finally {
      setLoading(false);
    }
  };

  const processDataForChart = (data: any[], template: ReportTemplate) => {
    if (template.query_config.table === 'transactions') {
      // Group by date and count transactions
      const groupedData = data.reduce((acc, transaction) => {
        const date = format(new Date(transaction.created_at), 'MMM dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(groupedData).map(([date, count]) => ({
        date,
        count
      }));
    }

    return data;
  };

  const exportReport = () => {
    if (!reportData.length) return;

    const csv = convertToCSV(reportData);
    downloadCSV(csv, `${selectedTemplate?.name || 'report'}.csv`);
  };

  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(header => row[header]));
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderChart = () => {
    if (!reportData.length || !selectedTemplate) return null;

    const chartType = selectedTemplate.chart_config?.type || 'bar';

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="hsl(var(--primary))"
                dataKey="count"
              >
                {reportData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Advanced Reporting Dashboard
          </h2>
          <p className="text-muted-foreground">
            Create, execute, and export custom reports and analytics
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Report Template</DialogTitle>
              <DialogDescription>
                Define a new report template with custom metrics and visualizations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Name</label>
                <Input
                  placeholder="Enter report name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe what this report shows"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Source</label>
                <Select 
                  value={newTemplate.dataSource} 
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, dataSource: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactions">Transactions</SelectItem>
                    <SelectItem value="security_incidents">Security Incidents</SelectItem>
                    <SelectItem value="audit_logs">Audit Logs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Chart Type</label>
                <Select 
                  value={newTemplate.chartType} 
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, chartType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createTemplate} disabled={!newTemplate.name}>
                Create Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="executions">Execution History</TabsTrigger>
          <TabsTrigger value="viewer">Report Viewer</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={template.is_public ? "default" : "secondary"}>
                        {template.is_public ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Created {format(new Date(template.created_at), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => executeReport(template)}
                        disabled={loading}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="executions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>
                History of report executions and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template ID</TableHead>
                    <TableHead>Execution Time</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {executions.map((execution) => (
                    <TableRow key={execution.id}>
                      <TableCell className="font-mono text-sm">
                        {execution.template_id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        {execution.execution_time_ms}ms
                      </TableCell>
                      <TableCell>
                        {execution.row_count?.toLocaleString() || 0}
                      </TableCell>
                      <TableCell>
                        <Badge variant={execution.status === 'completed' ? 'default' : 'destructive'}>
                          {execution.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(execution.created_at), 'MMM dd, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="viewer" className="space-y-4">
          {selectedTemplate && reportData.length > 0 ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedTemplate.name}</CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </div>
                    <Button onClick={exportReport} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderChart()}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Table</CardTitle>
                  <CardDescription>
                    Raw data used to generate the visualization above
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(reportData[0] || {}).map((key) => (
                          <TableHead key={key}>{key}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.slice(0, 10).map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value: any, idx) => (
                            <TableCell key={idx}>{value?.toString() || 'N/A'}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {reportData.length > 10 && (
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Showing 10 of {reportData.length} rows
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Report Selected</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Execute a report template to view the results here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedReportingDashboard;