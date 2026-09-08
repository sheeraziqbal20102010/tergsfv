import React, { useEffect, useState, useRef, useTransition } from 'react';
import { Clock, CheckCircle2, ChevronRight, AlertCircle, ShieldAlert, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { sound } from '../utils/soundAlerts';

interface QuizScreenProps {
  studentName: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  timeRemaining: number;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onSubmit: (reason?: 'normal' | 'timer_expired') => void;
  fullscreenViolations: number;
  tabSwitchViolations: number;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  studentName,
  questions,
  currentQuestionIndex,
  answers,
  timeRemaining,
  onAnswer,
  onNext,
  onSubmit,
  fullscreenViolations,
  tabSwitchViolations,
}) => {
  const [, startTransition] = useTransition();
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Local state for fill in the blanks
  const [fillInput, setFillInput] = useState(answers[currentQuestion?.id] || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sync fill input whenever question changes
  useEffect(() => {
    setFillInput(answers[currentQuestion?.id] || '');
    if (currentQuestion?.type === 'fill' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion?.id, answers, currentQuestion?.type]);

  // Format mm:ss
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isUrgent = timeRemaining <= 60;

  // Check how many questions answered
  const answeredCount = questions.filter((q) => Boolean(answers[q.id]?.trim())).length;
  const allAnswered = answeredCount === totalQuestions;
  const currentAnswered = Boolean(answers[currentQuestion?.id]?.trim());

  const handleSelectOption = (option: string) => {
    sound.playTick();
    startTransition(() => {
      onAnswer(currentQuestion.id, option);
    });
  };

  const handleFillChange = (val: string) => {
    setFillInput(val);
    startTransition(() => {
      onAnswer(currentQuestion.id, val);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isLastQuestion && currentAnswered) {
        onNext();
      } else if (isLastQuestion && allAnswered) {
        onSubmit('normal');
      }
    }
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div
      id="quiz-screen-container"
      className="relative z-10 w-full max-w-3xl mx-auto h-[92vh] max-h-[860px] flex flex-col justify-between select-none px-4 py-2"
    >
      {/* Top Fixed Control Bar: Timer + Progress + Security Info */}
      <div className="w-full shrink-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-3 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          {/* Student details & current progress count */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-sm">
              {currentQuestionIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                  {currentQuestion?.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                {studentName}
              </h3>
            </div>
          </div>

          {/* Right Side: Security Pills + Prominent Countdown Timer */}
          <div className="flex items-center gap-3">
            {/* Violations Pill (if any) */}
            {(fullscreenViolations > 0 || tabSwitchViolations > 0) && (
              <div
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-medium"
                title={`Security flags: ${fullscreenViolations} fullscreen exits, ${tabSwitchViolations} tab switches`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>
                  Strikes: {fullscreenViolations + tabSwitchViolations}/3
                </span>
              </div>
            )}

            {/* Countdown Timer with animation & turning red on last 60 seconds */}
            <div
              id="quiz-countdown-timer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                isUrgent
                  ? 'bg-red-950/90 border-red-500 text-red-400 animate-pulse shadow-lg shadow-red-500/20'
                  : 'bg-slate-950/80 border-slate-700/80 text-white'
              }`}
            >
              <Clock
                className={`w-4 h-4 ${isUrgent ? 'text-red-400 animate-spin' : 'text-slate-400'}`}
              />
              <span className="font-mono font-bold text-base sm:text-lg tracking-wider">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-slate-700/50 relative">
            <div
              id="quiz-progress-bar-fill"
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
            <span>
              Progress: {answeredCount}/{totalQuestions} Answered
            </span>
            <span className="font-mono text-slate-300">
              {progressPercentage}% Completed
            </span>
          </div>
        </div>
      </div>

      {/* Main Question Card with Smooth Transition Animation */}
      <div className="flex-1 flex flex-col justify-center min-h-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id || currentQuestionIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            id={`question-card-${currentQuestionIndex + 1}`}
            className="w-full h-full max-h-[560px] flex flex-col justify-between bg-slate-900/75 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto"
          >
            <div>
              {/* Question Type */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                  {currentQuestion?.type === 'mcq'
                    ? 'Multiple Choice (MCQ)'
                    : currentQuestion?.type === 'tf'
                    ? 'True or False'
                    : 'Fill in the Blank'}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
                {currentQuestion?.prompt}
              </h2>

              {/* MCQ Options (4 Shuffled Options) */}
              {currentQuestion?.type === 'mcq' && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options?.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === option;
                    const optionLetter = String.fromCharCode(65 + idx);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(option)}
                        id={`option-${currentQuestion.id}-${idx}`}
                        className={`w-full flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-red-500/15 border-red-500 text-white ring-2 ring-red-500/30'
                            : 'bg-slate-950/50 hover:bg-slate-800/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-colors ${
                            isSelected
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {optionLetter}
                        </div>
                        <span className="text-sm sm:text-base font-medium flex-1">
                          {option}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True/False Buttons */}
              {currentQuestion?.type === 'tf' && (
                <div className="grid grid-cols-2 gap-4 my-4">
                  {['True', 'False'].map((tfValue) => {
                    const isSelected = answers[currentQuestion.id] === tfValue;
                    return (
                      <button
                        key={tfValue}
                        type="button"
                        onClick={() => handleSelectOption(tfValue)}
                        id={`tf-btn-${tfValue.toLowerCase()}`}
                        className={`py-8 px-6 rounded-2xl border font-bold text-lg sm:text-xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-red-500/20 border-red-500 text-white shadow-lg shadow-red-500/20 ring-2 ring-red-500/40'
                            : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span>{tfValue}</span>
                        <span className="text-xs font-normal text-slate-400">
                          {tfValue === 'True' ? 'Statement is accurate' : 'Statement is inaccurate'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Fill in the Blank Input */}
              {currentQuestion?.type === 'fill' && (
                <div className="space-y-3 my-4">
                  <label
                    htmlFor="fill-blank-input"
                    className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    Type your answer below:
                  </label>
                  <input
                    ref={inputRef}
                    id="fill-blank-input"
                    type="text"
                    value={fillInput}
                    onChange={(e) => handleFillChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your answer here..."
                    autoFocus
                    className="w-full px-5 py-4 bg-slate-950/80 border-2 border-slate-700/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 rounded-xl text-white placeholder:text-slate-500 text-base sm:text-lg font-medium outline-none transition"
                  />
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                    Checking is case-insensitive. Spaces and standard aliases are normalized automatically.
                  </p>
                </div>
              )}
            </div>

            {/* Linear Navigation Bar (Only NEXT; or SUBMIT on last question when all completed) */}
            <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                {isLastQuestion ? (
                  allAnswered ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      All {totalQuestions} questions answered. Ready to submit!
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Answer all {totalQuestions} questions before final submission ({answeredCount}/{totalQuestions}).
                    </span>
                  )
                ) : (
                  <span>Linear test mode: No going back.</span>
                )}
              </div>

              {!isLastQuestion ? (
                <button
                  type="button"
                  onClick={onNext}
                  id="quiz-next-question-btn"
                  disabled={!currentAnswered}
                  className={`py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition duration-200 cursor-pointer ${
                    currentAnswered
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSubmit('normal')}
                  id="quiz-submit-btn"
                  disabled={!allAnswered}
                  className={`py-3.5 px-8 rounded-xl font-extrabold text-base uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    allAnswered
                      ? 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-600/50 hover:scale-[1.02]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT TEST</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
