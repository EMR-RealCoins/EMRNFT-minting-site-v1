import React from 'react';
import { BaseComponentProps } from '@/types';

interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
