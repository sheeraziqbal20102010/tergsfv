import React, { useState } from 'react';
import { ShieldCheck, Settings, Award, Clock, AlertTriangle, Play, FileSpreadsheet, Eye } from 'lucide-react';
import { GoogleSheetConfig } from '../types';

interface LandingPageProps {
  onStart: (name: string) => void;
  onOpenSettings: () => void;
  sheetConfig: GoogleSheetConfig;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onOpenSettings,
  sheetConfig,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setError('Please enter your full name (at least 3 characters).');
      return;
    }
    setError('');
    onStart(trimmed);
  };

  const isButtonDisabled = name.trim().length < 3;

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[90vh]">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 shadow-lg shadow-red-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">Proctored Assessment</span>
            <h2 className="text-sm font-medium text-slate-300">ICT Secure Test System</h2>
          </div>
        </div>

        {/* Google Sheet Sync Indicator / Settings Button */}
        <button
          onClick={onOpenSettings}
          id="open-settings-btn"
          title="Google Sheets & Anti-Cheat Settings"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-slate-300 text-xs transition duration-200 shadow-sm cursor-pointer"
        >
          <FileSpreadsheet className={`w-3.5 h-3.5 ${sheetConfig.webhookUrl ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>{sheetConfig.webhookUrl ? 'Sheet Synced' : 'Sheet Config'}</span>
          <Settings className="w-3.5 h-3.5 text-slate-400 hover:text-white transition" />
        </button>
      </div>

      {/* Main Glassmorphism Card */}
      <div
        id="landing-card"
        className="w-full relative rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl shadow-black/80 transition-all duration-300"
      >
        {/* Subtle decorative glowing corner accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/30 text-red-400 text-xs font-medium mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>Anti-Cheating Environment Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ICT <span className="text-red-500">Quiz 1</span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            Quiz Created and Conducted by: Sheeraz Iqbal
          </p>
        </div>

        {/* Test Rules Overview Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8 text-xs text-slate-300">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Award className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">25 Questions</p>
              <p className="text-[11px] text-slate-400">10 MCQ • 10 T/F • 5 Fill</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">25 Minutes</p>
              <p className="text-[11px] text-slate-400">Auto-submit at 0:00</p>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Strict Proctor</p>
              <p className="text-[11px] text-slate-400">3 strikes max</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleStart} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="student-full-name"
              className="block text-sm font-semibold text-slate-200 tracking-wide"
            >
              Enter Your Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                id="student-full-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="26K-1234 Name Email@sample.com"
                className="w-full px-4 py-3.5 bg-slate-950/70 border border-slate-700/70 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 rounded-xl text-white placeholder:text-slate-500 text-base transition duration-200 outline-none"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
            <p className="text-[11px] text-slate-400">
              Your name and submission record will be logged directly to the instructor's sheet.
            </p>
          </div>

          {/* Big Prominent RED START TEST Button */}
          <button
            type="submit"
            id="start-test-btn"
            disabled={isButtonDisabled}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all duration-200 cursor-pointer ${
              isButtonDisabled
                ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
                : 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START TEST</span>
          </button>
        </form>

        {/* Anti-cheat disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center space-y-1.5 text-xs text-slate-400">
          <p className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Entering fullscreen mode is mandatory upon starting.
          </p>
          <p className="text-[11px] text-slate-500">
            Copying, pasting, tab-switching, and going back are monitored and restricted.
          </p>
        </div>
      </div>
    </div>
  );
};
