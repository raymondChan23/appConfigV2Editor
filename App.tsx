import React, { useState, useEffect } from 'react';
import { INITIAL_DATA } from './constants';
import { ConfigData, UpdateValueFn } from './types';
import { updateJsonValue, downloadJson } from './utils/helpers';
import { Editor } from './components/Editor';
import { Visualizer } from './components/Visualizer';
import { 
    LayoutDashboard, 
    Settings, 
    CreditCard, 
    Globe, 
    Download, 
    Upload, 
    Code, 
    PieChart, 
    FileJson, 
    Menu, 
    X, 
    Search
} from 'lucide-react';

// Navigation Sections mapping
const SECTIONS = [
    { id: 'visualize', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'theme', label: 'Theme Settings', icon: <Settings size={20} /> },
    { id: 'amountSetting', label: 'Amount Limits', icon: <CreditCard size={20} /> },
    { id: 'aoSetting', label: 'AO Settings', icon: <PieChart size={20} /> },
    { id: 'eeCustomMerchant', label: 'Merchants', icon: <Settings size={20} /> },
    { id: 'travel', label: 'Travel', icon: <Globe size={20} /> },
    { id: 'cross_sell', label: 'Cross Sell', icon: <Settings size={20} /> },
    { id: 'raw', label: 'Raw JSON', icon: <Code size={20} /> },
];

function App() {
    const [data, setData] = useState<ConfigData>(INITIAL_DATA);
    const [activeSection, setActiveSection] = useState('visualize');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleUpdate: UpdateValueFn = (path, value) => {
        setData(prev => updateJsonValue(prev, path, value));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    setData(json);
                } catch (error) {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Filter logic for section content searching
    const matchesSearch = (key: string, value: any): boolean => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        if (key.toLowerCase().includes(term)) return true;
        if (typeof value === 'string' && value.toLowerCase().includes(term)) return true;
        if (typeof value === 'object' && value !== null) {
            return Object.entries(value).some(([k, v]) => matchesSearch(k, v));
        }
        return false;
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-800 overflow-hidden">
            {/* Sidebar */}
            <aside 
                className={`
                    fixed md:static inset-y-0 left-0 z-40
                    bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0 overflow-hidden'}
                `}
            >
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-brand-glow">
                        <FileJson size={18} />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight text-slate-900 whitespace-nowrap">Config Editor</h1>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                    ${activeSection === section.id 
                                        ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200' 
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                                `}
                            >
                                {section.icon}
                                <span className="whitespace-nowrap">{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
                    <div className="relative">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg cursor-pointer hover:bg-slate-50 hover:border-brand-300 transition-all shadow-sm"
                        >
                            <Upload size={16} /> Import JSON
                        </label>
                    </div>
                    <button
                        onClick={() => downloadJson(data, 'application.json')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                        <Download size={16} /> Export JSON
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
                
                {/* Header Mobile Toggle */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {SECTIONS.find(s => s.id === activeSection)?.label}
                        </h2>
                    </div>
                    
                    {activeSection !== 'visualize' && activeSection !== 'raw' && (
                        <div className="relative max-w-xs w-full hidden sm:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Filter keys..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all"
                            />
                        </div>
                    )}
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6 scroll-smooth">
                    <div className="max-w-5xl mx-auto">
                        {activeSection === 'visualize' && (
                            <Visualizer data={data} />
                        )}

                        {activeSection === 'raw' && (
                            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
                                <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                                    <span className="text-xs font-mono text-slate-400">application.json</span>
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 4))}
                                        className="text-xs text-brand-400 hover:text-brand-300 font-medium"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <pre className="p-4 text-sm text-slate-300 font-mono overflow-auto h-[calc(100vh-200px)]">
                                    {JSON.stringify(data, null, 4)}
                                </pre>
                            </div>
                        )}

                        {activeSection !== 'visualize' && activeSection !== 'raw' && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <Editor 
                                        data={data[activeSection]} 
                                        path={[activeSection]} 
                                        onUpdate={handleUpdate} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
