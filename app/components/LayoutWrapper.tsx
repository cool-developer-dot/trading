'use client';

import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = memo(({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Pages where we don't want the app layout (e.g., auth pages)
  const excludedPaths = ['/auth'];
  const shouldShowAppLayout = !excludedPaths.some(path => pathname.startsWith(path));

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  if (!shouldShowAppLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      
      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Topbar */}
        <AppTopbar isCollapsed={isSidebarCollapsed} />
        
        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
});

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;
