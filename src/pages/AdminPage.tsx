
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
  name: string;
  nodeKey: string;
  namespace: string;
  ipAddress: string;
  ephemeral: boolean;
  lastSeen: string;
  online: boolean;
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

  // Mock data based on the Headscale output shown in the image
  const mockData: ServerData[] = [
    {
      serverName: "JeroNET",
      namespace: "JeroNET",
      nodes: [
        {
          id: "3",
          name: "4008335478",
          nodeKey: "[hHtHo]",
          namespace: "JeroNET",
          ipAddress: "100.64.0.1",
          ephemeral: false,
          lastSeen: "2021-10-27 17:27:26",
          online: false
        },
        {
          id: "4",
          name: "JeroDockerHost04",
          nodeKey: "[3goO/]",
          namespace: "JeroNET",
          ipAddress: "100.64.0.3",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:06",
          online: true
        },
        {
          id: "6",
          name: "656526",
          nodeKey: "[xfJNM]",
          namespace: "JeroNET",
          ipAddress: "100.64.0.4",
          ephemeral: false,
          lastSeen: "2021-10-28 06:34:31",
          online: true
        },
        {
          id: "7",
          name: "fw",
          nodeKey: "[eU7qN]",
          namespace: "JeroNET",
          ipAddress: "100.64.0.5",
          ephemeral: false,
          lastSeen: "2021-10-28 06:34:22",
          online: true
        }
      ]
    },
    {
      serverName: "AsseNET",
      namespace: "AsseNET",
      nodes: [
        {
          id: "3",
          name: "Owncloud",
          nodeKey: "[Rz89l]",
          namespace: "AsseNET",
          ipAddress: "100.64.0.2",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:14",
          online: true
        },
        {
          id: "8",
          name: "oWRT",
          nodeKey: "[ipPUb]",
          namespace: "AsseNET",
          ipAddress: "100.64.0.6",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:14",
          online: true
        },
        {
          id: "9",
          name: "oWRT-",
          nodeKey: "[Gdqyp]",
          namespace: "AsseNET",
          ipAddress: "100.64.0.7",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:07",
          online: true
        },
        {
          id: "10",
          name: "oWRT-",
          nodeKey: "[SM/UO]",
          namespace: "AsseNET",
          ipAddress: "100.64.0.8",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:06",
          online: true
        },
        {
          id: "11",
          name: "oWRT-",
          nodeKey: "[aZaIn]",
          namespace: "AsseNET",
          ipAddress: "100.64.0.9",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:13",
          online: true
        }
      ]
    },
    {
      serverName: "testspace",
      namespace: "testspace",
      nodes: [
        {
          id: "7",
          name: "fw",
          nodeKey: "[eU7qN]",
          namespace: "JeroNET",
          ipAddress: "100.64.0.5",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:22",
          online: true
        },
        {
          id: "5",
          name: "Owncloud",
          nodeKey: "[Rz89l]",
          namespace: "AsseNET",
          ipAddress: "100.64.0.2",
          ephemeral: false,
          lastSeen: "2021-10-28 06:35:14",
          online: true
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

  const getOnlineNodes = () => {
    return serverData.reduce((total, server) => 
      total + server.nodes.filter(node => node.online).length, 0
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
          <p className="text-muted-foreground">Monitor all active users and their addresses across servers</p>
        </div>
        <Button onClick={fetchServerData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-sm font-medium">Online Nodes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getOnlineNodes()}</div>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Node Key</TableHead>
                  <TableHead>Namespace</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {server.nodes.map((node) => (
                  <TableRow key={`${server.serverName}-${node.id}`}>
                    <TableCell className="font-mono">{node.id}</TableCell>
                    <TableCell className="font-medium">{node.name}</TableCell>
                    <TableCell className="font-mono text-sm">{node.nodeKey}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{node.namespace}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{node.ipAddress}</TableCell>
                    <TableCell className="text-sm">{formatLastSeen(node.lastSeen)}</TableCell>
                    <TableCell>
                      <Badge variant={node.online ? "default" : "destructive"}>
                        {node.online ? "Online" : "Offline"}
                      </Badge>
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
