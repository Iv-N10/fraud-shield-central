
import React, { useState } from 'react';
import IPStatsCards from './ip-reputation/IPStatsCards';
import IPSearchForm from './ip-reputation/IPSearchForm';
import IPAnalysisResults from './ip-reputation/IPAnalysisResults';

interface IPRisk {
  ip: string;
  riskScore: number;
  country: string;
  city: string;
  isp: string;
  threatTypes: string[];
  lastSeen: string;
  transactionCount: number;
  status: 'clean' | 'suspicious' | 'malicious' | 'blocked';
}

export default function IPReputationScoring() {
  const [searchIP, setSearchIP] = useState('');
  const [recentIPs, setRecentIPs] = useState<IPRisk[]>([]);

  const [stats] = useState({
    totalChecked: 0,
    blocked: 0,
    flagged: 0,
    clean: 0
  });

  const handleSearch = () => {
    if (!searchIP) return;
    
    // Simulate IP lookup
    const mockResult: IPRisk = {
      ip: searchIP,
      riskScore: Math.floor(Math.random() * 100),
      country: 'Unknown',
      city: 'Unknown',
      isp: 'Unknown ISP',
      threatTypes: Math.random() > 0.5 ? ['Proxy'] : [],
      lastSeen: new Date().toISOString(),
      transactionCount: Math.floor(Math.random() * 50),
      status: Math.random() > 0.7 ? 'suspicious' : 'clean'
    };

    setRecentIPs(prev => [mockResult, ...prev.slice(0, 9)]);
    setSearchIP('');
  };

  return (
    <div className="space-y-6">
      <IPStatsCards stats={stats} />
      <IPSearchForm 
        searchIP={searchIP}
        setSearchIP={setSearchIP}
        onSearch={handleSearch}
      />
      <IPAnalysisResults recentIPs={recentIPs} />
    </div>
  );
}
