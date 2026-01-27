"use client";

import React, { useState } from 'react';
import {
    User,
    Phone,
    Briefcase,
    GraduationCap,
    Plus,
    Trash2,
    ChevronRight,
    Save,
    Camera
} from 'lucide-react';

const CVEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
    const [activeTab, setActiveTab] = useState('personal');

    const updatePersonal = (field: string, value: string) => {
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, [field]: value }
        });
    };

    const selectPhoto = (photoUrl: string) => {
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, photo: photoUrl }
        });
    };

    const updatePhotoAt = (index: number, url: string) => {
        const newPhotos = [...(data.personalInfo.photos || [])];
        newPhotos[index] = url;
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, photos: newPhotos }
        });
    };

    const updateContact = (id: number, value: string) => {
        const newContact = data.personalInfo.contactInfo.map((ci: any) =>
            ci.id === id ? { ...ci, value } : ci
        );
        onChange({
            ...data,
            personalInfo: { ...data.personalInfo, contactInfo: newContact }
        });
    };

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...data.skills.professional];
        newSkills[index] = value;
        onChange({ ...data, skills: { professional: newSkills } });
    };

    const addSkill = () => {
        onChange({
            ...data,
            skills: { professional: [...data.skills.professional, 'Nueva Habilidad'] }
        });
    };

    const removeSkill = (index: number) => {
        const newSkills = data.skills.professional.filter((_: any, i: number) => i !== index);
        onChange({ ...data, skills: { professional: newSkills } });
    };

    const updateExperience = (id: number, field: string, value: any) => {
        const newExp = data.experience.map((exp: any) =>
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        onChange({ ...data, experience: newExp });
    };

    const addExperience = () => {
        const newId = Math.max(...data.experience.map((e: any) => e.id)) + 1;
        const newExp = {
            id: newId,
            period: "20XX — 20XX",
            title: "PUESTO — EMPRESA",
            description: "Descripción del puesto...",
            bullets: ["Logro 1", "Logro 2"]
        };
        onChange({ ...data, experience: [newExp, ...data.experience] });
    };

    const removeExperience = (id: number) => {
        onChange({ ...data, experience: data.experience.filter((e: any) => e.id !== id) });
    };

    const updateEducation = (id: number, field: string, value: string) => {
        const newEdu = data.education.map((edu: any) =>
            edu.id === id ? { ...edu, [field]: value } : edu
        );
        onChange({ ...data, education: newEdu });
    };

    const addEducation = () => {
        const newId = Math.max(...data.education.map((e: any) => e.id), 0) + 1;
        const newEdu = {
            id: newId,
            period: "20XX — 20XX",
            degree: "TÍTULO",
            institution: "INSTITUCIÓN"
        };
        onChange({ ...data, education: [newEdu, ...data.education] });
    };

    const removeEducation = (id: number) => {
        onChange({ ...data, education: data.education.filter((e: any) => e.id !== id) });
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-6 flex flex-col gap-2">
                <button
                    onClick={() => setActiveTab('personal')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'personal' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:bg-white/50'}`}
                >
                    <User size={18} /> Personal
                </button>
                <button
                    onClick={() => setActiveTab('skills')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'skills' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:bg-white/50'}`}
                >
                    <Plus size={18} /> Habilidades
                </button>
                <button
                    onClick={() => setActiveTab('experience')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'experience' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:bg-white/50'}`}
                >
                    <Briefcase size={18} /> Experiencia
                </button>
                <button
                    onClick={() => setActiveTab('education')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'education' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:bg-white/50'}`}
                >
                    <GraduationCap size={18} /> Educación
                </button>

                <div className="mt-auto pt-6 border-t border-gray-200">
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-bold text-primary flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            Edición Activa
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[800px] custom-scrollbar">
                {activeTab === 'personal' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-xl font-bold font-display uppercase tracking-widest border-b pb-4">Info Personal</h3>

                        {/* Photo Selection Section */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Camera size={16} /> Fotos de Perfil (Máx 3)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[0, 1, 2].map((idx) => {
                                    const photoUrl = data.personalInfo.photos?.[idx] || '';
                                    const isActive = data.personalInfo.photo === photoUrl && photoUrl !== '';
                                    return (
                                        <div key={idx} className="space-y-2">
                                            <div
                                                onClick={() => photoUrl && selectPhoto(photoUrl)}
                                                className={`relative aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${isActive ? 'border-primary shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                                            >
                                                {photoUrl ? (
                                                    <>
                                                        <img src={photoUrl} className="w-full h-full object-cover" alt={`Profile ${idx + 1}`} />
                                                        {isActive && (
                                                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Activa</span>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                                        <Plus size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                placeholder="URL de Imagen"
                                                value={photoUrl}
                                                onChange={(e) => updatePhotoAt(idx, e.target.value)}
                                                className="w-full px-3 py-2 text-[10px] bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-primary/20"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-[10px] text-gray-400 italic">Haz clic en una foto para seleccionarla como la actual de tu CV.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nombre</label>
                                <input
                                    value={data.personalInfo.name}
                                    onChange={(e) => updatePersonal('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Apellido</label>
                                <input
                                    value={data.personalInfo.lastName}
                                    onChange={(e) => updatePersonal('lastName', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Rol / Cargo</label>
                                <input
                                    value={data.personalInfo.role}
                                    onChange={(e) => updatePersonal('role', e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Contacto</h4>
                            {data.personalInfo.contactInfo.map((ci: any) => (
                                <div key={ci.id} className="flex gap-4">
                                    <span className="shrink-0 w-24 text-[10px] font-black uppercase text-gray-300 pt-4 tracking-tighter">{ci.type}</span>
                                    <input
                                        value={ci.value}
                                        onChange={(e) => updateContact(ci.id, e.target.value)}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Objetivo Profesional</h4>
                            <textarea
                                value={data.objective}
                                onChange={(e) => onChange({ ...data, objective: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-xl font-bold font-display uppercase tracking-widest">Habilidades</h3>
                            <button onClick={addSkill} className="p-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.skills.professional.map((skill: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        value={skill}
                                        onChange={(e) => updateSkill(index, e.target.value)}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button onClick={() => removeSkill(index)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'experience' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-xl font-bold font-display uppercase tracking-widest">Experiencia</h3>
                            <button onClick={addExperience} className="p-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-12">
                            {data.experience.map((exp: any) => (
                                <div key={exp.id} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 relative group">
                                    <button
                                        onClick={() => removeExperience(exp.id)}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Periodo</label>
                                            <input
                                                value={exp.period}
                                                onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cargo — Empresa</label>
                                            <input
                                                value={exp.title}
                                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Descripción Corta</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px] resize-none mb-4"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Logros (uno por línea)</label>
                                        <textarea
                                            value={exp.bullets.join('\n')}
                                            onChange={(e) => updateExperience(exp.id, 'bullets', e.target.value.split('\n'))}
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-xl font-bold font-display uppercase tracking-widest">Educación</h3>
                            <button onClick={addEducation} className="p-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-8">
                            {data.education.map((edu: any) => (
                                <div key={edu.id} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 relative group">
                                    <button
                                        onClick={() => removeEducation(edu.id)}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Periodo</label>
                                            <input
                                                value={edu.period}
                                                onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Título</label>
                                            <input
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Institución</label>
                                            <input
                                                value={edu.institution}
                                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVEditor;
