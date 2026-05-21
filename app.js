const STORAGE_KEY = "zy_case_practice_v2";

const els = {
  practiceMode: document.getElementById("practiceMode"),
  systemFilter: document.getElementById("systemFilter"),
  queueFilter: document.getElementById("queueFilter"),
  searchInput: document.getElementById("searchInput"),
  memorySearch: document.getElementById("memorySearch"),
  labSearch: document.getElementById("labSearch"),
  caseList: document.getElementById("caseList"),
  doneCount: document.getElementById("doneCount"),
  correctRate: document.getElementById("correctRate"),
  caseBadge: document.getElementById("caseBadge"),
  stemText: document.getElementById("stemText"),
  evidenceLegend: document.getElementById("evidenceLegend"),
  diagnosisInput: document.getElementById("diagnosisInput"),
  testsInput: document.getElementById("testsInput"),
  judgeBox: document.getElementById("judgeBox"),
  testJudgeBox: document.getElementById("testJudgeBox"),
  initialAnswer: document.getElementById("initialAnswer"),
  evidenceAnswer: document.getElementById("evidenceAnswer"),
  testsAnswer: document.getElementById("testsAnswer"),
  treatmentList: document.getElementById("treatmentList"),
  differentialBoard: document.getElementById("differentialBoard"),
  memoryBoard: document.getElementById("memoryBoard"),
  labBoard: document.getElementById("labBoard"),
  fiveGrid: document.getElementById("fiveGrid"),
  memorizeCaseLabel: document.getElementById("memorizeCaseLabel"),
  memorizeMode: document.getElementById("memorizeMode"),
  practiceTabs: document.getElementById("practiceTabs"),
  stemPanel: document.getElementById("stemPanel"),
  positionLabel: document.getElementById("positionLabel"),
  favoriteBtn: document.getElementById("favoriteBtn"),
  masteredBtn: document.getElementById("masteredBtn"),
  studyButtons: [...document.querySelectorAll(".study-tab")],
};

const cases = (window.CASES || []).filter((item) => item.id);
const formulas = (window.FORMULAS || []).filter((item) => item.outlineNo);
const labReferences = window.LAB_REFERENCES || [
  { abbr: "WBC", name: "白细胞计数", range: "4.5-11.0 ×10^9/L", note: "感染、炎症、应激常升高。", source: "公开参考值" },
  { abbr: "Hb", name: "血红蛋白", range: "男 13.2-16.6 g/dL；女 11.6-15.0 g/dL", note: "贫血、消化道出血、肾病题常用。", source: "公开参考值" },
  { abbr: "PLT", name: "血小板", range: "150-450 ×10^9/L", note: "出血倾向、ITP、DIC 题常用。", source: "公开参考值" },
  { abbr: "ESR", name: "红细胞沉降率", range: "男 <15 mm/h；女 <20 mm/h", note: "结核、风湿免疫、炎症活动度可升高。", source: "公开参考值" },
  { abbr: "CRP", name: "C 反应蛋白", range: "<10 mg/L", note: "急性炎症、感染活动度速记。", source: "公开参考值" },
  { abbr: "pH", name: "血气酸碱度", range: "7.35-7.45", note: "酸中毒、碱中毒先看它。", source: "公开参考值" },
  { abbr: "PaO2", name: "动脉氧分压", range: "75-100 mmHg", note: "低氧血症、呼衰判断。", source: "公开参考值" },
  { abbr: "PaCO2", name: "动脉二氧化碳分压", range: "35-45 mmHg", note: "PaCO2 >50 mmHg 支持 II 型呼衰。", source: "公开参考值" },
  { abbr: "HCO3-", name: "碳酸氢根", range: "22-26 mmol/L", note: "代谢性酸碱失衡常用。", source: "公开参考值" },
  { abbr: "P/F", name: "氧合指数", range: "正常约 400-500 mmHg；ARDS <300 mmHg", note: "P/F=PaO2/FiO2。", source: "119页红字+公开参考值" },
  { abbr: "Na+", name: "血钠", range: "136-145 mmol/L", note: "脱水、呕吐、意识障碍题常查。", source: "公开参考值" },
  { abbr: "K+", name: "血钾", range: "3.5-5.0 mmol/L", note: "心律失常、肾衰、DKA 题常查。", source: "公开参考值" },
  { abbr: "Ca", name: "血钙", range: "2.25-2.75 mmol/L", note: "佝偻病、甲旁亢、肾病题常见。", source: "119页红字" },
  { abbr: "P", name: "血磷", range: "1.45-2.10 mmol/L", note: "儿科维生素 D 缺乏题常见。", source: "119页红字" },
  { abbr: "ALP", name: "碱性磷酸酶", range: "125-250 U/L", note: "佝偻病中常升高。", source: "119页红字" },
  { abbr: "Scr", name: "血肌酐", range: "约 0.6-1.3 mg/dL（53-115 μmol/L）", note: "AKI、CKD 分期与肾功能判断。", source: "公开参考值" },
  { abbr: "BUN", name: "尿素氮", range: "7-20 mg/dL（约 2.5-7.1 mmol/L）", note: "肾前性/肾性损伤、消化道出血可升高。", source: "公开参考值" },
  { abbr: "ALT", name: "谷丙转氨酶", range: "约 7-56 U/L", note: "肝细胞损伤常用。", source: "公开参考值" },
  { abbr: "AST", name: "谷草转氨酶", range: "约 10-40 U/L", note: "肝病、心肌损伤均可升高。", source: "公开参考值" },
  { abbr: "AFP", name: "甲胎蛋白", range: "原发性肝癌常用阈值 >400 μg/L", note: "乙肝/肝硬化背景下尤其关键。", source: "119页红字" },
  { abbr: "FPG", name: "空腹血糖", range: "正常 <5.6 mmol/L；糖尿病 ≥7.0 mmol/L", note: "糖尿病诊断标准之一。", source: "公开参考值" },
  { abbr: "RPG", name: "随机血糖", range: "糖尿病诊断阈值 ≥11.1 mmol/L", note: "有典型症状时尤其关键。", source: "119页红字+公开参考值" },
  { abbr: "OGTT", name: "口服糖耐量 2h 血糖", range: "糖尿病诊断阈值 ≥11.1 mmol/L", note: "糖尿病诊断标准之一。", source: "119页红字+公开参考值" },
  { abbr: "D-dimer", name: "D-二聚体", range: "常用阴性参考 <0.5 mg/L FEU", note: "肺栓塞筛查，阳性不等于确诊。", source: "公开参考值" },
  { abbr: "ADA", name: "腺苷脱氨酶", range: "胸水 ADA >45 U/L 倾向结核性胸膜炎", note: "需结合胸水性质与结核证据。", source: "119页红字" },
];
const systems = [...new Set(cases.map((item) => item.system).filter(Boolean))];
let stats = loadStats();
let studyMode = "practice";
let mode = "diagnosis";
let filtered = [];
let currentId = cases[0]?.id;
let treatmentMasked = true;
let differentialShown = false;
let evidenceVisible = false;

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function caseStats(id) {
  if (!stats[id]) {
    stats[id] = { attempts: 0, best: "", favorite: false, mastered: false };
  }
  return stats[id];
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[()（）\[\]【】《》<>]/g, "")
    .replace(/[，,。.;；:：、\s·\-_/]/g, "")
    .replace(/ⅰ/g, "i")
    .replace(/ⅱ/g, "ii")
    .replace(/ⅲ/g, "iii")
    .replace(/ⅳ/g, "iv");
}

