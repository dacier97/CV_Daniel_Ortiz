"use client";

import { useState, useEffect } from 'react';
import CVTemplate from "@/components/cv/CVTemplate";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";
import LoginForm from "@/components/forms/LoginForm";
import CVEditor from "@/components/cv/CVEditor";
import { mockCVData } from "@/lib/mockData";
import { Save, Eye, Edit3 } from 'lucide-react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cvData, setCvData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');

  // Load data from localStorage or mock
  useEffect(() => {
    const savedData = localStorage.getItem('cv_data_local');
    if (savedData) {
      setCvData(JSON.parse(savedData));
    } else {
      setCvData(mockCVData);
    }

    const savedAuth = localStorage.getItem('cv_auth_mock');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cv_data_local', JSON.stringify(cvData));
    alert('¡Cambios guardados localmente!');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('cv_auth_mock', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('cv_auth_mock');
  };

  const [isAtsFriendly, setIsAtsFriendly] = useState(false);

  const handleColorChange = (color: string) => {
    setCvData({ ...cvData, themeColor: color });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden relative font-sans">
      {/* App Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        currentColor={cvData?.themeColor || "#FF5E1A"}
        onColorChange={handleColorChange}
        isAtsFriendly={isAtsFriendly}
        onToggleAts={() => setIsAtsFriendly(!isAtsFriendly)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navigation */}
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onSave={handleSave}
          viewMode={viewMode}
          onToggleView={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
          onDownloadPremium={() => {
            setIsAtsFriendly(false);
            setViewMode('preview');
            // Small timeout to ensure state render before print dialog
            setTimeout(() => window.print(), 300);
          }}
          onDownloadAts={() => {
            setIsAtsFriendly(true);
            setViewMode('preview');
            // Small timeout to ensure state render before print dialog
            setTimeout(() => window.print(), 300);
          }}
        />

        {/* content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 custom-scrollbar bg-gray-50/50">
          <div className="max-w-5xl mx-auto space-y-8">
            {viewMode === 'edit' ? (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <CVEditor data={cvData} onChange={setCvData} />
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-300 cv-print-container">
                <CVTemplate data={cvData} isAtsFriendly={isAtsFriendly} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
