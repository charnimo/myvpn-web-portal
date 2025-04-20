
import React, { useState } from 'react';
import Button from './Button';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState('New York, US');

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">VPN Status</h2>
              <p className="text-gray-600">Current server: {selectedServer}</p>
            </div>
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className="text-gray-700">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          
          <Button
            variant={isConnected ? 'danger' : 'primary'}
            size="lg"
            className="w-full"
            onClick={handleConnect}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
          
          {isConnected && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Upload Speed</p>
                <p className="text-lg font-semibold">45.2 Mbps</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Download Speed</p>
                <p className="text-lg font-semibold">78.9 Mbps</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Connect Servers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['New York, US', 'London, UK', 'Singapore', 'Tokyo, JP'].map((server) => (
              <button
                key={server}
                onClick={() => setSelectedServer(server)}
                className={`p-4 rounded-md border transition-colors ${
                  selectedServer === server 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <p className="font-medium">{server}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