function compact(text, fallback = "暂无") {
  const value = String(text || "").trim();
  return value && value.toLowerCase() !== "nan" ? value : fallback;
}

function splitItems(text) {
  return compact(text, "")
    .split(/\n|；|;/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitDiagnosis(text) {
  return compact(text, "")
    .split(/\n|；|;|,|，/)
    .map((line) => line.replace(/^\d+[）).、]\s*/, "").trim())
    .filter(Boolean);
}

function isNumberedItem(line) {
  return /^([①②③④⑤⑥⑦⑧⑨]|\d+\s*[)）.、]|\d+(?=[\u4e00-\u9fa5A-Za-z]))/.test(String(line || "").trim());
}

function renderTextBlock(text, fallback = "暂无") {
  const lines = compact(text, fallback)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  return `<div class="answer-lines">${lines.map(renderAnswerLine).join("")}</div>`;
}

function renderAnswerLine(line) {
  const normalized = line.replace(/^([①②③④⑤⑥⑦⑧⑨⑩])/, "$1 ");
  const match = normalized.match(/^(\d+[.、）)]|[①②③④⑤⑥⑦⑧⑨⑩])\s*(.*)$/);
  if (!match) return `<p class="answer-line">${escapeHtml(normalized)}</p>`;
  return `
    <p class="answer-line numbered">
      <span class="answer-no">${escapeHtml(match[1])}</span>
      <span>${escapeHtml(match[2])}</span>
    </p>
  `;
}

function cleanDiagnosisText(text) {
  const lines = splitDiagnosis(text)
    .map((line) => tidyMedicalText(line))
    .filter((line) => line && !isAnswerNoise(line));
  return [...new Set(lines)].map((line, index) => `${index + 1}. ${line}`).join("\n");
}

function cleanEvidenceText(item, useFallback = true) {
  const lines = cleanAnswerLines(item.evidence, { stem: item.stem, minLength: 6 }).filter(looksLikeEvidenceLine);
  if (lines.length) return lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
  if (!useFallback) return "";
  const formula = tidyMedicalText(item.formula || "");
  if (formula) return `原题诊断依据未稳定提取；可按诊断公式回看题干关键阳性信息：${formula}`;
  return "原题诊断依据未稳定提取；请结合题干关键阳性信息核对。";
}

