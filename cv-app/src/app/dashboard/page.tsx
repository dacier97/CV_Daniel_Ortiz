"use client";

import { useState, useEffect } from 'react';
import CVTemplate from "@/components/cv/CVTemplate";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";
import CVEditor from "@/components/cv/CVEditor";
import { mockCVData } from "@/lib/mockData";
import { signOut } from '@/app/actions/auth';
import { getProfile, updateProfile } from '@/app/actions/profile';
import DocumentManager from '@/components/ui/DocumentManager';

export default function DashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDocsOpen, setIsDocsOpen] = useState(false);
    const [cvData, setCvData] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');
    const [isAtsFriendly, setIsAtsFriendly] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load data from Supabase
    useEffect(() => {
        async function loadData() {
            const profile = await getProfile();
            if (profile) {
                setCvData({
                    ...mockCVData,
                    themeColor: profile.theme_color || mockCVData.themeColor,
                    personalInfo: {
                        ...mockCVData.personalInfo,
                        name: profile.full_name?.split(' ')[0] || mockCVData.personalInfo.name,
                        lastName: profile.full_name?.split(' ').slice(1).join(' ') || mockCVData.personalInfo.lastName,
                        role: profile.role || mockCVData.personalInfo.role,
                        photo: profile.avatar_url || '',
                        photos: profile.avatar_gallery?.length ? profile.avatar_gallery : ['', '', ''],
                        contactInfo: profile.contact_info || mockCVData.personalInfo.contactInfo,
                    },
                    objective: profile.bio || mockCVData.objective,
                    skills: profile.skills || mockCVData.skills,
                    experience: profile.experience || mockCVData.experience,
                    education: profile.education || mockCVData.education,
                });
            } else {
                setCvData(mockCVData);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('full_name', `${cvData.personalInfo.name} ${cvData.personalInfo.lastName}`);
        formData.append('role', cvData.personalInfo.role);
        formData.append('bio', cvData.objective);
        formData.append('skills', JSON.stringify(cvData.skills));
        formData.append('experience', JSON.stringify(cvData.experience));
        formData.append('education', JSON.stringify(cvData.education));
        formData.append('contact_info', JSON.stringify(cvData.personalInfo.contactInfo));
        formData.append('theme_color', cvData.themeColor);

        const result = await updateProfile(formData);
        if (result.success) {
            alert('¡Perfil actualizado en Supabase!');
        } else {
            alert('Error: ' + result.error);
        }
    };

    const handleLogout = async () => {
        await signOut();
    };

    const handleColorChange = (color: string) => {
        setCvData({ ...cvData, themeColor: color });
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden relative font-sans">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
                currentColor={cvData?.themeColor || "#FF5E1A"}
                onColorChange={handleColorChange}
                isAtsFriendly={isAtsFriendly}
                onToggleAts={() => setIsAtsFriendly(!isAtsFriendly)}
                userName={`${cvData?.personalInfo?.name || ''} ${cvData?.personalInfo?.lastName || ''}`}
                onDocumentsClick={() => setIsDocsOpen(true)}
            />

            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <Navbar
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onSave={handleSave}
                    viewMode={viewMode}
                    onToggleView={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
                    onDownloadPremium={() => {
                        setIsAtsFriendly(false);
                        setViewMode('preview');
                        setTimeout(() => window.print(), 300);
                    }}
                    onDownloadAts={() => {
                        setIsAtsFriendly(true);
                        setViewMode('preview');
                        setTimeout(() => window.print(), 300);
                    }}
                />

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

            <DocumentManager isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
        </div>
    );
}
