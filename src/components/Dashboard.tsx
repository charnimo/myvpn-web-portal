
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Wifi, Server, Lock } from "lucide-react";
import ServerSelector from "@/components/ServerSelector";
import ConnectionStatus from "@/components/ConnectionStatus";
import ConnectionStats from "@/components/ConnectionStats";

const Dashboard = () => {
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected");
  const [selectedServer, setSelectedServer] = useState("New York, US");

  const handleConnect = () => {
    if (connectionStatus === "disconnected") {
      setConnectionStatus("connecting");
      setTimeout(() => {
        setConnectionStatus("connected");
      }, 2000);
    } else {
      setConnectionStatus("disconnected");
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Connection Status</CardTitle>
                <CardDescription>Manage your VPN connection</CardDescription>
              </div>
              <ConnectionStatus status={connectionStatus} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Selected Server</p>
                    <p className="text-lg font-semibold">{selectedServer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Protection</p>
                    <p className="text-lg font-semibold">
                      {connectionStatus === "connected" ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className={`w-full ${connectionStatus === "connected" ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}`} 
                size="lg" 
                onClick={handleConnect}
              >
                {connectionStatus === "connected" ? "Disconnect" : connectionStatus === "connecting" ? "Connecting..." : "Connect"}
              </Button>
              
              {connectionStatus === "connected" && <ConnectionStats />}
            </div>
          </CardContent>
        </Card>
        
        <ServerSelector onServerSelect={setSelectedServer} selectedServer={selectedServer} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Network Protection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Protect your data on public WiFi networks.</p>
            <Button variant="outline" className="w-full">Manage Settings</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Server Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">All servers operational.</p>
            <Button variant="outline" className="w-full">View Status</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Privacy Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Enhance your online privacy.</p>
            <Button variant="outline" className="w-full">Configure</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
