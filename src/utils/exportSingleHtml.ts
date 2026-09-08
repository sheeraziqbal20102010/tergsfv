import { MCQ_POOL, TF_POOL, FILL_POOL } from '../data/questionBank';

/**
 * Generates an entirely self-contained, single-file HTML document
 * containing embedded CSS, JavaScript, questions, anti-cheat,
 * sound synthesizer, confetti, and Google Sheets webhook integration.
 */
export function generateSingleFileHtml(webhookUrl: string = ''): string {
  const bankData = JSON.stringify({
    mcq: MCQ_POOL,
    tf: TF_POOL,
    fill: FILL_POOL
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Secure Anti-Cheating Online Test</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #020617;
      color: #f8fafc;
      min-height: 100vh;
      overflow-x: hidden;
      user-select: none;
      -webkit-user-select: none;
    }
    .particles-canvas {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    .app-wrap {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .glass-card {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.25rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      width: 100%;
      max-width: 680px;
      padding: 2.5rem;
    }
    .input-field {
      width: 100%;
      background: rgba(2, 6, 23, 0.8);
      border: 1.5px solid rgba(148, 163, 184, 0.3);
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      color: #fff;
      font-size: 1.1rem;
      outline: none;
      transition: all 0.2s;
    }
    .input-field:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
    .btn-red {
      width: 100%;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #fff;
      font-weight: 700;
      font-size: 1.125rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.4);
      transition: all 0.2s;
      margin-top: 1.25rem;
    }
    .btn-red:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px -5px rgba(239, 68, 68, 0.6);
    }
    .btn-red:disabled {
      background: #334155;
      color: #94a3b8;
      cursor: not-allowed;
      box-shadow: none;
    }
    .timer-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.15rem;
      font-weight: 700;
      padding: 0.4rem 0.85rem;
      border-radius: 0.5rem;
      background: rgba(2, 6, 23, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .timer-badge.urgent {
      background: rgba(220, 38, 38, 0.25);
      border-color: #ef4444;
      color: #f87171;
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.85; transform: scale(1.03); }
    }
    .option-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(2, 6, 23, 0.6);
      border: 1.5px solid rgba(255, 255, 255, 0.08);
      border-radius: 0.75rem;
      cursor: pointer;
      margin-bottom: 0.75rem;
      transition: all 0.15s;
    }
    .option-card:hover {
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(239, 68, 68, 0.4);
    }
    .option-card.selected {
      background: rgba(220, 38, 38, 0.15);
      border-color: #ef4444;
      outline: 2px solid rgba(239, 68, 68, 0.3);
    }
    .tf-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .tf-btn {
      padding: 1.75rem;
      font-size: 1.35rem;
      font-weight: 700;
      border-radius: 0.75rem;
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      background: rgba(2, 6, 23, 0.6);
      color: #fff;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tf-btn:hover {
      border-color: rgba(239, 68, 68, 0.4);
      background: rgba(30, 41, 59, 0.8);
    }
    .tf-btn.selected {
      border-color: #ef4444;
      background: rgba(220, 38, 38, 0.25);
    }
    .progress-bar-bg {
      width: 100%;
      height: 8px;
      background: rgba(30, 41, 59, 0.8);
      border-radius: 9999px;
      overflow: hidden;
      margin: 0.75rem 0;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #ef4444, #f43f5e);
      transition: width 0.3s ease;
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .modal-card {
      background: #0f172a;
      border: 2px solid #ef4444;
      border-radius: 1.25rem;
      padding: 2rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.3);
    }
  </style>
</head>
<body>
  <canvas id="particles" class="particles-canvas"></canvas>
  <div id="app" class="app-wrap"></div>

  <script>
    const BANK = ${bankData};
    let GOOGLE_SHEET_URL = "${webhookUrl}";

    // Audio synthesizer
    const playBeep = () => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch(e) {}
    };

    // Canvas particles
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    window.onresize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    const particles = Array.from({length: 45}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 - 0.1,
      r: Math.random() * 2 + 1, a: Math.random() * 0.4 + 0.2
    }));
    function anim() {
      ctx.clearRect(0,0,width,height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, ' + p.a + ')';
        ctx.fill();
      });
      requestAnimationFrame(anim);
    }
    anim();

    // State
    let studentName = '';
    let questions = [];
    let currentIndex = 0;
    let answers = {};
    let timeRemaining = 1500; // 25 minutes
    let timerId = null;
    let violations = 0;
    let isSubmitting = false;

    function shuffle(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function generate25Questions() {
      const easyMCQs = shuffle(BANK.mcq.filter(q => q.difficulty === 'easy')).slice(0, 5);
      const medMCQs = shuffle(BANK.mcq.filter(q => q.difficulty === 'medium')).slice(0, 3);
      const hardMCQs = shuffle(BANK.mcq.filter(q => q.difficulty === 'hard')).slice(0, 2);
      const mcqs = [...easyMCQs, ...medMCQs, ...hardMCQs].map(q => ({ ...q, options: shuffle(q.options || []) }));

      const easyTFs = shuffle(BANK.tf.filter(q => q.difficulty === 'easy')).slice(0, 5);
      const medTFs = shuffle(BANK.tf.filter(q => q.difficulty === 'medium')).slice(0, 3);
      const hardTFs = shuffle(BANK.tf.filter(q => q.difficulty === 'hard')).slice(0, 2);
      const tfs = [...easyTFs, ...medTFs, ...hardTFs];

      const easyFills = shuffle(BANK.fill.filter(q => q.difficulty === 'easy')).slice(0, 2);
      const medFills = shuffle(BANK.fill.filter(q => q.difficulty === 'medium')).slice(0, 2);
      const hardFills = shuffle(BANK.fill.filter(q => q.difficulty === 'hard')).slice(0, 1);
      const fills = [...easyFills, ...medFills, ...hardFills];

      return shuffle([...mcqs, ...tfs, ...fills]);
    }

    const app = document.getElementById('app');

    function renderLanding() {
      app.innerHTML = \`
        <div class="glass-card">
          <div style="text-align:center; margin-bottom: 2rem;">
            <span style="font-size:0.75rem; color:#ef4444; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; background:rgba(239,68,68,0.1); padding:0.25rem 0.75rem; border-radius:9999px; border:1px solid rgba(239,68,68,0.3);">Proctored Examination</span>
            <h1 style="font-size: 2rem; font-weight: 800; margin-top: 0.75rem;">ICT Quiz 1</h1>
            <p style="color:#94a3b8; font-size: 0.875rem; margin-top: 0.25rem;">Quiz Created and Conducted by: Sheeraz Iqbal • 25 Questions (10 MCQ, 10 T/F, 5 Fill) • 25-Minute Countdown</p>
          </div>
          <div style="margin-bottom:1.5rem;">
            <label style="font-size:0.875rem; font-weight:600; display:block; margin-bottom:0.5rem;">Enter Your Full Name *</label>
            <input id="nameInput" type="text" placeholder="26K-1234 Name Email@sample.com" class="input-field" />
          </div>
          <button id="startBtn" class="btn-red" disabled>START TEST</button>
        </div>
      \`;

      const input = document.getElementById('nameInput');
      const startBtn = document.getElementById('startBtn');
      input.addEventListener('input', (e) => {
        startBtn.disabled = e.target.value.trim().length < 3;
      });
      startBtn.addEventListener('click', () => {
        studentName = input.value.trim();
        startTest();
      });
    }

    function startTest() {
      questions = generate25Questions();
      currentIndex = 0;
      answers = {};
      timeRemaining = 1500;
      violations = 0;
      isSubmitting = false;

      try {
        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
      } catch(e) {}

      setupAntiCheat();
      startTimer();
      renderQuestion();
    }

    function startTimer() {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
          clearInterval(timerId);
          submitTest('Timer Expired');
        } else {
          updateTimerDisplay();
        }
      }, 1000);
    }

    function updateTimerDisplay() {
      const el = document.getElementById('timerDisplay');
      if (!el) return;
      const m = Math.floor(timeRemaining / 60);
      const s = timeRemaining % 60;
      el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      if (timeRemaining <= 60) el.classList.add('urgent');
    }

    function setupAntiCheat() {
      document.oncontextmenu = (e) => { e.preventDefault(); playBeep(); };
      document.oncopy = (e) => { e.preventDefault(); playBeep(); };
      document.onpaste = (e) => { e.preventDefault(); playBeep(); };
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && !isSubmitting) {
          handleViolation('Tab Switch Detected');
        }
      });
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && !isSubmitting) {
          handleViolation('Fullscreen Exited');
        }
      });
    }

    function handleViolation(type) {
      violations++;
      playBeep();
      if (violations >= 3) {
        submitTest('Exceeded 3 Security Violations');
      } else {
        alert('Warning (' + violations + '/3): ' + type + '. Stay focused on the test!');
      }
    }

    function renderQuestion() {
      const q = questions[currentIndex];
      const answeredCount = Object.keys(answers).length;
      const isLast = currentIndex === questions.length - 1;
      const allAnswered = answeredCount === questions.length;
      const hasCurrentAnswer = Boolean(answers[q.id]);

      const m = Math.floor(timeRemaining / 60);
      const s = timeRemaining % 60;
      const timeStr = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      const pct = Math.round(((currentIndex + 1) / questions.length) * 100);

      let contentHtml = '';
      if (q.type === 'mcq') {
        contentHtml = (q.options || []).map((opt, i) => {
          const isSelected = answers[q.id] === opt;
          return \`<div class="option-card \${isSelected ? 'selected' : ''}" onclick="selectAnswer('\${q.id}', '\${opt.replace(/'/g, "\\\\'")}')">
            <span style="font-weight:700; font-family:'JetBrains Mono';">\${String.fromCharCode(65+i)}</span>
            <span>\${opt}</span>
          </div>\`;
        }).join('');
      } else if (q.type === 'tf') {
        contentHtml = \`
          <div class="tf-container">
            <button class="tf-btn \${answers[q.id] === 'True' ? 'selected' : ''}" onclick="selectAnswer('\${q.id}', 'True')">True</button>
            <button class="tf-btn \${answers[q.id] === 'False' ? 'selected' : ''}" onclick="selectAnswer('\${q.id}', 'False')">False</button>
          </div>
        \`;
      } else {
        contentHtml = \`
          <div style="margin: 1.5rem 0;">
            <input id="fillInput" type="text" class="input-field" placeholder="Type answer..." value="\${answers[q.id] || ''}" oninput="selectAnswer('\${q.id}', this.value)" />
          </div>
        \`;
      }

      app.innerHTML = \`
        <div class="glass-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <div>
              <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Question \${currentIndex + 1} of \${questions.length}</span>
              <h4 style="font-size:1rem; font-weight:700; color:#fff;">\${studentName}</h4>
            </div>
            <div id="timerDisplay" class="timer-badge \${timeRemaining <= 60 ? 'urgent' : ''}">\${timeStr}</div>
          </div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:\${pct}%"></div></div>
          <h2 style="font-size: 1.15rem; font-weight:700; margin: 1.25rem 0;">\${q.prompt}</h2>
          \${contentHtml}
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1rem;">
            <span style="font-size:0.75rem; color:#94a3b8;">Answered: \${answeredCount}/\${questions.length}</span>
            \${!isLast ? \`
              <button class="btn-red" style="width:auto; margin-top:0; padding:0.6rem 1.5rem; font-size:0.875rem;" \${!hasCurrentAnswer ? 'disabled' : ''} onclick="nextQuestion()">Next</button>
            \` : \`
              <button class="btn-red" style="width:auto; margin-top:0; padding:0.6rem 2rem; font-size:0.875rem;" \${!allAnswered ? 'disabled' : ''} onclick="submitTest('Normal')">SUBMIT</button>
            \`}
          </div>
        </div>
      \`;
    }

    window.selectAnswer = (qid, ans) => {
      answers[qid] = ans;
      renderQuestion();
    };

    window.nextQuestion = () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
      }
    };

    window.submitTest = (reason) => {
      if (isSubmitting) return;
      isSubmitting = true;
      if (timerId) clearInterval(timerId);

      let score = 0;
      const details = questions.map(q => {
        const studAns = (answers[q.id] || '').trim().toLowerCase();
        let isCorrect = false;
        if (q.type === 'mcq' || q.type === 'tf') {
          isCorrect = studAns === q.correctAnswer.trim().toLowerCase();
        } else {
          isCorrect = studAns === q.correctAnswer.trim().toLowerCase() || (q.acceptableAnswers && q.acceptableAnswers.some(a => a.toLowerCase() === studAns));
        }
        if (isCorrect) score++;
        return { prompt: q.prompt, student: answers[q.id] || '', correct: q.correctAnswer, ok: isCorrect };
      });

      const percentage = ((score / questions.length) * 100).toFixed(1);

      // Post to Google Sheet webhook if configured
      if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.startsWith('http')) {
        fetch(GOOGLE_SHEET_URL, {
          method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            studentName: studentName,
            score: score,
            totalQuestions: questions.length,
            percentage: percentage + '%',
            timeSpent: (1500 - timeRemaining) + 's',
            timestamp: new Date().toISOString(),
            submissionReason: reason,
            violations: violations
          })
        }).catch(() => {});
      }

      // Trigger Confetti
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch(e) {}

      app.innerHTML = \`
        <div class="glass-card" style="text-align:center;">
          <h2 style="font-size:2rem; font-weight:800; color:#fff; margin-bottom:0.5rem;">\${studentName}</h2>
          <p style="color:#94a3b8; font-size:0.875rem;">ICT Quiz 1 Complete • Conducted by: Sheeraz Iqbal</p>
          <div style="margin:2rem 0; padding:1.5rem; background:rgba(2,6,23,0.8); border-radius:1rem;">
            <div style="font-size:3.5rem; font-weight:900; color:#ef4444; font-family:'JetBrains Mono';">\${score} / \${questions.length}</div>
            <div style="font-size:1.5rem; font-weight:700; color:#fff; margin-top:0.25rem;">\${percentage}%</div>
          </div>
          \${violations > 0 ? \`<div style="margin: 1rem 0; padding: 0.75rem; background: rgba(225, 29, 72, 0.15); border: 1px solid rgba(225, 29, 72, 0.4); border-radius: 0.75rem; color: #fda4af; font-size: 0.85rem; font-weight: 700;">Proctor Strikes Recorded: \${violations} / 3</div>\` : ''}
          <p style="font-size:0.75rem; color:#94a3b8; margin-bottom:1.5rem;">Submitted via \${reason} • Recorded securely</p>
          <button class="btn-red" onclick="location.reload()">Restart With New Questions</button>
        </div>
      \`;
    };

    renderLanding();
  </script>
</body>
</html>`;
}

export function downloadFile(filename: string, content: string, mimeType: string = 'text/html') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
