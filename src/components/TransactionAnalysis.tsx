
import React from 'react';
import { AlertCircle, CheckCircle, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface TransactionAnalysisProps {
  transactionId: string;
  analysis: {
    riskScore: number;
    riskAssessment: 'low' | 'medium' | 'high';
    riskFactors: string[];
    recommendations: string[];
  } | null;
  isLoading: boolean;
  onAnalyze: () => void;
}

const TransactionAnalysis: React.FC<TransactionAnalysisProps> = ({
  transactionId,
  analysis,
  isLoading,
  onAnalyze,
}) => {
  const getRiskColor = (assessment: string) => {
    switch (assessment) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRiskBadge = (assessment: string) => {
    switch (assessment) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-600">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          AI Fraud Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!analysis && !isLoading && (
          <div className="py-4 text-center">
            <Info className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No AI analysis has been run on this transaction yet</p>
            <Button onClick={onAnalyze}>
              Analyze Transaction
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <div className="space-y-1 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        )}

        {analysis && !isLoading && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Risk Assessment</p>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getRiskColor(analysis.riskAssessment)}`}>
                    {analysis.riskScore}/100
                  </span>
                  {getRiskBadge(analysis.riskAssessment)}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onAnalyze}>
                Refresh Analysis
              </Button>
            </div>

            {analysis.riskFactors && analysis.riskFactors.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Risk Factors Identified</p>
                <ul className="space-y-1">
                  {analysis.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      {analysis.riskAssessment === 'high' ? (
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : analysis.riskAssessment === 'medium' ? (
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Recommendations</p>
                <ul className="space-y-1">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-muted-foreground pt-2">
              Analysis powered by FraudShield AI
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionAnalysis;
