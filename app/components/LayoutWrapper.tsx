'use client';

import { usePathname } from 'next/navigation';
import { memo, useState, useEffect } from 'react';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import MobileBottomNav from './MobileBottomNav';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = memo(({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Pages where we don't want the app layout (e.g., auth pages)
  const excludedPaths = ['/auth'];
  const shouldShowAppLayout = !excludedPaths.some(path => pathname.startsWith(path));

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  if (!shouldShowAppLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay - Only show on mobile when sidebar is open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={handleMobileSidebarClose}
        />
      )}

      {/* Sidebar - Desktop: Always visible, Mobile: Slide-in when open */}
      <div className={`
        fixed left-0 top-0 h-screen z-50
        md:translate-x-0
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
      `}>
        <AppSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
          onClose={handleMobileSidebarClose}
        />
      </div>
      
      {/* Main Content Area */}
      <div className={`
        transition-all duration-300
        md:ml-64 md:${isSidebarCollapsed ? 'ml-20' : 'ml-64'}
      `}>
        {/* Topbar */}
        <AppTopbar
          isCollapsed={isSidebarCollapsed}
          onMenuClick={handleMobileMenuToggle}
        />
        
        {/* Page Content */}
        <main className="pt-16 pb-20 md:pb-6 min-h-screen">
          {children}
        </main>

        {/* Mobile Bottom Navigation - Only show on mobile */}
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </div>
  );
});

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;
