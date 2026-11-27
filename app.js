(() => {
  "use strict";

  const SESSION_KEY = "emosiyalarimi_taniyiram_session_v1";

  const createEmptyAnswers = () => ({
    when: { options: [], text: "" },
    body: { options: [], text: "" },
    help: { options: [], text: "" }
  });

  const initialState = () => ({
    view: "home", // "home" | "emotions" | "questions" | "result"
    selectedEmotionId: null,
    questionIndex: 0,
    answers: createEmptyAnswers()
  });

  let state = loadSessionState();
  let breathIntervalId = null;
  let breathPhaseIndex = 0;
  let breathSecondsLeft = 4;

  // DOM elements
  const views = {
    home: document.getElementById("view-home"),
    emotions: document.getElementById("view-emotions"),
    questions: document.getElementById("view-questions"),
    result: document.getElementById("view-result")
  };

  const progressNav = document.getElementById("progressNav");
  const stepItems = Array.from(document.querySelectorAll(".step-item"));
  const brandHomeBtn = document.getElementById("brandHomeBtn");
  const startBtn = document.getElementById("startBtn");

  // Emotions view
  const emotionGrid = document.getElementById("emotionGrid");
  const emotionError = document.getElementById("emotionError");
  const emotionsBackBtn = document.getElementById("emotionsBackBtn");
  const emotionsNextBtn = document.getElementById("emotionsNextBtn");

  // Questions view
  const bannerEmoji = document.getElementById("bannerEmoji");
  const bannerName = document.getElementById("bannerName");
  const changeEmotionBtn = document.getElementById("changeEmotionBtn");
  const questionStepPill = document.getElementById("questionStepPill");
  const questionProgressFill = document.getElementById("questionProgressFill");
  const questionForm = document.getElementById("questionForm");
  const questionTitle = document.getElementById("questionTitle");
  const questionSubtitle = document.getElementById("questionSubtitle");
  const optionsGrid = document.getElementById("optionsGrid");
  const customAnswerInput = document.getElementById("customAnswerInput");
  const charCounter = document.getElementById("charCounter");
  const questionError = document.getElementById("questionError");
  const questionBackBtn = document.getElementById("questionBackBtn");
  const questionNextLabel = document.getElementById("questionNextLabel");

  // Result view
  const resultEmoji = document.getElementById("resultEmoji");
  const resultTitle = document.getElementById("resultTitle");
  const resultLead = document.getElementById("resultLead");
  const adviceMain = document.getElementById("adviceMain");
  const adviceList = document.getElementById("adviceList");
  const summaryList = document.getElementById("summaryList");
  const editAnswersBtn = document.getElementById("editAnswersBtn");
  const restartBtn = document.getElementById("restartBtn");

  // Breathing helper
  const breathCircle = document.getElementById("breathCircle");
  const breathCircleText = document.getElementById("breathCircleText");
  const breathingStatus = document.getElementById("breathingStatus");
  const breathToggleBtn = document.getElementById("breathToggleBtn");

  function loadSessionState() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return initialState();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return initialState();

      const validViews = ["home", "emotions", "questions", "result"];
      const safeView = validViews.includes(parsed.view) ? parsed.view : "home";
      const emotionExists = EMOTIONS.some((e) => e.id === parsed.selectedEmotionId);

      if ((safeView === "questions" || safeView === "result") && !emotionExists) {
        return initialState();
      }

      const safeAnswers = createEmptyAnswers();
      if (parsed.answers && typeof parsed.answers === "object") {
        QUESTION_STEPS.forEach(({ key }) => {
          const entry = parsed.answers[key];
          if (entry && typeof entry === "object") {
            safeAnswers[key] = {
              options: Array.isArray(entry.options)
                ? entry.options.filter((item) => typeof item === "string")
                : [],
              text: typeof entry.text === "string" ? entry.text.slice(0, 240) : ""
            };
          }
        });
      }

      const safeIndex =
        Number.isInteger(parsed.questionIndex) &&
        parsed.questionIndex >= 0 &&
        parsed.questionIndex < QUESTION_STEPS.length
          ? parsed.questionIndex
          : 0;

      return {
        view: safeView,
        selectedEmotionId: emotionExists ? parsed.selectedEmotionId : null,
        questionIndex: safeIndex,
        answers: safeAnswers
      };
    } catch {
      return initialState();
    }
  }

  function saveSessionState() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } catch {
      // SessionStorage əlçatan deyilsə, yaddaşdaxili vəziyyətlə davam et
    }
  }

  function clearSessionState() {
    stopBreathing();
    state = initialState();
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }

  function getSelectedEmotion() {
    return EMOTIONS.find((item) => item.id === state.selectedEmotionId) || null;
  }

  function applyEmotionTheme(emotion) {
    const root = document.documentElement.style;
    if (!emotion) {
      root.setProperty("--accent-emotion", "#4f46e5");
      root.setProperty("--accent-emotion-bg", "#eef2ff");
      root.setProperty("--accent-emotion-border", "#c7d2fe");
      return;
    }
    root.setProperty("--accent-emotion", emotion.color);
    root.setProperty("--accent-emotion-bg", emotion.bgSoft);
    root.setProperty("--accent-emotion-border", emotion.borderSoft);
  }

  function updateStepper() {
    if (state.view === "home") {
      progressNav.hidden = true;
      return;
    }

    progressNav.hidden = false;
    const order = ["emotions", "questions", "result"];
    const currentIdx = order.indexOf(state.view);

    stepItems.forEach((item) => {
      const stepName = item.dataset.step;
      const stepIdx = order.indexOf(stepName);
      item.classList.toggle("is-active", stepIdx === currentIdx);
      item.classList.toggle("is-done", stepIdx < currentIdx);
    });
  }

  function showView(viewName) {
    if (state.view === "result" && viewName !== "result") {
      stopBreathing();
    }

    state.view = viewName;
    saveSessionState();

    Object.entries(views).forEach(([key, section]) => {
      const active = key === viewName;
      section.hidden = !active;
      section.classList.toggle("is-active", active);
    });

    applyEmotionTheme(viewName === "home" ? null : getSelectedEmotion());
    updateStepper();

    if (viewName === "emotions") {
      renderEmotionCards();
    } else if (viewName === "questions") {
      renderQuestionStep();
    } else if (viewName === "result") {
      renderResultView();
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
  }

  function renderEmotionCards() {
    emotionGrid.innerHTML = "";
    emotionError.hidden = true;

    EMOTIONS.forEach((emotion) => {
      const isSelected = state.selectedEmotionId === emotion.id;
      const card = document.createElement("button");
      card.type = "button";
      card.className = `emotion-card${isSelected ? " is-selected" : ""}`;
      card.setAttribute("role", "radio");
      card.setAttribute("aria-checked", isSelected ? "true" : "false");
      card.dataset.emotionId = emotion.id;
      card.style.setProperty("--card-color", emotion.color);
      card.style.setProperty("--card-bg", emotion.bgSoft);

      const top = document.createElement("div");
      top.className = "emotion-card-top";

      const emojiWrap = document.createElement("span");
      emojiWrap.className = "emotion-emoji";
      emojiWrap.setAttribute("aria-hidden", "true");
      emojiWrap.textContent = emotion.emoji;

      const check = document.createElement("span");
      check.className = "emotion-check";
      check.setAttribute("aria-hidden", "true");
      check.textContent = "✓";

      top.append(emojiWrap, check);

      const title = document.createElement("h3");
      title.className = "emotion-name";
      title.textContent = emotion.name;

      const desc = document.createElement("p");
      desc.className = "emotion-desc";
      desc.textContent = emotion.shortDesc;

      card.append(top, title, desc);

      card.addEventListener("click", () => {
        if (state.selectedEmotionId !== emotion.id) {
          state.selectedEmotionId = emotion.id;
          state.questionIndex = 0;
          state.answers = createEmptyAnswers();
        }
        emotionError.hidden = true;
        saveSessionState();
        applyEmotionTheme(emotion);
        renderEmotionCards();
      });

      emotionGrid.appendChild(card);
    });
  }

  function renderQuestionStep() {
    const emotion = getSelectedEmotion();
    if (!emotion) {
      showView("emotions");
      return;
    }

    const step = QUESTION_STEPS[state.questionIndex];
    const currentAnswer = state.answers[step.key];
    const options = emotion.questions[step.key];

    bannerEmoji.textContent = emotion.emoji;
    bannerName.textContent = emotion.name;

    const total = QUESTION_STEPS.length;
    const currentNum = state.questionIndex + 1;
    questionStepPill.textContent = `Sual ${currentNum} / ${total}`;
    questionProgressFill.style.width = `${(currentNum / total) * 100}%`;

    questionTitle.textContent = step.title;
    questionSubtitle.textContent = step.subtitle;
    questionNextLabel.textContent =
      currentNum === total ? "Nəticəyə bax" : "Növbəti sual";

    questionError.hidden = true;

    optionsGrid.innerHTML = "";
    options.forEach((optionText) => {
      const isSelected = currentAnswer.options.includes(optionText);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `option-btn${isSelected ? " is-selected" : ""}`;
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");

      const box = document.createElement("span");
      box.className = "option-box";
      box.setAttribute("aria-hidden", "true");
      box.textContent = "✓";

      const label = document.createElement("span");
      label.textContent = optionText;

      btn.append(box, label);
      btn.addEventListener("click", () => {
        toggleOption(step.key, optionText);
      });

      optionsGrid.appendChild(btn);
    });

    customAnswerInput.value = currentAnswer.text;
    updateCharCounter();
  }

  function toggleOption(questionKey, optionText) {
    const list = state.answers[questionKey].options;
    const idx = list.indexOf(optionText);
    if (idx === -1) {
      list.push(optionText);
    } else {
      list.splice(idx, 1);
    }
    questionError.hidden = true;
    saveSessionState();
    renderQuestionStep();
  }

  function updateCharCounter() {
    charCounter.textContent = `${customAnswerInput.value.length} / 240`;
  }

  function hasValidAnswer(questionKey) {
    const answer = state.answers[questionKey];
    return answer.options.length > 0 || answer.text.trim().length > 0;
  }

  function isAllQuestionsAnswered() {
    return QUESTION_STEPS.every(({ key }) => hasValidAnswer(key));
  }

  function renderResultView() {
    const emotion = getSelectedEmotion();
    if (!emotion || !isAllQuestionsAnswered()) {
      showView(emotion ? "questions" : "emotions");
      return;
    }

    resultEmoji.textContent = emotion.emoji;
    resultTitle.textContent = `Bu gün seçdiyin emosiya: ${emotion.name}`;
    resultLead.textContent = emotion.resultLead;

    adviceMain.textContent = emotion.mainAdvice;
    adviceList.innerHTML = "";
    emotion.extraTips.forEach((tip) => {
      const li = document.createElement("li");
      li.textContent = tip;
      adviceList.appendChild(li);
    });

    summaryList.innerHTML = "";
    QUESTION_STEPS.forEach((step) => {
      const answer = state.answers[step.key];
      const item = document.createElement("div");
      item.className = "summary-item";

      const q = document.createElement("h4");
      q.className = "summary-question";
      q.textContent = step.title;
      item.appendChild(q);

      if (answer.options.length > 0) {
        const chips = document.createElement("div");
        chips.className = "summary-chips";
        answer.options.forEach((opt) => {
          const chip = document.createElement("span");
          chip.className = "summary-chip";
          chip.textContent = opt;
          chips.appendChild(chip);
        });
        item.appendChild(chips);
      }

      if (answer.text.trim().length > 0) {
        const note = document.createElement("p");
        note.className = "summary-note";
        note.textContent = `Qeydin: "${answer.text.trim()}"`;
        item.appendChild(note);
      }

      summaryList.appendChild(item);
    });
  }

  // Mini nəfəs məşqi
  const BREATH_PHASES = [
    { cls: "phase-inhale", label: "Nəfəs al", status: "4 saniyə boyunca burnundan yavaşca nəfəs al..." },
    { cls: "phase-hold", label: "Saxla", status: "4 saniyə nəfəsini rahat şəkildə saxla..." },
    { cls: "phase-exhale", label: "Burax", status: "4 saniyə boyunca ağzından yavaşca nəfəs ver..." }
  ];

  function applyBreathPhase() {
    const phase = BREATH_PHASES[breathPhaseIndex];
    breathCircle.className = `breath-circle ${phase.cls}`;
    breathCircleText.textContent = `${phase.label} (${breathSecondsLeft})`;
    breathingStatus.textContent = phase.status;
  }

  function startBreathing() {
    stopBreathing();
    breathPhaseIndex = 0;
    breathSecondsLeft = 4;
    applyBreathPhase();
    breathToggleBtn.textContent = "Məşqi dayandır";

    breathIntervalId = window.setInterval(() => {
      breathSecondsLeft -= 1;
      if (breathSecondsLeft <= 0) {
        breathPhaseIndex = (breathPhaseIndex + 1) % BREATH_PHASES.length;
        breathSecondsLeft = 4;
      }
      applyBreathPhase();
    }, 1000);
  }

  function stopBreathing() {
    if (breathIntervalId !== null) {
      window.clearInterval(breathIntervalId);
      breathIntervalId = null;
    }
    breathCircle.className = "breath-circle";
    breathCircleText.textContent = "Hazır";
    breathingStatus.textContent =
      "İstəsən 4 saniyə nəfəs al, 4 saniyə saxla və 4 saniyə yavaşca burax.";
    breathToggleBtn.textContent = "Nəfəs məşqinə başla";
  }

  // Event listeners
  startBtn.addEventListener("click", () => {
    showView("emotions");
  });

  brandHomeBtn.addEventListener("click", () => {
    showView("home");
  });

  emotionsBackBtn.addEventListener("click", () => {
    showView("home");
  });

  emotionsNextBtn.addEventListener("click", () => {
    if (!getSelectedEmotion()) {
      emotionError.textContent = "Zəhmət olmasa davam etmək üçün bir emosiya kartı seç.";
      emotionError.hidden = false;
      return;
    }
    state.questionIndex = 0;
    showView("questions");
  });

  changeEmotionBtn.addEventListener("click", () => {
    showView("emotions");
  });

  customAnswerInput.addEventListener("input", () => {
    const step = QUESTION_STEPS[state.questionIndex];
    state.answers[step.key].text = customAnswerInput.value.slice(0, 240);
    updateCharCounter();
    if (hasValidAnswer(step.key)) {
      questionError.hidden = true;
    }
    saveSessionState();
  });

  questionBackBtn.addEventListener("click", () => {
    if (state.questionIndex > 0) {
      state.questionIndex -= 1;
      saveSessionState();
      renderQuestionStep();
    } else {
      showView("emotions");
    }
  });

  questionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const step = QUESTION_STEPS[state.questionIndex];
    state.answers[step.key].text = customAnswerInput.value.slice(0, 240);
    saveSessionState();

    if (!hasValidAnswer(step.key)) {
      questionError.textContent =
        "Davam etmək üçün ən azı bir variant seç və ya qısa cavab yaz.";
      questionError.hidden = false;
      return;
    }

    if (state.questionIndex < QUESTION_STEPS.length - 1) {
      state.questionIndex += 1;
      saveSessionState();
      renderQuestionStep();
    } else {
      showView("result");
    }
  });

  editAnswersBtn.addEventListener("click", () => {
    state.questionIndex = 0;
    showView("questions");
  });

  restartBtn.addEventListener("click", () => {
    clearSessionState();
    showView("home");
  });

  breathToggleBtn.addEventListener("click", () => {
    if (breathIntervalId === null) {
      startBreathing();
    } else {
      stopBreathing();
    }
  });

  // Initial render
  showView(state.view);
})();
