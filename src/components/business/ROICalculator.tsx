
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  Shield,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    monthlyTransactionVolume: 1000000,
    fraudRate: 2.5,
    averageTransactionValue: 150,
    currentFraudLossRate: 0.8,
    implementationCost: 50000,
    monthlySubscriptionCost: 5000,
    targetFraudReduction: 75
  });

  const [calculations, setCalculations] = useState({
    monthlyFraudLoss: 0,
    projectedSavings: 0,
    paybackPeriod: 0,
    annualROI: 0,
    riskReduction: 0
  });

  const calculateROI = () => {
    const monthlyTransactions = inputs.monthlyTransactionVolume;
    const fraudTransactions = (monthlyTransactions * inputs.fraudRate) / 100;
    const monthlyFraudLoss = fraudTransactions * inputs.averageTransactionValue * (inputs.currentFraudLossRate / 100);
    
    const projectedReduction = (inputs.targetFraudReduction / 100);
    const monthlySavings = monthlyFraudLoss * projectedReduction;
    const annualSavings = monthlySavings * 12;
    
    const totalFirstYearCost = inputs.implementationCost + (inputs.monthlySubscriptionCost * 12);
    const netAnnualBenefit = annualSavings - (inputs.monthlySubscriptionCost * 12);
    const paybackMonths = inputs.implementationCost / monthlySavings;
    const annualROI = ((netAnnualBenefit - inputs.implementationCost) / inputs.implementationCost) * 100;
    
    setCalculations({
      monthlyFraudLoss,
      projectedSavings: monthlySavings,
      paybackPeriod: paybackMonths,
      annualROI,
      riskReduction: projectedReduction * 100
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              ROI Input Parameters
            </CardTitle>
            <CardDescription>Enter your current fraud metrics and projected implementation costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Monthly Transaction Volume</label>
              <Input
                type="number"
                value={inputs.monthlyTransactionVolume}
                onChange={(e) => setInputs(prev => ({ ...prev, monthlyTransactionVolume: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Current Fraud Rate (%)</label>
              <Input
                type="number"
                step="0.1"
                value={inputs.fraudRate}
                onChange={(e) => setInputs(prev => ({ ...prev, fraudRate: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Average Transaction Value ($)</label>
              <Input
                type="number"
                value={inputs.averageTransactionValue}
                onChange={(e) => setInputs(prev => ({ ...prev, averageTransactionValue: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Current Fraud Loss Rate (%)</label>
              <Input
                type="number"
                step="0.1"
                value={inputs.currentFraudLossRate}
                onChange={(e) => setInputs(prev => ({ ...prev, currentFraudLossRate: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Implementation Cost ($)</label>
              <Input
                type="number"
                value={inputs.implementationCost}
                onChange={(e) => setInputs(prev => ({ ...prev, implementationCost: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Monthly Subscription Cost ($)</label>
              <Input
                type="number"
                value={inputs.monthlySubscriptionCost}
                onChange={(e) => setInputs(prev => ({ ...prev, monthlySubscriptionCost: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Target Fraud Reduction (%)</label>
              <Input
                type="number"
                value={inputs.targetFraudReduction}
                onChange={(e) => setInputs(prev => ({ ...prev, targetFraudReduction: Number(e.target.value) }))}
              />
            </div>
            
            <Button onClick={calculateROI} className="w-full">
              Calculate ROI
            </Button>
          </CardContent>
        </Card>

        {/* ROI Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI Analysis Results
            </CardTitle>
            <CardDescription>Projected return on investment and fraud reduction impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Monthly Fraud Loss</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  ${calculations.monthlyFraudLoss.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Monthly Savings</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ${calculations.projectedSavings.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Payback Period</span>
                </div>
                <div className="text-2xl font-bold">
                  {calculations.paybackPeriod.toFixed(1)} months
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Annual ROI</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">
                  {calculations.annualROI.toFixed(1)}%
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Risk Reduction</span>
                <Badge variant="outline">{calculations.riskReduction.toFixed(1)}%</Badge>
              </div>
              <Progress value={calculations.riskReduction} className="h-3" />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Key Benefits</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• Annual savings: ${(calculations.projectedSavings * 12).toLocaleString()}</div>
                <div>• 3-year total savings: ${(calculations.projectedSavings * 36).toLocaleString()}</div>
                <div>• Fraud cases prevented: {((inputs.monthlyTransactionVolume * inputs.fraudRate / 100) * calculations.riskReduction / 100).toFixed(0)}/month</div>
                <div>• Customer experience improvement through reduced false positives</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Scenarios Comparison</CardTitle>
          <CardDescription>Compare different implementation scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Conservative</Badge>
                <span className="text-sm font-medium">50% Reduction</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>Monthly Savings: ${(calculations.projectedSavings * 0.67).toLocaleString()}</div>
                <div>Payback: {(calculations.paybackPeriod * 1.5).toFixed(1)} months</div>
                <div>Annual ROI: {(calculations.annualROI * 0.67).toFixed(1)}%</div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg bg-accent/50">
              <div className="flex items-center gap-2 mb-3">
                <Badge>Target</Badge>
                <span className="text-sm font-medium">{inputs.targetFraudReduction}% Reduction</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>Monthly Savings: ${calculations.projectedSavings.toLocaleString()}</div>
                <div>Payback: {calculations.paybackPeriod.toFixed(1)} months</div>
                <div>Annual ROI: {calculations.annualROI.toFixed(1)}%</div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Optimistic</Badge>
                <span className="text-sm font-medium">90% Reduction</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>Monthly Savings: ${(calculations.projectedSavings * 1.2).toLocaleString()}</div>
                <div>Payback: {(calculations.paybackPeriod * 0.83).toFixed(1)} months</div>
                <div>Annual ROI: {(calculations.annualROI * 1.2).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
