'use client';

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseComponentProps } from '@/types';
import { CONTRACT_ROLES } from '@/lib/constants';

interface RoleVerifierProps extends BaseComponentProps {
  contractAddress?: string;
  contractABI?: unknown[];
}

export function RoleVerifier({ className = '', contractAddress, contractABI }: RoleVerifierProps) {
  const { address, isConnected } = useAccount();

  // Check for admin role
  const { data: hasAdminRole, isLoading: adminLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: 'hasRole',
    args: [CONTRACT_ROLES.DEFAULT_ADMIN_ROLE, address],
    query: {
      enabled: !!contractAddress && !!contractABI && !!address && isConnected,
    },
  });

  // Check for minter role
  const { data: hasMinterRole, isLoading: minterLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: 'hasRole',
    args: [CONTRACT_ROLES.MINTER_ROLE, address],
    query: {
      enabled: !!contractAddress && !!contractABI && !!address && isConnected,
    },
  });

  if (!isConnected) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Role Verification</CardTitle>
          <CardDescription>Connect your wallet to check roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-500">Wallet not connected</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!contractAddress || !contractABI) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Role Verification</CardTitle>
          <CardDescription>Contract not configured</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-500">Contract configuration required</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isLoading = adminLoading || minterLoading;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Role Verification</CardTitle>
        <CardDescription>Your current permissions on this contract</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Checking roles...</span>
          </div>
        ) : (
          <>
            {/* Role Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Admin Role:</span>
                <Badge variant={hasAdminRole ? "default" : "secondary"}>
                  {hasAdminRole ? "Yes" : "No"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Minter Role:</span>
                <Badge variant={hasMinterRole ? "default" : "secondary"}>
                  {hasMinterRole ? "Yes" : "No"}
                </Badge>
              </div>
            </div>

            {/* Role Description */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700 space-y-2">
                <div>
                  <span className="font-medium">Admin Role:</span> Can manage roles, grant/revoke permissions
                </div>
                <div>
                  <span className="font-medium">Minter Role:</span> Can mint new NFTs
                </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="pt-2">
              <div className="text-xs text-gray-500">
                <span className="font-medium">Wallet:</span> {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
