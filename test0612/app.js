const CASES = Array.isArray(window.AI_SAVINGS_CASES) ? window.AI_SAVINGS_CASES : [];
const STORAGE_KEY = "ai-savings-test0612-logs";
const LEVELS = {
  beginner: "初級",
  middle: "中級",
  advanced: "上級"
};

let activeLevel = "beginner";
let selectedCase = null;

const seedLogs = {
  "case-13": [
    {
      name: "macoさん",
      note: "調理家電を買う前に、自分の生活で本当に使うか確認できました。",
      tweak: "直近1週間の自炊回数と、洗い物が苦手なことを条件に入れました。"
    }
  ],
  "case-14": [
    {
      name: "macoさん",
      note: "AIサブスクの役割が重なっていることに気づき、1本化できました。",
      tweak: "画像生成と検索を無料ツールで代替できるかも確認しました。"
    }
  ]
};

function init() {
  document.querySelector("[data-total-count]").textContent = CASES.length;
  renderCounts();
  initTabs();
  initDetailActions();
  renderCards();
  initFromUrl();
}

function renderCounts() {
  Object.keys(LEVELS).forEach((level) => {
    const count = CASES.filter((item) => item.level === level).length;
    document.querySelectorAll(`[data-count="${level}"], [data-count-main="${level}"]`).forEach((target) => {
      target.textContent = count;
    });
  });
}

function initTabs() {
  document.querySelectorAll("[data-level-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeLevel = tab.dataset.levelTab;
      selectedCase = null;
      document.querySelector("[data-case-detail]").hidden = true;
      syncActiveTabs();
      renderCards();
      renderDashboardList();
    });
  });
}

function syncActiveTabs() {
  document.querySelectorAll("[data-level-tab]").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.levelTab === activeLevel);
      });
}

function renderCards() {
  const grid = document.querySelector("[data-case-grid]");
  const items = CASES.filter((item) => item.level === activeLevel);

  grid.innerHTML = items.map((item) => {
    const primaryUrl = getPrimaryUrl(item);
    const hasPrompt = Boolean(getUsablePrompt(item));
    return `
      <button class="case-card ${selectedCase?.id === item.id ? "is-selected" : ""}" type="button" data-case-id="${escapeHtml(item.id)}">
        <span class="case-card-meta">${escapeHtml(item.levelLabel || LEVELS[item.level])} / ${escapeHtml(item.category || "未分類")} / ${escapeHtml(item.tool || "AI")}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <span class="case-card-summary">${escapeHtml(getSummary(item, 92))}</span>
        <span class="saving-amount">${escapeHtml(item.saving || "削減目安を確認")}</span>
        <span class="card-tags">
          <em>${primaryUrl ? "URLで体験" : "手順で再現"}</em>
          ${hasPrompt ? "<em>プロンプトあり</em>" : ""}
        </span>
        <span class="card-action">試してみる</span>
      </button>
    `;
  }).join("");

  grid.querySelectorAll("[data-case-id]").forEach((card) => {
    card.addEventListener("click", () => selectCase(card.dataset.caseId, true));
  });
  renderDashboardList();
}

function renderDashboardList() {
  const list = document.querySelector("[data-dashboard-list]");
  if (!list) return;
  const items = CASES.filter((item) => item.level === activeLevel);
  list.innerHTML = items.map((item) => `
    <button class="dashboard-case ${selectedCase?.id === item.id ? "is-selected" : ""}" type="button" data-dashboard-case-id="${escapeHtml(item.id)}">
      <span>${escapeHtml(item.category || "未分類")} / ${escapeHtml(item.tool || "AI")}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <em>${escapeHtml(item.saving || "削減目安を確認")}</em>
    </button>
  `).join("");

  list.querySelectorAll("[data-dashboard-case-id]").forEach((button) => {
    button.addEventListener("click", () => {
      closeDashboard();
      selectCase(button.dataset.dashboardCaseId, true);
    });
  });
}

