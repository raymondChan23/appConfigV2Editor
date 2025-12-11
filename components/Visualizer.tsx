import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ConfigData, AmountOptions } from '../types';

interface VisualizerProps {
    data: ConfigData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F'];

export const Visualizer: React.FC<VisualizerProps> = ({ data }) => {
    const chartData = useMemo(() => {
        if (!data.amountSetting) return [];
        
        return Object.entries(data.amountSetting).map(([key, value]) => {
            const opts = value as AmountOptions;
            return {
                name: key.toUpperCase(),
                maxTopUp: opts.maxTopUpAmount || 0,
                minTopUp: opts.minTopUpAmount || 0,
                maxFps: opts.maxFpsTopUpAmount || 0
            };
        });
    }, [data.amountSetting]);

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <p className="text-slate-400">No Amount Data to Visualize</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Payment Method Limits Overview
                </h3>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{fill: '#64748b'}} axisLine={{stroke: '#e2e8f0'}} />
                            <YAxis tick={{fill: '#64748b'}} axisLine={{stroke: '#e2e8f0'}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Legend />
                            <Bar dataKey="maxTopUp" name="Max Top Up" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="maxFps" name="Max FPS Limit" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Mini Chart for Options Distribution */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="text-md font-medium text-slate-700 mb-4">Top Up Options Count</h4>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.entries(data.amountSetting || {}).map(([k, v]) => {
                                const opts = v as AmountOptions;
                                return {
                                    name: k.toUpperCase(),
                                    count: opts.topUpOptions?.length || 0
                                };
                            })}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{fontSize: 12}} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" name="Options Count" fill="#10b981" radius={[4, 4, 0, 0]}>
                                    {Object.entries(data.amountSetting || {}).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
            </div>
        </div>
    );
};