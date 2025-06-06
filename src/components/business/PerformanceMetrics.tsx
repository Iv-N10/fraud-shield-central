
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap,
  Clock,
  Shield,
  Users,
  DollarSign
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: string;
  category: 'detection' | 'operational' | 'financial' | 'customer';
}

export default function PerformanceMetrics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  
  const [metrics] = useState<PerformanceMetric[]>([
    {
      name: 'Detection Accuracy',
      value: 94.8,
      target: 95.0,
      trend: 'up',
      change: 2.3,
      unit: '%',
      category: 'detection'
    },
    {
      name: 'False Positive Rate',
      value: 0.8,
      target: 1.0,
      trend: 'down',
      change: -0.2,
      unit: '%',
      category: 'detection'
    },
    {
      name: 'Response Time',
      value: 1.2,
      target: 2.0,
      trend: 'down',
      change: -0.3,
      unit: 'sec',
      category: 'operational'
    },
    {
      name: 'System Uptime',
      value: 99.9,
      target: 99.5,
      trend: 'stable',
      change: 0.1,
      unit: '%',
      category: 'operational'
    },
    {
      name: 'Fraud Loss Prevention',
      value: 2.5,
      target: 2.0,
      trend: 'up',
      change: 0.7,
      unit: 'M$',
      category: 'financial'
    },
    {
      name: 'Cost per Transaction',
      value: 0.15,
      target: 0.20,
      trend: 'down',
      change: -0.02,
      unit: '$',
      category: 'financial'
    },
    {
      name: 'Customer Satisfaction',
      value: 4.6,
      target: 4.5,
      trend: 'up',
      change: 0.2,
      unit: '/5',
      category: 'customer'
    },
    {
      name: 'Investigation Efficiency',
      value: 87,
      target: 85,
      trend: 'up',
      change: 5,
      unit: '%',
      category: 'operational'
    }
  ]);

  const [trendData] = useState([
    { month: 'Jan', accuracy: 92.1, falsePositives: 1.2, responseTime: 1.8 },
    { month: 'Feb', accuracy: 93.2, falsePositives: 1.1, responseTime: 1.6 },
    { month: 'Mar', accuracy: 94.1, falsePositives: 0.9, responseTime: 1.4 },
    { month: 'Apr', accuracy: 94.5, falsePositives: 0.8, responseTime: 1.3 },
    { month: 'May', accuracy: 94.8, falsePositives: 0.8, responseTime: 1.2 },
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'detection':
        return <Target className="h-5 w-5 text-blue-500" />;
      case 'operational':
        return <Zap className="h-5 w-5 text-green-500" />;
      case 'financial':
        return <DollarSign className="h-5 w-5 text-amber-500" />;
      case 'customer':
        return <Users className="h-5 w-5 text-purple-500" />;
      default:
        return <Shield className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <div className="h-4 w-4" />;
  };

  const getPerformanceColor = (value: number, target: number, isInverse = false) => {
    const ratio = value / target;
    if (isInverse) {
      return ratio <= 0.8 ? 'text-green-600' : ratio <= 1 ? 'text-amber-600' : 'text-red-600';
    }
    return ratio >= 1 ? 'text-green-600' : ratio >= 0.9 ? 'text-amber-600' : 'text-red-600';
  };

  const categorizeMetrics = (category: string) => {
    return metrics.filter(m => m.category === category);
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Targets Met</p>
                <p className="text-2xl font-bold">6/8</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improving</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">1.2s</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detection Performance Trends</CardTitle>
            <CardDescription>Key detection metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Accuracy (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Response Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>Current performance across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['detection', 'operational', 'financial', 'customer'].map((category) => {
                const categoryMetrics = categorizeMetrics(category);
                const avgPerformance = categoryMetrics.reduce((sum, m) => sum + (m.value / m.target), 0) / categoryMetrics.length * 100;
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span className="font-medium capitalize">{category}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{avgPerformance.toFixed(1)}%</span>
                    </div>
                    <Progress value={avgPerformance} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
          <CardDescription>Individual metric performance against targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  {getCategoryIcon(metric.category)}
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend, metric.change)}
                    <span className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                    </span>
                  </div>
                </div>
                
                <h4 className="font-medium text-sm mb-1">{metric.name}</h4>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-2xl font-bold ${getPerformanceColor(metric.value, metric.target, metric.name.includes('False') || metric.name.includes('Time') || metric.name.includes('Cost'))}`}>
                    {metric.value}{metric.unit}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {metric.target}{metric.unit}
                  </span>
                </div>
                
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2"
                />
                
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>Target: {metric.target}{metric.unit}</span>
                  <Badge variant="outline" className="text-xs">
                    {((metric.value / metric.target) * 100).toFixed(1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
