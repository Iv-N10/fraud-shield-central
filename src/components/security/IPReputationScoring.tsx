
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
  const [recentIPs, setRecentIPs] = useState<IPRisk[]>([
    {
      ip: '192.168.1.45',
      riskScore: 85,
      country: 'Russia',
      city: 'Moscow',
      isp: 'VPN Provider Ltd',
      threatTypes: ['VPN', 'Proxy', 'Botnet'],
      lastSeen: new Date(Date.now() - 300000).toISOString(),
      transactionCount: 23,
      status: 'malicious'
    },
    {
      ip: '10.0.0.123',
      riskScore: 65,
      country: 'United States',
      city: 'New York',
      isp: 'Residential ISP',
      threatTypes: ['High Velocity'],
      lastSeen: new Date(Date.now() - 600000).toISOString(),
      transactionCount: 8,
      status: 'suspicious'
    },
    {
      ip: '203.45.67.89',
      riskScore: 15,
      country: 'United Kingdom',
      city: 'London',
      isp: 'BT Group',
      threatTypes: [],
      lastSeen: new Date(Date.now() - 1800000).toISOString(),
      transactionCount: 3,
      status: 'clean'
    }
  ]);

  const [stats] = useState({
    totalChecked: 1247,
    blocked: 89,
    flagged: 156,
    clean: 1002
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