function looksLikeEvidenceLine(line) {
  const text = String(line || "");
  if (!text || isAnswerNoise(text)) return false;
  if (/[：:]/.test(text) && text.length >= 8) return true;
  return /诊断|符合|提示|病史|症状|体征|查体|检查|实验室|影像|阳性|阴性|发热|高热|咳|痰|喘|痛|腹泻|呕吐|血|尿|便|肿|WBC|Hb|CT|MRI|X线|B超|心电图|血气|培养/.test(text);
}

function cleanStemText(text) {
  return compact(text, "")
    .split(/\n+/)
    .map((line) => tidyMedicalText(line))
    .filter((line) => line && !isAnswerNoise(line))
    .join("\n");
}

function cleanAnswerLines(text, options = {}) {
  const stemText = normalize(options.stem || "");
  const minLength = options.minLength ?? 2;
  return compact(text, "")
    .split(/\n|；|;/)
    .map((line) => tidyMedicalText(line))
    .filter((line) => line && normalize(line).length >= minLength)
    .filter((line) => !isAnswerNoise(line))
    .filter((line) => {
      if (!stemText) return true;
      const normalized = normalize(line);
      return normalized.length < 4 || !stemText.includes(normalized);
    })
    .map(stripItemPrefix)
    .filter(Boolean)
    .filter((line) => !isAnswerNoise(line));
}

function cleanDifferentialItems(item) {
  const trusted = (item.cleanDifferential || []).map((line) => ({ line, trusted: true }));
  const raw = splitItems(item.differential).map((line) => ({ line, trusted: false }));
  const items = [...raw, ...trusted]
    .filter(({ line, trusted }) => trusted || isNumberedItem(line))
    .map(({ line }) => tidyMedicalText(line))
    .map(stripItemPrefix)
    .map(removeDanglingLabTail)
    .filter((line) => line && !isAnswerNoise(line))
    .filter((line) => !/什么什么|血和脓|糖化血红蛋白|药物敏感试验|^部位/.test(line));
  return [...new Set(items)];
}

