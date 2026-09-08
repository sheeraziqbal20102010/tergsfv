import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { LandingPage } from './components/LandingPage';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { AntiCheatModal } from './components/AntiCheatModal';
import { SettingsModal } from './components/SettingsModal';
import {
  Question,
  QuizResult,
  GoogleSheetConfig,
  SubmissionReason,
  StudentAnswer,
} from './types';
import {
  generateTestQuestions,
  verifyAnswer,
} from './data/questionBank';
import {
  getStoredSheetConfig,
  syncResultToGoogleSheet,
} from './utils/googleSheetSync';
import { sound } from './utils/soundAlerts';

const QUIZ_DURATION_SECONDS = 25 * 60; // 25 minutes = 1500s
const MAX_VIOLATIONS = 3;

export default function App() {
  const [status, setStatus] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [studentName, setStudentName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION_SECONDS);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Anti-Cheat State
  const [fullscreenViolations, setFullscreenViolations] = useState(0);
  const [tabSwitchViolations, setTabSwitchViolations] = useState(0);
  const [activeViolationModal, setActiveViolationModal] = useState<'fullscreen' | 'tab_switch' | null>(null);

  // Settings & Sync State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sheetConfig, setSheetConfig] = useState<GoogleSheetConfig>(getStoredSheetConfig());

  // Refs for timer and anti-cheat tracking
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isSubmittingRef = useRef<boolean>(false);
  const testScreenRef = useRef<HTMLDivElement | null>(null);

  // Enter Fullscreen safely (handles iframes gracefully)
  const enterFullscreen = useCallback(async () => {
    try {
      const el = document.documentElement;
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
          await (el as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
      }
    } catch {
      // Browsers or iframes might require direct user gesture or permissions
      console.log('Fullscreen request handled.');
    }
  }, []);

  // Exit Fullscreen helper
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
  }, []);

  // Final Submit Handler
  const handleSubmit = useCallback(
    async (reason: SubmissionReason = 'normal') => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;

      // Clear countdown timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Compute score & detailed student answers
      let score = 0;
      const studentAnswersList: StudentAnswer[] = questions.map((q) => {
        const studentAns = answers[q.id] || '';
        const isCorrect = verifyAnswer(q, studentAns);
        if (isCorrect) score++;

        return {
          questionId: q.id,
          studentAnswer: studentAns,
          isCorrect,
          correctAnswer: q.correctAnswer,
          questionPrompt: q.prompt,
          type: q.type,
        };
      });

      const totalQuestions = questions.length;
      const percentage = (score / totalQuestions) * 100;
      const timeSpent = startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 1000)
        : QUIZ_DURATION_SECONDS - timeRemaining;

      const finalResult: QuizResult = {
        id: `result-${Date.now()}`,
        studentName: studentName.trim(),
        score,
        totalQuestions,
        percentage,
        timeSpentSeconds: Math.min(timeSpent, QUIZ_DURATION_SECONDS),
        submittedAt: new Date().toLocaleString(),
        submissionReason: reason,
        fullscreenViolations,
        tabSwitchViolations,
        answers: studentAnswersList,
      };

      setResult(finalResult);
      setActiveViolationModal(null);
      setStatus('result');

      // Exit fullscreen mode on completion
      await exitFullscreen();

      // Post results to Google Sheets automatically
      await syncResultToGoogleSheet(finalResult);
    },
    [questions, answers, studentName, timeRemaining, fullscreenViolations, tabSwitchViolations, exitFullscreen]
  );

  // START TEST: Initializes new 15-question random set, resets counters, enters fullscreen
  const handleStartTest = async (name: string) => {
    setStudentName(name);
    const freshQuestions = generateTestQuestions();
    setQuestions(freshQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(QUIZ_DURATION_SECONDS);
    setFullscreenViolations(0);
    setTabSwitchViolations(0);
    setActiveViolationModal(null);
    isSubmittingRef.current = false;
    startTimeRef.current = Date.now();

    // Push state into browser history to prevent Back button cheating
    window.history.pushState({ testActive: true }, '', window.location.href);

    setStatus('quiz');

    // Trigger Fullscreen
    await enterFullscreen();
  };

  // RESTART TEST: Generates completely new randomized test questions
  const handleRestart = () => {
    const freshQuestions = generateTestQuestions();
    setQuestions(freshQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(QUIZ_DURATION_SECONDS);
    setFullscreenViolations(0);
    setTabSwitchViolations(0);
    setActiveViolationModal(null);
    setResult(null);
    isSubmittingRef.current = false;
    setStatus('landing');
  };

  // Answer a question
  const handleAnswerQuestion = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Next question (Linear only)
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Timer Tick Hook
  useEffect(() => {
    if (status !== 'quiz') return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          sound.playWarningBeep();
          handleSubmit('timer_expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, handleSubmit]);

  // Anti-Cheating Listeners: Fullscreen, Tab/Window Switching, Right-Click, Copy/Paste, History
  useEffect(() => {
    if (status !== 'quiz') return;

    // 1. Fullscreen change listener
    const handleFullscreenChange = () => {
      if (isSubmittingRef.current) return;
      const isCurrentlyFullscreen = Boolean(
        document.fullscreenElement ||
          (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement
      );

      if (!isCurrentlyFullscreen) {
        sound.playWarningBeep();
        setFullscreenViolations((prev) => {
          const updated = prev + 1;
          if (updated >= MAX_VIOLATIONS) {
            handleSubmit('fullscreen_limit');
          } else {
            setActiveViolationModal('fullscreen');
          }
          return updated;
        });
      }
    };

    // 2. Tab / Window visibility change listener
    const handleVisibilityChange = () => {
      if (isSubmittingRef.current) return;
      if (document.visibilityState === 'hidden') {
        sound.playWarningBeep();
        setTabSwitchViolations((prev) => {
          const updated = prev + 1;
          if (updated >= MAX_VIOLATIONS) {
            handleSubmit('tab_switch_limit');
          } else {
            setActiveViolationModal('tab_switch');
          }
          return updated;
        });
      }
    };

    // Window blur listener
    const handleWindowBlur = () => {
      if (isSubmittingRef.current) return;
      // Triggers tab switch check
      if (document.visibilityState === 'hidden') {
        // already caught by visibilitychange
      }
    };

    // 3. Block Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      sound.playWarningBeep();
    };

    // 4. Block Copy, Cut, Paste
    const handleCopyCutPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      sound.playWarningBeep();
    };

    // 5. Block Keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+U, F12, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && ['c', 'v', 'x', 'u', 'a', 'p'].includes(e.key.toLowerCase())) ||
        (e.metaKey && ['c', 'v', 'x', 'u', 'a', 'p'].includes(e.key.toLowerCase())) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        sound.playWarningBeep();
      }
    };

    // 6. Prevent browser back navigation
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      sound.playWarningBeep();
      window.history.pushState({ testActive: true }, '', window.location.href);
      alert('Navigation back is disabled during the proctored test.');
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCutPaste);
    document.addEventListener('cut', handleCopyCutPaste);
    document.addEventListener('paste', handleCopyCutPaste);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCutPaste);
      document.removeEventListener('cut', handleCopyCutPaste);
      document.removeEventListener('paste', handleCopyCutPaste);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [status, handleSubmit]);

  const handleDismissViolationModal = async () => {
    if (activeViolationModal === 'fullscreen') {
      await enterFullscreen();
    }
    setActiveViolationModal(null);
  };

  return (
    <div
      ref={testScreenRef}
      className={`min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden font-sans ${
        status === 'quiz' ? 'select-none overflow-hidden h-screen' : ''
      }`}
    >
      {/* Dynamic Animated Particle Canvas Background */}
      <ParticleBackground />

      {/* Primary Views */}
      {status === 'landing' && (
        <LandingPage
          onStart={handleStartTest}
          onOpenSettings={() => setIsSettingsOpen(true)}
          sheetConfig={sheetConfig}
        />
      )}

      {status === 'quiz' && questions.length > 0 && (
        <QuizScreen
          studentName={studentName}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          timeRemaining={timeRemaining}
          onAnswer={handleAnswerQuestion}
          onNext={handleNextQuestion}
          onSubmit={handleSubmit}
          fullscreenViolations={fullscreenViolations}
          tabSwitchViolations={tabSwitchViolations}
        />
      )}

      {status === 'result' && result && (
        <ResultScreen
          result={result}
          onRestart={handleRestart}
          sheetConfig={sheetConfig}
        />
      )}

      {/* Anti-Cheat Warning Modal (Exited Fullscreen / Switched Tab) */}
      {activeViolationModal && (
        <AntiCheatModal
          type={activeViolationModal}
          violationCount={
            activeViolationModal === 'fullscreen'
              ? fullscreenViolations
              : tabSwitchViolations
          }
          maxViolations={MAX_VIOLATIONS}
          onDismiss={handleDismissViolationModal}
        />
      )}

      {/* Settings & Google Sheet Setup Modal */}
      {isSettingsOpen && (
        <SettingsModal
          config={sheetConfig}
          onSaveConfig={(updated) => setSheetConfig(updated)}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
