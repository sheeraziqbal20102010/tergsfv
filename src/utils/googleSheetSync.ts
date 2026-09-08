import { QuizResult, GoogleSheetConfig } from '../types';

const STORAGE_KEY_CONFIG = 'secure_quiz_sheet_config';
const STORAGE_KEY_RESULTS = 'secure_quiz_results_history';

export function getStoredSheetConfig(): GoogleSheetConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading sheet config', e);
  }
  return {
    webhookUrl: '',
    enabled: true,
    autoSync: true
  };
}

export function saveStoredSheetConfig(config: GoogleSheetConfig) {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving sheet config', e);
  }
}

export function saveResultLocally(result: QuizResult): QuizResult[] {
  try {
    const existing = getLocalResults();
    const updated = [result, ...existing];
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated.slice(0, 50))); // retain up to 50
    return updated;
  } catch (e) {
    console.error('Error saving result locally', e);
    return [result];
  }
}

export function getLocalResults(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESULTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local results', e);
  }
  return [];
}

/**
 * Dispatches test response to Google Sheets via Web App Webhook (no student login needed)
 */
export async function syncResultToGoogleSheet(result: QuizResult): Promise<{ success: boolean; message: string }> {
  const config = getStoredSheetConfig();
  
  // Also always store locally as a safety net
  saveResultLocally(result);

  if (!config.webhookUrl || !config.webhookUrl.trim().startsWith('http')) {
    return {
      success: false,
      message: 'No Google Sheet webhook URL configured. Result saved securely in local browser history.'
    };
  }

  const payload = {
    studentName: result.studentName,
    score: result.score,
    totalQuestions: result.totalQuestions,
    percentage: `${result.percentage.toFixed(1)}%`,
    timeSpent: `${Math.floor(result.timeSpentSeconds / 60)}m ${result.timeSpentSeconds % 60}s`,
    timestamp: result.submittedAt,
    submissionReason: result.submissionReason,
    fullscreenViolations: result.fullscreenViolations,
    tabSwitchViolations: result.tabSwitchViolations,
    answersSummary: result.answers.map(a => `[${a.type.toUpperCase()}] Q: ${a.questionPrompt.substring(0, 45)}... | Ans: ${a.studentAnswer || '(unanswered)'} | Status: ${a.isCorrect ? 'CORRECT' : 'WRONG'}`).join('\n'),
    answersJson: JSON.stringify(result.answers)
  };

  try {
    // Sending via fetch with no-cors / text to avoid preflight CORS blockage in browser
    await fetch(config.webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: 'Submitted successfully to Google Sheet!'
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown network issue';
    console.error('Failed to sync with Google Sheet:', err);
    return {
      success: false,
      message: `Failed to connect to Google Sheet webhook: ${message}. Saved locally.`
    };
  }
}

/**
 * Sample Google Apps Script code that the teacher can copy/paste in Google Sheets
 */
export const SAMPLE_APPS_SCRIPT = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Student Name",
        "Score",
        "Percentage",
        "Time Spent",
        "Submission Mode",
        "Fullscreen Exits",
        "Tab Switches",
        "Detailed Answers Log"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#e2e8f0");
    }

    var contents = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      contents.timestamp || new Date().toISOString(),
      contents.studentName || "Anonymous",
      (contents.score !== undefined ? contents.score + " / " + contents.totalQuestions : "N/A"),
      contents.percentage || "N/A",
      contents.timeSpent || "N/A",
      contents.submissionReason || "normal",
      contents.fullscreenViolations || 0,
      contents.tabSwitchViolations || 0,
      contents.answersSummary || contents.answersJson || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