function tidyMedicalText(line) {
  return String(line || "")
    .replace(/[“”]/g, '"')
    .replace(/[，,]\//g, "、")
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/T36\.8℃C/g, "T36.8℃")
    .replace(/PaCO2(?=\d)/g, "PaCO2 ")
    .replace(/PaO(?=\d)/g, "PaO2 ")
    .replace(/\bHCO=/g, "HCO3-=")
    .replace(/21型呼吸衰竭/g, "II型呼吸衰竭")
    .replace(/急性肾孟肾炎/g, "急性肾盂肾炎")
    .replace(/慢性肾孟肾炎/g, "慢性肾盂肾炎")
    .replace(/进人阴囊/g, "进入阴囊")
    .replace(/颅骨骨质不连续/g, "颅骨骨质不连续")
    .replace(/（119页参考诊断要点：.*?）/g, "")
    .replace(/[（(]?仅答.*?得\s*\d+(?:\.\d+)?分[）)]?/g, "")
    .replace(/[（(]?\d+(?:\.\d+)?分[）)]?/g, "")
    .replace(/^[)）]+|[(（]+$/g, "")
    .replace(/[;；,，、(（]\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function removeDanglingLabTail(line) {
  const text = String(line || "").trim();
  if (/^(Hb|RBC|WBC|Plt|PLT|N|L)\s*\d/i.test(text)) return "";
  return text
    .replace(/\s+(?:Hb|RBC|WBC|Plt|PLT|N|L)?\d+(?:\.\d+)?\s*[×x]\s*10[°^]\/L.*$/i, "")
    .replace(/\s+\d+(?:\.\d+)?\s*[×x]\s*10(?:12|9)\/L.*$/i, "")
    .replace(/\s+\d+(?:\.\d+)?\s*[×x]\s*10[°^].*$/i, "")
    .trim();
}

function isAnswerNoise(line) {
  const text = String(line || "").trim();
  if (!text || text === "略") return true;
  if (/^\(?\d+(?:\.\d+)?分\)?$/.test(text)) return true;
  if (/番茄|Lynn|公众号|保存图片|打开|视频|睡|bilibili|NO\.|^\(?ynn\)?$/i.test(text)) return true;
  if (/^(mHg|Hg|09\/L|10°\/L|10\^?9\/L|分类正常|[A-Z]?\d?\d?\.\d+[,，]?)$/.test(text)) return true;
  if (/^(Hb|RBC|WBC|Plt|PLT|N|L)?\s*\d*(?:\.\d+)?\s*[×x]?\s*10[°^](?:\/L)?.{0,10}$/i.test(text)) return true;
  if (/^(神志清楚|营养中等|呼吸动度|触觉语颤|未闻及|腹平软|下肢无水肿|由他人扶入|冬季明显)$/.test(text)) return true;
  if (normalize(text).length <= 2 && !/[A-Za-z0-9]/.test(text)) return true;
  return false;
}

function currentCase() {
  return cases.find((item) => item.id === currentId) || filtered[0] || cases[0];
}

function initFilters() {
  els.systemFilter.innerHTML = [
    `<option value="all">全部系统</option>`,
    ...systems.map((system) => `<option value="${escapeHtml(system)}">${escapeHtml(system)}</option>`),
  ].join("");
}

function applyFilters() {
  const system = els.systemFilter.value;
  const queue = els.queueFilter.value;
  const query = normalize(els.searchInput.value);

  filtered = cases.filter((item) => {
    const st = caseStats(item.id);
    if (system !== "all" && item.system !== system) return false;
    if (queue === "wrong" && st.best !== "wrong") return false;
    if (queue === "partial" && st.best !== "partial") return false;
    if (queue === "favorite" && !st.favorite) return false;
    if (queue === "unseen" && st.attempts > 0) return false;
    if (queue === "review" && !hasReviewNote(item)) return false;
    if (!query) return true;
    return normalize([item.id, item.system, item.stem, item.evidence, item.tests].join(" ")).includes(query);
  });

  if (!filtered.some((item) => item.id === currentId)) {
    currentId = filtered[0]?.id || cases[0]?.id;
  }
  renderList();
  renderCase();
  renderMemoryBoard();
  renderLabBoard();
}

function hasReviewNote(item) {
  return Boolean(
    compact(item.extractNote, "") ||
      compact(item.enrichNote, "") ||
      compact(item.enrichSource, "").includes("未能")
  );
}

function renderStats() {
  const done = cases.filter((item) => caseStats(item.id).attempts > 0);
  const correct = done.filter((item) => caseStats(item.id).best === "correct");
  els.doneCount.textContent = String(done.length);
  els.correctRate.textContent = done.length ? `${Math.round((correct.length / done.length) * 100)}%` : "0%";
}

function renderList() {
  els.caseList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  filtered.forEach((item, index) => {
    const st = caseStats(item.id);
    const button = document.createElement("button");
    button.className = `case-row ${item.id === currentId ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <strong>${item.id}</strong>
      <span>
        第 ${item.localNo || index + 1} 题
        <small>${escapeHtml(item.system)} · PDF ${item.pdfPage || "-"}</small>
      </span>
      <i class="status-dot status-${st.best || "none"}"></i>
    `;
    button.addEventListener("click", () => {
      currentId = item.id;
      resetVisiblePractice();
      renderCase();
      renderList();
    });
    fragment.appendChild(button);
  });
  els.caseList.appendChild(fragment);
  renderStats();
}

function renderCase() {
  const item = currentCase();
  if (!item) return;
  const st = caseStats(item.id);
  setJudgeIdle();
  els.caseBadge.textContent = `${item.id} / 330 · ${compact(item.system)} · 第 ${item.localNo || "-"} 题`;
  renderStem();
  els.initialAnswer.innerHTML = renderTextBlock(cleanDiagnosisText(item.initialDx));
  els.evidenceAnswer.innerHTML = renderTextBlock(cleanEvidenceText(item));
  renderTests();
  els.favoriteBtn.classList.toggle("active", Boolean(st.favorite));
  els.masteredBtn.classList.toggle("active", Boolean(st.mastered));
  els.positionLabel.textContent = `${Math.max(0, filtered.findIndex((row) => row.id === item.id) + 1)} / ${filtered.length}`;
  renderTreatment();
  renderDifferential();
  renderFiveGrid();
  setStudyMode(studyMode);
}

function renderStem() {
  const item = currentCase();
  const stem = cleanStemText(compact(item.stem, "该题源页缺失，需人工补题。"));
  if (!evidenceVisible) {
    els.stemText.textContent = stem;
    els.evidenceLegend.classList.add("hidden");
    els.evidenceLegend.innerHTML = "";
    return;
  }
  const groups = evidenceGroups(item);
  const highlighted = highlightStem(stem, groups);
  els.stemText.innerHTML = highlighted;
  els.evidenceLegend.classList.toggle("hidden", groups.length === 0);
  els.evidenceLegend.innerHTML = groups
    .map((group, index) => `<span class="evidence-chip ev${(index % 5) + 1}">${escapeHtml(group.dx)}</span>`)
    .join("");
}

function setJudgeIdle() {
  evidenceVisible = false;
  els.judgeBox.className = "judge-box judge-idle";
  els.judgeBox.textContent = "等待提交";
  document.querySelectorAll(".answer-section").forEach((section) => section.classList.remove("open"));
}

function judgeDiagnosis(input, item) {
  const answer = normalize(input);
  if (!answer) return { result: "idle", title: "未填写", detail: "" };

  const main = normalize(item.mainDx);
  const outline = normalize(item.outlineDx);
  const initialParts = splitDiagnosis(item.initialDx).map(normalize);
  const subParts = splitDiagnosis(item.subDx).map(normalize);
  const candidates = [main, ...initialParts].filter((part) => part.length >= 3);

  const mainHit = candidates.some((part) => answer.includes(part) || (part.includes(answer) && answer.length >= 4));
  const outlineHit = outline && (answer.includes(outline) || (outline.includes(answer) && answer.length >= 3));
  const subHits = subParts.filter((part) => part.length >= 3 && answer.includes(part)).length;

  if (mainHit) {
    return {
      result: "correct",
      title: "主诊断命中",
      detail: subHits ? `副诊断命中 ${subHits} 项` : "继续核对副诊断、分型、部位和并发症",
    };
  }
  if (outlineHit) {
    return {
      result: "partial",
      title: "大纲方向命中",
      detail: "主诊断细分、部位、分型或并发症还要再卡准",
    };
  }
  return {
    result: "wrong",
    title: "主诊断未命中",
    detail: `标准主诊断：${compact(item.mainDx || item.outlineDx)}`,
  };
}

function submitDiagnosis() {
  const item = currentCase();
  const st = caseStats(item.id);
  const verdict = judgeDiagnosis(els.diagnosisInput.value, item);
  if (verdict.result === "idle") {
    setJudgeIdle();
    return;
  }
  st.attempts += 1;
  st.best = bestResult(st.best, verdict.result);
  saveStats();
  els.judgeBox.className = `judge-box judge-${verdict.result}`;
  els.judgeBox.innerHTML = `<strong>${escapeHtml(verdict.title)}</strong><br>${escapeHtml(verdict.detail)}`;
  document.querySelector('[data-section="initial"]').classList.add("open");
  evidenceVisible = true;
  renderStem();
  renderList();
}

function bestResult(oldResult, newResult) {
  const rank = { wrong: 1, partial: 2, correct: 3 };
  if (!oldResult) return newResult;
  return rank[newResult] > rank[oldResult] ? newResult : oldResult;
}

function revealDiagnosis() {
  document.querySelector('[data-section="initial"]').classList.add("open");
  document.querySelector('[data-section="evidence"]').classList.add("open");
  evidenceVisible = true;
  renderStem();
}

function evidenceGroups(item) {
  const lines = cleanAnswerLines(item.evidence, { minLength: 4 });
  const tooWeak = lines.length === 0 || normalize(lines.join("")).length < 8;
  if (tooWeak) {
    const dxList = splitDiagnosis(item.initialDx || item.mainDx || item.outlineDx);
    const formulaClauses = compact(item.formula, "")
      .split(/；|;|。|，|,/)
      .map((part) => part.trim())
      .filter(Boolean);
    return (dxList.length ? dxList : [compact(item.outlineDx)])
      .slice(0, 4)
      .map((dx) => ({ dx, clauses: [dx, item.outlineDx, ...formulaClauses].filter(Boolean) }));
  }
  return lines.map((line, index) => {
    const clean = line.replace(/^\d+[）).、]\s*/, "");
    const parts = clean.split(/：|:/);
    const dx = parts[0] || `诊断${index + 1}`;
    const evidenceText = parts.slice(1).join("：");
    const clauses = evidenceText
      .replace(/（119页参考诊断要点：.*?）/g, "")
      .split(/；|;|。/)
      .map((part) => part.trim())
      .filter((part) => part.length >= 3);
    return { dx, clauses };
  });
}

function highlightStem(stem, groups) {
  const parts = stem.split(/([，。；;、：:\n])/);
  return parts
    .map((part) => {
      if (/^[，。；;、：:\n]$/.test(part)) return escapeHtml(part);
      const groupIndex = bestEvidenceGroup(part, groups);
      if (groupIndex < 0) return escapeHtml(part);
      return `<mark class="ev ev${(groupIndex % 5) + 1}">${escapeHtml(part)}</mark>`;
    })
    .join("");
}

function bestEvidenceGroup(segment, groups) {
  const text = normalize(segment);
  if (text.length < 3) return -1;
  if (/无|否认|未见|自服|抗生素|药/.test(segment)) return -1;
  let best = { index: -1, score: 0 };
  groups.forEach((group, index) => {
    let score = 0;
    group.clauses.forEach((clause) => {
      const tokens = clauseTokens(clause);
      tokens.forEach((token) => {
        if (text.includes(normalize(token))) score += token.length >= 4 ? 2 : token.length === 1 ? 0.5 : 1;
      });
    });
    if (score > best.score) best = { index, score };
  });
  return best.score >= 1 ? best.index : -1;
}

function clauseTokens(text) {
  const stop = ["患者", "诊断", "提示", "检查", "病史", "主诉", "查体", "可见", "本题", "参考", "可以", "一般"];
  const importantSingles = ["咳", "痰", "喘", "热", "痛", "血", "肿", "水", "疸", "疹", "瘫", "吐", "泻"];
  const tokens = String(text)
    .match(/[\u4e00-\u9fa5A-Za-z0-9%/<>.]+/g)
    ?.filter((token) => token.length >= 2 && !stop.includes(token)) || [];
  importantSingles.forEach((single) => {
    if (String(text).includes(single)) tokens.push(single);
  });
  return [...new Set(tokens)];
}

function renderTreatment() {
  const lines = cleanTreatmentItems(currentCase());
  els.treatmentList.innerHTML = lines.length
    ? lines.map((line) => `<div class="cloze-line ${treatmentMasked ? "masked" : ""}">${escapeHtml(line)}</div>`).join("")
    : `<div class="cloze-line">暂无</div>`;
}

function renderDifferential() {
  const items = cleanDifferentialItems(currentCase());
  els.differentialBoard.innerHTML = items.length
    ? items
        .map((item) => `<span class="chip ${differentialShown ? "" : "masked"}">${escapeHtml(item)}</span>`)
        .join("")
    : `<span class="chip">暂无</span>`;
}

function renderTests() {
  const item = currentCase();
  const answer = cleanTestsText(testsTextFor(item), item.stem);
  els.testsAnswer.innerHTML = renderTextBlock(answer);
  setTestJudgeIdle();
}

function setTestJudgeIdle() {
  els.testJudgeBox.className = "judge-box judge-idle";
  els.testJudgeBox.textContent = "等待提交";
}

function cleanTestsText(text, stem = "") {
  const rawLines = compact(text, "")
    .split(/\n+/)
    .map((line) => cleanLine(line))
    .filter(Boolean);
  const stemText = normalize(stem);
  const items = [];
  let current = "";

  rawLines.forEach((line) => {
    if (isTestsNoise(line)) return;
    const numbered = /^([①②③④⑤⑥⑦⑧⑨⑩]|\d+\s*[)）.、]|\d+(?=[\u4e00-\u9fa5A-Za-z]))/.test(line);
    const stemFragment = !numbered && normalize(line).length >= 4 && stemText.includes(normalize(line));
    if (stemFragment) return;

    const stripped = stripItemPrefix(line);
    if (numbered) {
      if (current) items.push(current);
      current = stripped;
      return;
    }

    if (!current) {
      if (looksLikeTestItem(stripped)) current = stripped;
      return;
    }

    if (looksLikeContinuation(stripped)) {
      current = `${current}${current.endsWith("-") ? "" : " "}${stripped}`;
    }
  });

  if (current) items.push(current);
  const cleaned = items
    .map((item) => tidyMedicalText(item))
    .map((item) => item.replace(/胸部C(?!T)/g, "胸部CT").replace(/严查/g, "检查").replace(/穿剌/g, "穿刺"))
    .map(removeDanglingLabTail)
    .filter((item) => item && looksLikeTestItem(item) && !isAnswerNoise(item));

  return [...new Set(cleaned)].map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function testsTextFor(item) {
  const extra = splitItems(item.treatment)
    .map((line) => cleanLine(line))
    .filter(isMisplacedTestLine)
    .join("\n");
  return [item.tests, extra].filter(Boolean).join("\n");
}

function cleanTreatmentItems(item) {
  const lines = splitItems(item.treatment)
    .map((line) => cleanLine(line))
    .filter((line) => line && !isTestsNoise(line) && !isMisplacedTestLine(line))
    .map(stripItemPrefix)
    .map((line) => tidyMedicalText(line))
    .map(removeDanglingLabTail)
    .filter((line) => line && !isAnswerNoise(line))
    .filter(Boolean);
  return [...new Set(lines)];
}

function isMisplacedTestLine(line) {
  const text = stripItemPrefix(line);
  const hasTestCue = /复查|检查|试验|肺功能|过敏原|影像|CT|B超|超声|病原|培养|涂片|药敏|血气|血常规/.test(text);
  const hasTreatmentCue = /治疗|手术|用药|抗感染|抗结核|吸氧|给氧|通气|休息|健康|教育|饮食|止咳|祛痰|镇痛|补液|输血|纠正|切除/.test(text);
  return hasTestCue && !hasTreatmentCue;
}

function cleanLine(line) {
  return String(line || "")
    .replace(/[“”]/g, '"')
    .replace(/[，,]\//g, "、")
    .replace(/[（(]\s*[Yy][Nn]{1,2}\s*[）)]/g, "")
    .replace(/^[,，.。;；、\s]+|[,，.。;；、\s]+$/g, "")
    .trim();
}

function stripItemPrefix(line) {
  return line.replace(/^([①②③④⑤⑥⑦⑧⑨⑩]|\d+\s*[)）.、]|\d+(?=[\u4e00-\u9fa5A-Za-z]))\s*/, "").trim();
}

function isTestsNoise(line) {
  if (!line) return true;
  if (/^\(?\d+(?:\.\d+)?分\)?$/.test(line)) return true;
  if (/番茄|Lynn|公众号|保存图片|打开|视频|NO\.|睡|bilibili/i.test(line)) return true;
  if (/^[A-Z]?\d?\d?\.\d+[,，]?\s*[A-Z]?\d?\.\d+[,，]?$/.test(line)) return true;
  if (/^(mHg|Hg|09\/L|10°\/L|10\^?9\/L|分类正常)$/.test(line)) return true;
  return false;
}

function looksLikeTestItem(line) {
  return /血|尿|便|痰|胸|腹|头颅|CT|MRI|X线|B超|超声|心电|镜|穿刺|培养|药敏|病原|涂片|抗体|抗原|标志物|甲胎蛋白|AFP|CEA|CA\d+|电解质|肝|肾|糖|凝血|D-二聚体|PPD|T-SPOT|PET|造影|活检|细胞学|生化|气分析|肺功能/.test(
    line
  );
}

function looksLikeContinuation(line) {
  if (!line || isTestsNoise(line)) return false;
  if (/神志|语颤|未闻及|腹平软|下肢|心界|律齐|淋巴|体型|肝脾肋|呼吸音|叩诊|水肿|杂音|触及|压痛/.test(line)) {
    return looksLikeTestItem(line);
  }
  return looksLikeTestItem(line) || /^（?答出|^包括|^等|^CT等|^PET-|^或/.test(line);
}

function submitTests() {
  const item = currentCase();
  const input = normalize(els.testsInput.value);
  if (!input) {
    setTestJudgeIdle();
    return;
  }
  const expected = cleanTestsText(testsTextFor(item), item.stem)
    .split(/\n+/)
    .map((line) => normalize(line.replace(/^\d+\.\s*/, "")))
    .filter((line) => line.length >= 2);
  const hits = expected.filter((line) => {
    const tokens = clauseTokens(line).map(normalize).filter((token) => token.length >= 2);
    return tokens.some((token) => input.includes(token));
  }).length;
  const total = expected.length || 1;
  const ratio = hits / total;
  const result = ratio >= 0.7 ? "correct" : ratio >= 0.35 ? "partial" : "wrong";
  const title = result === "correct" ? "检查要点覆盖较好" : result === "partial" ? "命中部分检查" : "关键检查偏少";
  els.testJudgeBox.className = `judge-box judge-${result}`;
  els.testJudgeBox.innerHTML = `<strong>${escapeHtml(title)}</strong><br>${hits} / ${total} 项有命中，继续核对病原学、影像、功能和侵入性检查是否写全。`;
  document.querySelector('[data-section="tests"]').classList.add("open");
}

function revealTests() {
  document.querySelector('[data-section="tests"]').classList.add("open");
}

function renderMemoryBoard() {
  const query = normalize(els.memorySearch.value);
  const system = els.systemFilter.value;
  const entries = formulas.filter((item) => {
    if (system !== "all" && item.system !== system) return false;
    if (!query) return true;
    return normalize([item.system, item.outlineDx, item.formula].join(" ")).includes(query);
  });
  els.memoryBoard.innerHTML = entries
    .map(
      (item) => `
        <article class="memory-card">
          <div class="memory-meta">${escapeHtml(item.system)} · ${item.outlineNo}</div>
          <h3>${escapeHtml(item.outlineDx)}</h3>
          <p>${escapeHtml(tidyMedicalText(compact(item.formula, "119页未抽到稳定公式，可回到对应病例按五段答案记忆。")))}</p>
        </article>
      `
    )
    .join("");
}

function renderLabBoard() {
  const query = normalize(els.labSearch.value);
  const entries = labReferences.filter((item) => {
    if (!query) return true;
    return normalize([item.abbr, item.name, item.range, item.note].join(" ")).includes(query);
  });
  els.labBoard.innerHTML = entries.length
    ? entries
        .map(
          (item) => `
            <article class="lab-card">
              <h3>${escapeHtml(item.abbr)} · ${escapeHtml(item.name)}</h3>
              <p>
                <span class="lab-range">${escapeHtml(item.range)}</span>
                ${escapeHtml(item.note)}
                <span class="lab-source">${escapeHtml(item.source)}</span>
              </p>
            </article>
          `
        )
        .join("")
    : `<article class="lab-card"><h3>未找到</h3><p>换一个缩写或中文名称试试。</p></article>`;
}

function renderFiveGrid() {
  const item = currentCase();
  const differential = cleanDifferentialItems(item).join("\n");
  els.memorizeCaseLabel.textContent = `${item.id} / 330 · ${compact(item.system)} · 第 ${item.localNo || "-"} 题`;
  const sections = [
    ["初步诊断", cleanDiagnosisText(item.initialDx)],
    ["诊断依据", cleanEvidenceText(item)],
    ["鉴别诊断", differential],
    ["进一步检查", cleanTestsText(testsTextFor(item), item.stem)],
    ["治疗原则", cleanTreatmentItems(item).join("\n")],
  ];
  els.fiveGrid.innerHTML = sections
    .map(([title, body]) => `<section class="five-item"><h3>${title}</h3>${renderTextBlock(body)}</section>`)
    .join("");
}

function showMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  document.querySelectorAll(".practice-panel").forEach((panel) => panel.classList.add("hidden"));
  document.getElementById(`${mode}Mode`).classList.remove("hidden");
}

function setStudyMode(nextMode) {
  studyMode = nextMode;
  const practice = studyMode === "practice";
  els.studyButtons.forEach((button) => button.classList.toggle("active", button.dataset.studyMode === studyMode));
  els.practiceTabs.classList.toggle("hidden", !practice);
  els.stemPanel.classList.toggle("hidden", !practice);
  document.querySelectorAll(".practice-panel").forEach((panel) => panel.classList.toggle("hidden", !practice));
  els.memorizeMode.classList.toggle("hidden", practice);
  if (practice) {
    showMode(mode);
    return;
  }
  renderFiveGrid();
  renderMemoryBoard();
  renderLabBoard();
}

function move(delta) {
  if (!filtered.length) return;
  if (els.practiceMode.value === "random") {
    randomCase();
    return;
  }
  const index = filtered.findIndex((item) => item.id === currentId);
  const next = (index + delta + filtered.length) % filtered.length;
  currentId = filtered[next].id;
  resetVisiblePractice();
  renderCase();
  renderList();
}

function randomCase() {
  if (!filtered.length) return;
  const pool = filtered.length > 1 ? filtered.filter((item) => item.id !== currentId) : filtered;
  const next = pool[Math.floor(Math.random() * pool.length)];
  currentId = next.id;
  resetVisiblePractice();
  renderCase();
  renderList();
}

function resetVisiblePractice() {
  els.diagnosisInput.value = "";
  els.testsInput.value = "";
  treatmentMasked = true;
  differentialShown = false;
  evidenceVisible = false;
  setTestJudgeIdle();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.getElementById("submitDiagnosisBtn").addEventListener("click", submitDiagnosis);
document.getElementById("revealDxBtn").addEventListener("click", revealDiagnosis);
document.getElementById("submitTestsBtn").addEventListener("click", submitTests);
document.getElementById("revealTestsBtn").addEventListener("click", revealTests);
document.getElementById("prevBtn").addEventListener("click", () => move(-1));
document.getElementById("nextBtn").addEventListener("click", () => move(1));
document.getElementById("shuffleBtn").addEventListener("click", randomCase);
document.getElementById("resetBtn").addEventListener("click", () => {
  resetVisiblePractice();
  renderCase();
});
document.getElementById("maskTreatmentBtn").addEventListener("click", () => {
  treatmentMasked = true;
  renderTreatment();
});
document.getElementById("showTreatmentBtn").addEventListener("click", () => {
  treatmentMasked = false;
  renderTreatment();
});
document.getElementById("showDifferentialBtn").addEventListener("click", () => {
  differentialShown = !differentialShown;
  renderDifferential();
});
els.favoriteBtn.addEventListener("click", () => {
  const st = caseStats(currentCase().id);
  st.favorite = !st.favorite;
  saveStats();
  renderCase();
  renderList();
});
els.masteredBtn.addEventListener("click", () => {
  const st = caseStats(currentCase().id);
  st.mastered = !st.mastered;
  saveStats();
  renderCase();
  renderList();
});
document.querySelectorAll(".section-title").forEach((button) => {
  button.addEventListener("click", () => button.closest(".answer-section").classList.toggle("open"));
});
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => showMode(tab.dataset.mode));
});
els.studyButtons.forEach((button) => {
  button.addEventListener("click", () => setStudyMode(button.dataset.studyMode));
});
[els.practiceMode, els.systemFilter, els.queueFilter].forEach((input) => input.addEventListener("change", applyFilters));
els.searchInput.addEventListener("input", applyFilters);
els.memorySearch.addEventListener("input", renderMemoryBoard);
els.labSearch.addEventListener("input", renderLabBoard);
els.diagnosisInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") submitDiagnosis();
});
els.testsInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") submitTests();
});

initFilters();
applyFilters();
