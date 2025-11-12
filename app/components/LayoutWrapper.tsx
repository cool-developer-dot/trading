'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = memo(({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  
  // Pages where we don't want Header and Footer
  const excludedPaths = ['/auth'];
  const shouldShowHeaderFooter = !excludedPaths.some(path => pathname.startsWith(path));

  if (!shouldShowHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
});

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;

