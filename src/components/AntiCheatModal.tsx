import React from 'react';
import { AlertOctagon, Maximize, ExternalLink, ShieldAlert } from 'lucide-react';

interface AntiCheatModalProps {
  type: 'fullscreen' | 'tab_switch' | 'final_strike';
  violationCount: number;
  maxViolations: number;
  onDismiss: () => void;
}

export const AntiCheatModal: React.FC<AntiCheatModalProps> = ({
  type,
  violationCount,
  maxViolations,
  onDismiss,
}) => {
  const isFinal = violationCount >= maxViolations || type === 'final_strike';

  return (
    <div
      id="anti-cheat-warning-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-slate-900 border-2 border-red-500/80 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-red-950/80 text-center relative overflow-hidden">
        {/* Glow halo */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-600/30 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mx-auto mb-4 text-red-500 animate-bounce">
          {type === 'fullscreen' ? (
            <Maximize className="w-8 h-8" />
          ) : (
            <AlertOctagon className="w-8 h-8" />
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 border border-red-700/60 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Security Violation Detected</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          {type === 'fullscreen'
            ? 'Fullscreen Mode Exited!'
            : 'Tab / Window Switch Detected!'}
        </h2>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          {isFinal ? (
            <span className="text-red-400 font-semibold">
              Maximum violation limit reached ({violationCount}/{maxViolations}). The test is being automatically submitted now.
            </span>
          ) : type === 'fullscreen' ? (
            <>
              You have exited full-screen mode. This assessment requires full-screen mode to ensure academic integrity.
            </>
          ) : (
            <>
              Navigating away from the test window or switching tabs is strictly monitored and flagged.
            </>
          )}
        </p>

        {/* Strike indicator badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: maxViolations }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full transition-colors ${
                idx < violationCount
                  ? 'bg-red-500 shadow-sm shadow-red-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="bg-slate-950/80 rounded-xl p-3 mb-6 border border-slate-800 text-xs flex items-center justify-between text-slate-400">
          <span>Violation Strike:</span>
          <span className="font-bold text-red-400 font-mono text-sm">
            {violationCount} of {maxViolations} Warnings
          </span>
        </div>

        {!isFinal ? (
          <button
            onClick={onDismiss}
            id="dismiss-violation-btn"
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {type === 'fullscreen' ? (
              <>
                <Maximize className="w-4 h-4" />
                <span>Re-Enter Fullscreen & Resume</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>I Understand & Resume Test</span>
              </>
            )}
          </button>
        ) : (
          <div className="text-xs text-red-400 animate-pulse font-medium">
            Submitting results to evaluator...
          </div>
        )}
      </div>
    </div>
  );
};
