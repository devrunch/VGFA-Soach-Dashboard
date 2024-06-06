import React, { useEffect, useState } from 'react';

const DesktopOnly = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Please open this site on a desktop to use it</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DesktopOnly;
