
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface IPSearchFormProps {
  searchIP: string;
  setSearchIP: (ip: string) => void;
  onSearch: () => void;
}

export default function IPSearchForm({ searchIP, setSearchIP, onSearch }: IPSearchFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>IP Address Lookup</CardTitle>
        <CardDescription>Check the reputation and risk score of any IP address</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Input
            placeholder="Enter IP address (e.g., 192.168.1.1)"
            value={searchIP}
            onChange={(e) => setSearchIP(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="flex-1"
          />
          <Button onClick={onSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Check IP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