function selectCase(caseId, shouldScroll) {
  const item = CASES.find((entry) => entry.id === caseId);
  if (!item) return;
  selectedCase = item;
  activeLevel = item.level;

  document.querySelectorAll("[data-level-tab]").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.levelTab === activeLevel);
  });
  renderCards();

  const detail = document.querySelector("[data-case-detail]");
  detail.hidden = false;
  document.querySelector("[data-detail-level]").textContent = `${item.levelLabel || LEVELS[item.level]} / ${item.category || "未分類"} / ${item.tool || "AI"}`;
  document.querySelector("[data-detail-title]").textContent = item.title;
  document.querySelector("[data-detail-summary]").textContent = getSummary(item, 180);
  document.querySelector("[data-detail-saving]").textContent = item.saving || "事例内で確認";
  document.querySelector("[data-detail-try]").textContent = getTryText(item);
  document.querySelector("[data-detail-story]").innerHTML = buildStoryHtml(item);
  document.querySelector("[data-detail-steps]").innerHTML = buildRecipeSteps(item).map((step, index) => `
    <div class="mini-step">
      <span>${index + 1}</span>
      <p>${escapeHtml(step)}</p>
    </div>
  `).join("");

  const link = document.querySelector("[data-detail-link]");
  const primaryUrl = getPrimaryUrl(item);
  if (primaryUrl) {
    link.href = primaryUrl;
    link.textContent = item.sourceUrl ? "URLを開いて体験する" : "実例画面を見て体験する";
    link.hidden = false;
  } else {
    link.hidden = true;
  }

  const usablePrompt = getUsablePrompt(item);
  const promptBox = document.querySelector("[data-prompt-box]");
  if (usablePrompt) {
    promptBox.hidden = false;
    document.querySelector("[data-detail-prompt]").textContent = usablePrompt;
  } else {
    promptBox.hidden = true;
    document.querySelector("[data-detail-prompt]").textContent = "";
  }

  document.querySelector("[data-form-case-id]").value = item.id;
  renderLogs();
  history.replaceState(null, "", `?case=${encodeURIComponent(item.id)}#manual`);

  if (shouldScroll) {
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function initDetailActions() {
  const toggle = document.querySelector("[data-dashboard-toggle]");
  const dashboard = document.querySelector("[data-dashboard]");
  const scrim = document.querySelector("[data-dashboard-scrim]");
  toggle.addEventListener("click", () => {
    const isOpen = !dashboard.hidden;
    if (isOpen) closeDashboard();
    else openDashboard();
  });
  document.querySelector("[data-dashboard-close]").addEventListener("click", closeDashboard);
  scrim.addEventListener("click", closeDashboard);

  document.querySelector("[data-copy-detail]").addEventListener("click", async (event) => {
    const text = document.querySelector("[data-detail-prompt]").textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    const button = event.currentTarget;
    button.textContent = "コピーしました";
    setTimeout(() => { button.textContent = "プロンプトをコピー"; }, 1400);
  });

  document.querySelector("[data-practice-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!selectedCase) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    saveLog(selectedCase.id, {
      name: data.get("name") || "匿名さん",
      note: data.get("note") || "",
      tweak: data.get("tweak") || "",
      createdAt: new Date().toISOString()
    });
    form.reset();
    document.querySelector("[data-form-case-id]").value = selectedCase.id;
    renderLogs();
    const status = form.querySelector("[data-form-status]");
    status.textContent = "👏 投稿しました。この事例の「やってみた人」に反映されています。";
    setTimeout(() => { status.textContent = ""; }, 3200);
  });
}

function openDashboard() {
  document.querySelector("[data-dashboard]").hidden = false;
  document.querySelector("[data-dashboard-scrim]").hidden = false;
  document.querySelector("[data-dashboard-toggle]").setAttribute("aria-expanded", "true");
  document.body.classList.add("dashboard-open");
}

function closeDashboard() {
  document.querySelector("[data-dashboard]").hidden = true;
  document.querySelector("[data-dashboard-scrim]").hidden = true;
  document.querySelector("[data-dashboard-toggle]").setAttribute("aria-expanded", "false");
  document.body.classList.remove("dashboard-open");
}

function getSavedLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLog(caseId, log) {
  const logs = getSavedLogs();
  logs[caseId] = logs[caseId] || [];
  logs[caseId].unshift(log);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function getLogs(caseId) {
  const saved = getSavedLogs();
  return [...(saved[caseId] || []), ...(seedLogs[caseId] || [])];
}

function renderLogs() {
  const list = document.querySelector("[data-log-list]");
  if (!selectedCase) return;
  const logs = getLogs(selectedCase.id);
  list.innerHTML = logs.length ? logs.map((log) => `
    <article class="log-item">
      <strong>${escapeHtml(log.name || "匿名さん")}</strong>
      <p>${escapeHtml(log.note || "")}</p>
      ${log.tweak ? `<p><b>変えたところ:</b> ${escapeHtml(log.tweak)}</p>` : ""}
    </article>
  `).join("") : `<p class="empty-log">まだ投稿はありません。最初の「やってみた」を残せます。</p>`;
}

function getSummary(item, length = 100) {
  const text = String(item.detail || item.prompt || item.howto || "").replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length)}...` : text || "内容を確認しながら、自分用に作り直せる事例です。";
}

function getTryText(item) {
  const primaryUrl = getPrimaryUrl(item);
  if (primaryUrl && getUsablePrompt(item)) {
    return "まず上のボタンから完成物や実例画面を開きます。その後、下のプロンプトをコピーして、自分の条件に置き換えて試します。";
  }
  if (primaryUrl) {
    return "まず上のボタンから完成物や実例画面を開きます。どんな入力をすると何が返ってくるのかを見てから、下の手順で自分用に再現します。";
  }
  if (getUsablePrompt(item)) {
    return "共有URLはありません。下のプロンプトをコピーして、サービス名・金額・家族構成などを自分用に置き換えて試します。";
  }
  return "共有URLとプロンプトは未入力です。事例の内容をもとに、目的・条件・出力形式に分けて自分用の依頼文を作ります。";
}

function buildStoryHtml(item) {
  const detailParts = splitText(item.detail || "");
  const firstAsk = inferFirstAsk(item);
  const promptStatus = getUsablePrompt(item)
    ? "そのままコピーできるプロンプトがあります。最初は丸写しで試し、次に自分の条件だけ変えます。"
    : "完成プロンプトは未整備です。代わりに、目的・条件・出力形式へ分解して再現します。";
  const urlStatus = getPrimaryUrl(item)
    ? "完成物または実例画面を先に見られます。初心者はここで完成イメージをつかめます。"
    : "実物URLは未入力です。事例文から、どんな完成物を作りたいかを先に言語化します。";

  return `
    <div class="story-grid">
      <article>
        <span>体験</span>
        <strong>${escapeHtml(urlStatus)}</strong>
      </article>
      <article>
        <span>最初の一言</span>
        <strong>${escapeHtml(firstAsk)}</strong>
      </article>
      <article>
        <span>真似する材料</span>
        <strong>${escapeHtml(promptStatus)}</strong>
      </article>
    </div>
    <div class="story-body">
      ${detailParts.map((part) => `<p>${escapeHtml(part)}</p>`).join("")}
    </div>
  `;
}

function buildRecipeSteps(item) {
  const steps = [];
  if (getPrimaryUrl(item)) {
    steps.push("完成物を先に開いて、どんな画面・返答・入力欄があるかを確認します。ここでゴールを見てから作り始めます。");
  }
  steps.push(`最初は「${inferFirstAsk(item)}」くらいの短い一言でAIに相談します。きれいなプロンプトから始めなくて大丈夫です。`);
  steps.push(`次に条件を足します。例: ${inferConditions(item).join(" / ")}。条件を足すほど、自分の生活に合った返答になります。`);
  steps.push("最後に出力形式を指定します。「比較表」「チェックリスト」「一問一答」「今日やること3つ」のように、見て動ける形にします。");
  if (getUsablePrompt(item)) {
    steps.push("下のプロンプトをコピーし、サービス名・金額・学年・家族構成など、自分に関係する部分だけ置き換えます。");
  } else {
    steps.push("プロンプト本文がない事例は、上の流れを使って「目的」「条件」「出力形式」の3点から自分で組み立てます。");
  }
  steps.push("試してズレたら「もっと短く」「子ども向けに」「月額で比較して」など、1つずつ言い直します。ズレを直すところまでが練習です。");
  return steps;
}

function inferFirstAsk(item) {
  const text = `${item.title || ""} ${item.category || ""}`;
  if (/サブスク/.test(text)) return "今払っているサブスクを整理して、やめられそうなものを教えて";
  if (/食費|日用品|献立|家計/.test(text)) return "今あるものだけで、無駄なく節約できる方法を考えて";
  if (/保険|通信|Wi-Fi|スマホ/.test(text)) return "今の固定費が高すぎないか、見直すポイントを教えて";
  if (/塾|家庭教師|学習|英語|宿題/.test(text)) return "家でできる学習サポートをAIで作りたい";
  if (/税金|確定申告/.test(text)) return "申告前に確認すべきことを、初心者にも分かるように整理して";
  return `${item.title}を自分でも作れるように手順を教えて`;
}

function inferConditions(item) {
  const text = `${item.title || ""} ${item.category || ""}`;
  const conditions = [];
  if (item.saving) conditions.push(`削減目安は${item.saving}`);
  if (/サブスク/.test(text)) conditions.push("月額と利用頻度を入れる", "継続・解約候補・保留に分ける");
  else if (/食費|日用品|献立|家計/.test(text)) conditions.push("家にあるものを入れる", "買い足しを減らす", "続けられる案にする");
  else if (/保険|通信|Wi-Fi|スマホ/.test(text)) conditions.push("今の契約内容を入れる", "安さだけで判断しない", "確認リストを出す");
  else if (/塾|家庭教師|学習|英語|宿題/.test(text)) conditions.push("学年やレベルを入れる", "親が教えなくても確認できる形にする");
  else conditions.push("今の状況を入れる", "困っていることを書く", "次にやることを出してもらう");
  return conditions.slice(0, 4);
}

function getPrimaryUrl(item) {
  return item.sourceUrl || item.media || "";
}

function getUsablePrompt(item) {
  const raw = String(item.prompt || "").trim();
  if (!raw) return "";
  const useless = [
    /^GemのURLを共有しました$/i,
    /^内容はページまたはZipファイル内に記載/i,
    /^共有URL/i
  ];
  if (useless.some((pattern) => pattern.test(raw))) return "";
  if (raw.length < 18) return "";
  return raw;
}

function splitText(text) {
  return String(text || "")
    .split(/\n{2,}|\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function initFromUrl() {
  const params = new URLSearchParams(location.search);
  const caseId = params.get("case");
  const item = CASES.find((entry) => entry.id === caseId);
  if (item) selectCase(item.id, false);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

init();
