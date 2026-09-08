import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Send,
  History,
  HelpCircle,
} from 'lucide-react';
import { GoogleSheetConfig } from '../types';
import {
  saveStoredSheetConfig,
  getLocalResults,
} from '../utils/googleSheetSync';

interface SettingsModalProps {
  config: GoogleSheetConfig;
  onSaveConfig: (cfg: GoogleSheetConfig) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  config,
  onSaveConfig,
  onClose,
}) => {
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sheet' | 'history'>('sheet');
  const [history] = useState(getLocalResults());

  const handleSave = () => {
    const updated: GoogleSheetConfig = {
      ...config,
      webhookUrl: webhookUrl.trim(),
    };
    saveStoredSheetConfig(updated);
    onSaveConfig(updated);
    onClose();
  };

  const handleTestPing = async () => {
    if (!webhookUrl.trim() || !webhookUrl.startsWith('http')) {
      setTestStatus('Please enter a valid HTTP/HTTPS Webhook URL first.');
      return;
    }

    setTestStatus('Sending test ping to Google Sheet...');
    try {
      await fetch(webhookUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: 'Test Student (Verification Ping)',
          score: 25,
          totalQuestions: 25,
          percentage: '100%',
          timeSpent: '1m 20s',
          timestamp: new Date().toISOString(),
          submissionReason: 'Verification Test Ping',
          fullscreenViolations: 0,
          tabSwitchViolations: 0,
          answersSummary: 'Test row to verify Google Apps Script spreadsheet connection.',
        }),
      });

      setTestStatus('Ping dispatched! Check your Google Sheet to verify the new row appeared.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setTestStatus(`Failed to send ping: ${message}`);
    }
  };

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Google Sheet Sync
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-settings-modal-btn"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('sheet')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'sheet'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Google Sheets Webhook
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Local Log</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
              {history.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          {activeTab === 'sheet' && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Important Step</span>
              </div>

              {/* Webhook Input */}
              <div className="space-y-2">
                <label
                  htmlFor="sheet-webhook-url-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Google Apps Script Web App URL
                </label>
                <div className="flex gap-2">
                  <input
                    id="sheet-webhook-url-input"
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                  <button
                    type="button"
                    onClick={handleTestPing}
                    id="test-ping-btn"
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Test Ping</span>
                  </button>
                </div>
                {testStatus && (
                  <p className="text-xs text-amber-400 bg-amber-950/30 border border-amber-900/50 p-2 rounded-lg">
                    {testStatus}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Local Test Submissions</h3>
                </div>
              </div>

              {history.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800/60">
                  <History className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <span>No previous submissions found in local browser storage yet.</span>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-white">{item.studentName}</p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(item.submittedAt).toLocaleString()} • {item.submissionReason}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-red-400 text-sm">
                          {item.score}/{item.totalQuestions}
                        </span>
                        <p className="text-[11px] text-slate-400">{item.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            id="save-settings-btn"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition shadow-md shadow-red-600/30 cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
