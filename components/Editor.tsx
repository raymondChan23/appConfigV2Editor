import React, { useState, useCallback } from 'react';
import { UpdateValueFn } from '../types';
import { isColorKey, isDateKey, toInputDate, fromInputDate } from '../utils/helpers';
import { Plus, Trash2, ChevronDown, ChevronRight, Hash, Type, Calendar, Palette } from 'lucide-react';

interface EditorProps {
    data: any;
    path: string[];
    onUpdate: UpdateValueFn;
    level?: number;
}

const FieldLabel: React.FC<{ label: string; icon?: React.ReactNode; tooltip?: string }> = ({ label, icon, tooltip }) => (
    <div className="flex items-center gap-2 mb-1.5">
        {icon && <span className="text-slate-400">{icon}</span>}
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 select-none">
            {label}
        </label>
    </div>
);

const InputWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative group transition-all duration-200">
        {children}
    </div>
);

export const Editor: React.FC<EditorProps> = ({ data, path, onUpdate, level = 0 }) => {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const toggleCollapse = (key: string) => {
        setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePrimitiveChange = (key: string, value: any) => {
        onUpdate([...path, key], value);
    };

    if (data === null || data === undefined) {
        return <div className="text-slate-400 italic p-2">Null Value</div>;
    }

    // Array Handling
    if (Array.isArray(data)) {
        return (
            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center bg-slate-100 rounded-md px-2 py-1 border border-slate-200 group hover:border-brand-300 transition-colors">
                            {typeof item === 'number' || typeof item === 'string' ? (
                                <input
                                    type={typeof item === 'number' ? 'number' : 'text'}
                                    value={item}
                                    onChange={(e) => {
                                        const val = typeof item === 'number' ? parseFloat(e.target.value) : e.target.value;
                                        const newArray = [...data];
                                        newArray[index] = val;
                                        onUpdate(path, newArray);
                                    }}
                                    className="bg-transparent border-none outline-none text-sm w-20 text-slate-700"
                                />
                            ) : (
                                <span className="text-xs text-slate-500">Object</span>
                            )}
                            <button
                                onClick={() => {
                                    const newArray = data.filter((_, i) => i !== index);
                                    onUpdate(path, newArray);
                                }}
                                className="ml-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newItem = typeof data[0] === 'number' ? 0 : "";
                            onUpdate(path, [...data, newItem]);
                        }}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-md border border-brand-200 transition-colors"
                    >
                        <Plus size={12} /> Add
                    </button>
                </div>
            </div>
        );
    }

    // Object Handling
    if (typeof data === 'object') {
        return (
            <div className={`space-y-4 ${level > 0 ? 'pl-4 border-l-2 border-slate-100' : ''}`}>
                {Object.entries(data).map(([key, value]) => {
                    const currentPath = [...path, key];
                    const isObj = typeof value === 'object' && value !== null && !Array.isArray(value);
                    const isArr = Array.isArray(value);
                    const isCollapsible = isObj || (isArr && (value as any[]).length > 3);
                    const isCollapsed = collapsed[key];

                    return (
                        <div key={key} className="relative">
                            {isCollapsible ? (
                                <div className="mb-2">
                                    <button
                                        onClick={() => toggleCollapse(key)}
                                        className="flex items-center gap-2 w-full text-left py-1 hover:bg-slate-50 rounded px-1 -ml-1 transition-colors"
                                    >
                                        {isCollapsed ? <ChevronRight size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                                        <span className="font-semibold text-slate-700 text-sm">{key}</span>
                                        <span className="text-xs text-slate-400 ml-auto font-mono">
                                            {isArr ? `Array[${(value as any[]).length}]` : '{ }'}
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <FieldLabel 
                                    label={key} 
                                    icon={
                                        typeof value === 'number' ? <Hash size={12} /> : 
                                        isColorKey(key) ? <Palette size={12} /> :
                                        isDateKey(key) ? <Calendar size={12} /> :
                                        <Type size={12} />
                                    } 
                                />
                            )}

                            {(!isCollapsible || !isCollapsed) && (
                                <div>
                                    {isObj || isArr ? (
                                        <Editor 
                                            data={value} 
                                            path={currentPath} 
                                            onUpdate={onUpdate} 
                                            level={level + 1} 
                                        />
                                    ) : (
                                        <InputWrapper>
                                            {renderInput(key, value, (val) => handlePrimitiveChange(key, val))}
                                        </InputWrapper>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};

const renderInput = (key: string, value: any, onChange: (val: any) => void) => {
    // Check for custom date format first (string length 12 and numeric)
    if (typeof value === 'string' && value.length === 12 && /^\d+$/.test(value) && isDateKey(key)) {
        return (
            <input
                type="datetime-local"
                value={toInputDate(value)}
                onChange={(e) => onChange(fromInputDate(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
            />
        );
    }
    
    // Check for ISO date string
    if (typeof value === 'string' && isDateKey(key) && (value.includes('T') || value.includes('-'))) {
         // Fallback for timezone handling simply
         const dateVal = value.split('+')[0]; // Remove timezone for simple editing if present
         return (
            <input
                type="datetime-local"
                value={dateVal}
                onChange={(e) => {
                    // Primitive reconstruction of timezone if originally present
                    const originalZone = value.includes('+') ? '+' + value.split('+')[1] : '';
                    onChange(e.target.value + originalZone);
                }}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
            />
        );
    }

    // Color Input
    if (typeof value === 'string' && isColorKey(key)) {
        return (
            <div className="flex gap-2 items-center">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0">
                    <input
                        type="color"
                        value={value.startsWith('#') ? value : '#000000'}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer border-none p-0"
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono uppercase transition-all shadow-sm"
                />
            </div>
        );
    }

    // Number Input
    if (typeof value === 'number') {
        return (
            <input
                type="number"
                value={value}
                step="any"
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono transition-all shadow-sm"
            />
        );
    }

    // Default Text Input
    return (
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm placeholder:text-slate-300"
            placeholder="Empty"
        />
    );
};
