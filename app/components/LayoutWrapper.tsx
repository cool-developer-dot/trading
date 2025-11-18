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
  const [isMobile, setIsMobile] = useState(false);
  
  // Pages where we don't want the app layout (e.g., auth pages)
  const excludedPaths = ['/auth'];
  const shouldShowAppLayout = !excludedPaths.some(path => pathname.startsWith(path));

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen, isMobile]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(prev => !prev);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  if (!shouldShowAppLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleMobileSidebarClose}
        />
      )}

      {/* Sidebar - Hidden on mobile unless opened */}
      <div className={`
        ${isMobile ? 'fixed' : 'fixed'}
        ${isMobile && !isMobileSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300 ease-in-out z-50
      `}>
        <AppSidebar
          isCollapsed={isMobile ? false : isSidebarCollapsed}
          onToggle={handleSidebarToggle}
          isMobile={isMobile}
          onClose={handleMobileSidebarClose}
        />
      </div>
      
      {/* Main Content Area */}
      <div className={`
        transition-all duration-300
        ${isMobile ? 'ml-0' : (isSidebarCollapsed ? 'ml-20' : 'ml-64')}
      `}>
        {/* Topbar */}
        <AppTopbar
          isCollapsed={isSidebarCollapsed}
          onMenuClick={handleSidebarToggle}
          isMobile={isMobile}
        />
        
        {/* Page Content */}
        <main className={`
          pt-16
          ${isMobile ? 'pb-20' : 'pb-6'}
          min-h-screen
        `}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileBottomNav />}
      </div>
    </div>
  );
});

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;
