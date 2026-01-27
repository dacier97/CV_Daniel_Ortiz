import { Share2, Download, Eye, Save, Menu, Edit3, ChevronDown, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({
    onMenuClick,
    onSave,
    viewMode,
    onToggleView,
    onDownloadPremium,
    onDownloadAts
}: {
    onMenuClick: () => void,
    onSave: () => void,
    viewMode: 'edit' | 'preview',
    onToggleView: () => void,
    onDownloadPremium: () => void,
    onDownloadAts: () => void
}) => {
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    return (
        <nav className="h-16 lg:h-20 bg-white border-b border-gray-100 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-10 transition-all">
            <div className="flex items-center gap-3 lg:gap-6">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                >
                    <Menu size={24} />
                </button>
                <h2 className="text-[10px] lg:text-sm font-bold text-gray-400 uppercase tracking-[0.1em] lg:tracking-[0.2em] truncate max-w-[120px] lg:max-w-none">
                    Editor / <span className="text-foreground">Emma Harrison CV</span>
                </h2>
                <div className="hidden sm:block px-2 lg:px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-md border border-green-100 shrink-0">
                    Auto-guardado
                </div>
            </div>

            <div className="flex items-center gap-1 lg:gap-4 font-display">
                <button
                    onClick={onToggleView}
                    className="flex items-center gap-2 p-2 lg:px-5 lg:py-2.5 text-sm font-bold text-gray-500 hover:text-foreground hover:bg-gray-50 rounded-xl transition-all"
                >
                    {viewMode === 'preview' ? (
                        <>
                            <Edit3 size={18} />
                            <span className="hidden lg:inline">Editar</span>
                        </>
                    ) : (
                        <>
                            <Eye size={18} />
                            <span className="hidden lg:inline">Vista Previa</span>
                        </>
                    )}
                </button>
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 p-2 lg:px-5 lg:py-2.5 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all"
                >
                    <Save size={18} />
                    <span className="hidden lg:inline">Guardar</span>
                </button>
                <div className="hidden lg:block w-px h-6 bg-gray-100 mx-2"></div>

                <div className="relative">
                    <button
                        onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                        className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-2.5 bg-foreground text-white text-xs lg:text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                    >
                        <Download size={18} className="lg:w-[18px] lg:h-[18px] w-4 h-4" />
                        <span className="inline">Descargar <span className="hidden sm:inline">PDF</span></span>
                        <ChevronDown size={14} className={`ml-1 transition-transform ${isDownloadOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDownloadOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDownloadOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                <button
                                    onClick={() => {
                                        onDownloadPremium();
                                        setIsDownloadOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <CheckCircle size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">Versión Premium</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Con foto y diseño visual</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        onDownloadAts();
                                        setIsDownloadOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                                        <Download size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">Versión ATS Friendly</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Optimizado para lectura automática</p>
                                    </div>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
