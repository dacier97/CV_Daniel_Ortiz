import {
    FileText,
    Layout,
    Image as ImageIcon,
    Settings,
    Download,
    PlusCircle,
    User,
    LogOut,
    Palette,
    Check,
    Zap,
    ChevronDown,
    Linkedin,
    Instagram,
    Facebook
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({
    isOpen,
    onClose,
    onLogout,
    currentColor,
    onColorChange,
    isAtsFriendly,
    onToggleAts
}: {
    isOpen: boolean,
    onClose: () => void,
    onLogout: () => void,
    currentColor: string,
    onColorChange: (color: string) => void,
    isAtsFriendly: boolean,
    onToggleAts: () => void
}) => {
    const [isColorOpen, setIsColorOpen] = useState(false);
    const menuItems = [
        { icon: <FileText size={20} />, label: "Mis Documentos", active: true },
    ];

    const themes = [
        { name: "Creativo", color: "#FF5E1A", sector: "Diseño, Marketing" },
        { name: "Corporativo", color: "#0F172A", sector: "Banca, Legal" },
        { name: "Médico", color: "#0EA5E9", sector: "Salud, Ciencia" },
        { name: "Tecnológico", color: "#8B5CF6", sector: "IT, Software" },
        { name: "Elegante", color: "#BE185D", sector: "Moda, Lujo" }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            <aside className={`fixed lg:sticky top-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col h-screen transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <FileText size={24} />
                            </div>
                            <h1 className="text-xl font-black tracking-tight text-foreground font-display">CV<span className="text-primary">GEN</span></h1>
                        </div>
                        {/* Close button for mobile */}
                        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-foreground">
                            <PlusCircle size={24} className="rotate-45" />
                        </button>
                    </div>

                    <nav className="space-y-2 mb-10">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-foreground"
                                    }`}
                            >
                                <span className={`${item.active ? "text-primary" : "text-gray-400 group-hover:text-primary transition-colors"}`}>
                                    {item.icon}
                                </span>
                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="space-y-4">
                        <button
                            onClick={() => setIsColorOpen(!isColorOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 rounded-lg transition-all group"
                        >
                            <div className="flex items-center gap-2">
                                <Palette size={16} className="text-primary" />
                                <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none pt-1">Personalizar Color</h3>
                            </div>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isColorOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isColorOpen && (
                            <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.color}
                                        onClick={() => onColorChange(theme.color)}
                                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${currentColor === theme.color ? 'bg-gray-50 border-gray-200 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-6 h-6 rounded-lg shadow-inner ring-2 ring-white"
                                                style={{ backgroundColor: theme.color }}
                                            ></div>
                                            <div>
                                                <p className={`text-xs font-bold leading-tight ${currentColor === theme.color ? 'text-foreground' : 'text-gray-500'}`}>{theme.name}</p>
                                                <p className="text-[9px] text-gray-400 font-medium">{theme.sector}</p>
                                            </div>
                                        </div>
                                        {currentColor === theme.color && (
                                            <Check size={14} className="text-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-50 space-y-4">
                            <div className="flex items-center justify-between px-4">
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className={isAtsFriendly ? "text-amber-500 fill-amber-500" : "text-gray-400"} />
                                    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none pt-1">Modo ATS Friendly</h3>
                                </div>
                                <button
                                    onClick={onToggleAts}
                                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAtsFriendly ? 'bg-primary' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAtsFriendly ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>
                            </div>
                            <p className="px-4 text-[9px] text-gray-400 font-medium leading-relaxed">
                                Optimiza tu CV para sistemas automáticos de filtrado. Una sola columna, fuentes estándar y formato simplificado.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-4 mb-4">Redes Sociales</h3>
                            <div className="flex items-center gap-2 px-2">
                                <a href="#" className="p-2 text-gray-400 hover:text-[#0077b5] hover:bg-gray-50 rounded-lg transition-all" title="LinkedIn">
                                    <Linkedin size={18} />
                                </a>
                                <a href="#" className="p-2 text-gray-400 hover:text-[#e4405f] hover:bg-gray-50 rounded-lg transition-all" title="Instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all" title="X">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all" title="TikTok">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                    </svg>
                                </a>
                                <a href="#" className="p-2 text-gray-400 hover:text-[#1877f2] hover:bg-gray-50 rounded-lg transition-all" title="Facebook">
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-8 border-t border-gray-50 bg-white">
                    <div className="flex items-center gap-4 mb-8 p-3 rounded-2xl bg-gray-50/50">
                        <div className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                            EH
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold text-foreground truncate">Emma Harrison</p>
                            <p className="text-[10px] text-gray-400 font-medium truncate">Premium Account</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-bold tracking-tight">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
