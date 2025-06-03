
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Users, Server, Activity } from 'lucide-react';

interface HeadscaleNode {
  id: string;
  hostname: string;
  name: string;
  machineKey: string;
  nodeKey: string;
  user: string;
  ipAddresses: string;
  ephemeral: boolean;
  lastSeen: string;
  expiration: string;
  connected: boolean;
  expired: boolean;
}

interface ServerData {
  serverName: string;
  namespace: string;
  nodes: HeadscaleNode[];
}

const AdminPage = () => {
  const [serverData, setServerData] = useState<ServerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Mock data based on the Headscale output format from the image
  const mockData: ServerData[] = [
    {
      serverName: "kali",
      namespace: "ppp",
      nodes: [
        {
          id: "1",
          hostname: "kali",
          name: "kali",
          machineKey: "[40n15]",
          nodeKey: "[Bdf80]",
          user: "ppp",
          ipAddresses: "100.64.0.1, fd7a:115c:a1a0:ab11",
          ephemeral: false,
          lastSeen: "2025-04-16 17:19:50",
          expiration: "N/A",
          connected: false,
          expired: false
        },
        {
          id: "2",
          hostname: "machine",
          name: "machine",
          machineKey: "[03pf1]",
          nodeKey: "[dhJcJ]",
          user: "ppp",
          ipAddresses: "100.64.0.2, fd7a:115c:a1a0:ab12",
          ephemeral: false,
          lastSeen: "2025-04-16 17:20:19",
          expiration: "N/A",
          connected: false,
          expired: false
        },
        {
          id: "3",
          hostname: "kali",
          name: "kali-dBdw4jGvl",
          machineKey: "[Modao]",
          nodeKey: "[SKPN]",
          user: "ppp",
          ipAddresses: "100.64.0.3, fd7a:115c:a1a0:ab13",
          ephemeral: false,
          lastSeen: "2025-04-16 17:25:10",
          expiration: "N/A",
          connected: true,
          expired: false
        },
        {
          id: "4",
          hostname: "kali",
          name: "kali-Bdhzvhp",
          machineKey: "[nIqI9]",
          nodeKey: "[e4Bi1]",
          user: "ppp",
          ipAddresses: "100.64.0.4, fd7a:115c:a1a0:ab14",
          ephemeral: false,
          lastSeen: "2025-04-16 19:44:54",
          expiration: "N/A",
          connected: false,
          expired: false
        },
        {
          id: "5",
          hostname: "machine",
          name: "machine-ypenel",
          machineKey: "[7JenM]",
          nodeKey: "[t2fh]",
          user: "ppp",
          ipAddresses: "100.64.0.5, fd7a:115c:a1a0:ab15",
          ephemeral: false,
          lastSeen: "2025-04-16 19:44:54",
          expiration: "N/A",
          connected: false,
          expired: false
        }
      ]
    },
    {
      serverName: "machine",
      namespace: "ppp",
      nodes: [
        {
          id: "6",
          hostname: "kali",
          name: "kali-uxEo6rN",
          machineKey: "[7mRoR]",
          nodeKey: "[hWFS]",
          user: "ppp",
          ipAddresses: "100.64.0.6, fd7a:115c:a1a0:ab16",
          ephemeral: false,
          lastSeen: "2025-04-16 19:44:54",
          expiration: "N/A",
          connected: true,
          expired: false
        },
        {
          id: "7",
          hostname: "kali",
          name: "kali-xkhr59an",
          machineKey: "[JuHo2]",
          nodeKey: "[qVV2o]",
          user: "ppp",
          ipAddresses: "100.64.0.7, fd7a:115c:a1a0:ab17",
          ephemeral: false,
          lastSeen: "2025-04-16 19:44:54",
          expiration: "N/A",
          connected: true,
          expired: false
        },
        {
          id: "8",
          hostname: "kali",
          name: "kali-olaafpdf",
          machineKey: "[5yuVi]",
          nodeKey: "[2VPi5]",
          user: "ppp",
          ipAddresses: "100.64.0.8, fd7a:115c:a1a0:ab18",
          ephemeral: false,
          lastSeen: "2025-05-04 09:54:57",
          expiration: "N/A",
          connected: false,
          expired: false
        }
      ]
    }
  ];

  const fetchServerData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from your Headscale API endpoints
      // For now, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setServerData(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch server data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  const getTotalNodes = () => {
    return serverData.reduce((total, server) => total + server.nodes.length, 0);
  };

  const getConnectedNodes = () => {
    return serverData.reduce((total, server) => 
      total + server.nodes.filter(node => node.connected).length, 0
    );
  };

  const getExpiredNodes = () => {
    return serverData.reduce((total, server) => 
      total + server.nodes.filter(node => node.expired).length, 0
    );
  };

  const formatLastSeen = (lastSeen: string) => {
    return new Date(lastSeen).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor all active users and their addresses across Headscale servers</p>
        </div>
        <Button onClick={fetchServerData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverData.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalNodes()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getConnectedNodes()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getExpiredNodes()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Server Data Tables */}
      {serverData.map((server) => (
        <Card key={server.serverName}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              {server.serverName}
              <Badge variant="secondary">{server.namespace}</Badge>
              <Badge variant="outline">{server.nodes.length} nodes</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Hostname</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Machine Key</TableHead>
                  <TableHead>Node Key</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>IP Addresses</TableHead>
                  <TableHead>Ephemeral</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {server.nodes.map((node) => (
                  <TableRow key={`${server.serverName}-${node.id}`}>
                    <TableCell className="font-mono">{node.id}</TableCell>
                    <TableCell className="font-medium">{node.hostname}</TableCell>
                    <TableCell className="font-medium">{node.name}</TableCell>
                    <TableCell className="font-mono text-sm">{node.machineKey}</TableCell>
                    <TableCell className="font-mono text-sm">{node.nodeKey}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{node.user}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{node.ipAddresses}</TableCell>
                    <TableCell>
                      <Badge variant={node.ephemeral ? "destructive" : "secondary"}>
                        {node.ephemeral ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatLastSeen(node.lastSeen)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant={node.connected ? "default" : "secondary"}>
                          {node.connected ? "Connected" : "Offline"}
                        </Badge>
                        {node.expired && (
                          <Badge variant="destructive">Expired</Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {lastUpdated && (
        <p className="text-sm text-muted-foreground text-center">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default AdminPage;
