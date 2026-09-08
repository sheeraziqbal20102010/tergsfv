import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Clock,
  ShieldCheck,
  ShieldAlert,
  FileSpreadsheet,
  Award,
} from 'lucide-react';
import { QuizResult, GoogleSheetConfig } from '../types';
import { sound } from '../utils/soundAlerts';

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
  sheetConfig: GoogleSheetConfig;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestart,
  sheetConfig,
}) => {
  // Trigger celebration sounds and confetti fireworks
  useEffect(() => {
    sound.playCelebration();

    // Trigger multi-stage confetti
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#ef4444', '#f59e0b', '#10b981', '#6366f1'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#ef4444', '#f59e0b', '#10b981', '#6366f1'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const isPassed = result.percentage >= 60;
  const timeFormatted = `${Math.floor(result.timeSpentSeconds / 60)}m ${result.timeSpentSeconds % 60}s`;
  const totalStrikes = (result.fullscreenViolations || 0) + (result.tabSwitchViolations || 0);

  return (
    <div
      id="quiz-result-screen"
      className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[90vh]"
    >
      {/* Centered Results Card */}
      <div className="w-full bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 text-center relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <Award className="w-4 h-4" />
          <span>Assessment Completed</span>
        </div>

        {/* Student Name */}
        <h1
          id="result-student-name"
          className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2"
        >
          {result.studentName}
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          CL-1000 Introduction to ICT • Quiz Conducted by Sheeraz Iqbal
        </p>

        {/* Big Score Board */}
        <div
          id="result-score-card"
          className={`max-w-md mx-auto p-6 rounded-2xl border mb-6 relative ${
            isPassed
              ? 'bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500/40 shadow-xl shadow-emerald-950/50'
              : 'bg-gradient-to-b from-rose-950/40 to-slate-900 border-rose-500/40 shadow-xl shadow-rose-950/50'
          }`}
        >
          <div className="text-xs uppercase tracking-widest font-semibold text-slate-400 mb-1">
            Official Score
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span
              id="result-numeric-score"
              className="font-mono font-black text-5xl sm:text-6xl text-white tracking-tight"
            >
              {result.score}
            </span>
            <span className="font-mono text-2xl sm:text-3xl text-slate-400 font-semibold">
              / {result.totalQuestions}
            </span>
          </div>
          <div
            id="result-percentage-display"
            className={`mt-2 font-mono text-xl font-bold ${
              isPassed ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {result.percentage.toFixed(1)}% • {isPassed ? 'Passed' : 'Needs Improvement'}
          </div>
        </div>

        {/* Dedicated Strike Notice if any strikes were recorded */}
        {totalStrikes > 0 && (
          <div
            id="result-strikes-banner"
            className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between max-w-xl mx-auto shadow-lg shadow-rose-950/40"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">
                  {totalStrikes} Strike{totalStrikes > 1 ? 's' : ''} Recorded During Exam
                </p>
                <p className="text-[11px] text-rose-300/80 mt-0.5">
                  {[
                    result.tabSwitchViolations > 0
                      ? `${result.tabSwitchViolations} Tab Switch${result.tabSwitchViolations > 1 ? 'es' : ''}`
                      : null,
                    result.fullscreenViolations > 0
                      ? `${result.fullscreenViolations} Fullscreen Exit${result.fullscreenViolations > 1 ? 's' : ''}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(' • ')}
                </p>
              </div>
            </div>
            <span className="font-mono font-bold px-3 py-1.5 rounded-xl bg-rose-900/80 border border-rose-600 text-rose-100 text-xs shrink-0 shadow-inner">
              {totalStrikes} / 3 Strikes
            </span>
          </div>
        )}

        {/* Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-w-xl mx-auto text-xs text-left">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Time Taken</span>
            </div>
            <p className="font-bold text-white text-sm">{timeFormatted}</p>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              totalStrikes > 0
                ? 'bg-rose-950/30 border-rose-800/60'
                : 'bg-slate-950/50 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <ShieldAlert
                className={`w-3.5 h-3.5 ${
                  totalStrikes > 0 ? 'text-rose-400' : 'text-slate-400'
                }`}
              />
              <span className={totalStrikes > 0 ? 'text-rose-300' : ''}>Strikes</span>
            </div>
            <p
              className={`font-bold text-sm ${
                totalStrikes > 0 ? 'text-rose-400 font-mono' : 'text-emerald-400'
              }`}
            >
              {totalStrikes > 0 ? `${totalStrikes} / 3 Strikes` : '0 Strikes (Clean)'}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Finish Mode</span>
            </div>
            <p className="font-bold text-white text-sm capitalize">
              {result.submissionReason.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Google Sheet Sync Notice */}
        <div className="mb-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs max-w-lg mx-auto">
          <div className="flex items-center gap-2 text-left">
            <FileSpreadsheet
              className={`w-4 h-4 shrink-0 ${
                sheetConfig.webhookUrl ? 'text-emerald-400' : 'text-slate-500'
              }`}
            />
            <div>
              <p className="font-medium text-white">
                {sheetConfig.webhookUrl
                  ? 'Response logged to Google Sheet'
                  : 'Saved to local browser storage'}
              </p>
              <p className="text-[10px] text-slate-400">
                {sheetConfig.webhookUrl
                  ? 'Your instructor received your score and full answer log.'
                  : 'Configure Webhook URL in settings to stream directly to Google Sheets.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            id="restart-quiz-btn"
            className="py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart With New Questions</span>
          </button>
        </div>

        {/* Thank You Note */}
        <p className="mt-8 text-xs text-slate-500">
          Thank you for completing the assessment honestly. Results are verified and logged.
        </p>
      </div>
    </div>
  );
};
