
import React from 'react';
import CaseManagementSystem from '@/components/case-management/CaseManagementSystem';
import { FileText } from 'lucide-react';

export default function CaseManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Case Management
        </h1>
        <p className="text-muted-foreground">
          Comprehensive fraud investigation case management and workflow automation
        </p>
      </div>

      <CaseManagementSystem />
    </div>
  );
}
