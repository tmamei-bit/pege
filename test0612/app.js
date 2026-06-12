const FALLBACK_CASES = [
  {
    id: "ai-subscription-check",
    level: "beginner",
    levelLabel: "初級",
    title: "AIサブスク、2個課金から1個へ",
    category: "サブスク整理",
    saving: "約3,000円/月、36,000円/年",
    sourceAuthor: "maco",
    sourceUrl: "https://gemini.google.com/gem/780bf03f99ae",
    summary: "ChatGPT、Gemini、Claudeを併用していた状態から、AIに使い方を整理してもらい、課金を1本に絞った事例です。",
    tryText: "自分が課金しているAIサービスと使い方を入れると、重複・無料代替・一本化の候補を整理できます。共有URLもCSVに入っていますが、内容一致は確認対象です。",
    detail: `【以前】ChatGPT Plusに課金、Gemini、Claudeをずっと併用。さらにClaude Codeを使いたくなり、LLM月2本のサブスク状態に。

そこでClaudeに現状を話して整理してもらったところ、調べものはGemini無料版、画像生成はCanvaなど無料ツール、文章・分析はClaude有料枠に集中する使い分けを提案されました。

結果、ChatGPTを解約してClaudeに一本化。月$20、年間約36,000円の節約につながりました。`,
    demoPlaceholder: "ChatGPT Plus: 月20ドル、文章作成と画像生成で利用\nClaude: 仕事の文章整理とClaude Codeで利用\nGemini: 調べものに利用",
    prompt: `私が現在課金しているAIサービスと使い方を正直に話します。無駄な課金がないか整理して、節約できる方法を具体的に提案してください。

■ 現在課金しているサービス
例）ChatGPT Plus $20/月　など

■ 各サービスの使用目的と頻度
例）毎日、文章作成・画像生成・調べもの

ChatGPT：
Claude：
Gemini：

以下の観点で分析してください。
1. 複数サービスで機能が重複していないか
2. 無料版で代替できるものはないか
3. 画像生成・検索など特定機能のために払っているなら、無料ツールで代替できないか
4. 今の使い方なら、課金を何本に絞れるか
5. 絞った場合、年間でいくらの節約になるか

正直に、私の使い方に合った現実的な提案をしてください。

■ やめたいけどやめられない理由：`,
    steps: [
      "まず、現在課金しているAIサービスを正直に書く。",
      "それぞれの使用目的と頻度を書く。毎日使うのか、特定用途だけなのかを分ける。",
      "重複、無料代替、一本化、年間節約額という観点で整理してもらう。",
      "最後に「やめたいけどやめられない理由」も書くと、現実的な提案になりやすい。"
    ]
  },
  {
    id: "subscription-check",
    level: "beginner",
    levelLabel: "初級",
    title: "サブスク一覧から不要な契約を見つける",
    category: "サブスク整理",
    saving: "年間6万円削減",
    summary: "契約中のサブスクを貼るだけで、利用頻度や重複を整理する事例です。",
    tryText: "サブスク名と月額だけ入れれば試せます。個人情報は入れない前提です。",
    demoPlaceholder: "Netflix 1,490円\n音楽アプリ 1,080円\nクラウド容量 400円",
    prompt: `あなたは家計整理のサポーターです。

以下のサブスク一覧を見て、整理候補を出してください。

サブスク一覧:
- Netflix 1,490円
- 音楽アプリ 1,080円
- クラウド容量 400円

出してほしいこと:
1. 重複していそうなもの
2. 解約候補
3. 残すなら使い切るコツ
4. 年間でいくら見直せそうか`,
    steps: [
      "契約名と月額だけを並べる。",
      "AIに重複、解約候補、残す理由で分類してもらう。",
      "最後に年間換算で見直し額を出してもらう。"
    ]
  },
  {
    id: "english-practice",
    level: "middle",
    levelLabel: "中級",
    title: "英語学習の練習相手を作る",
    category: "自己学習",
    saving: "月1.5万円の学習費代替",
    summary: "自分のレベルと目的を入れて、英作文添削や会話練習の相手を作る事例です。",
    tryText: "目的とレベルを1か所ずつ変えると、自分用の練習相手になります。",
    demoPlaceholder: "目的: 海外旅行で困らない英会話\nレベル: 中学英語はわかる",
    prompt: `あなたはやさしい英語学習コーチです。

目的:
- 海外旅行で困らない英会話

現在のレベル:
- 中学英語はだいたいわかる

やってほしいこと:
1. 今日の練習テーマを1つ出す
2. 日本語で答え方の型を説明する
3. 短い英会話練習を3往復する
4. 私の英語を自然な表現に直す`,
    steps: [
      "目的を先に決める。",
      "自分の現在地を入れる。",
      "添削、会話練習、言い換えなど役割を指定する。"
    ]
  },
  {
    id: "tax-question",
    level: "middle",
    levelLabel: "中級",
    title: "確定申告の疑問を整理する",
    category: "税金・確定申告",
    saving: "相談前の整理時間を短縮",
    summary: "経費や申告の疑問を、税理士に聞く前の質問リストへ整理する事例です。",
    tryText: "判断をAIに任せきるのではなく、確認すべき論点を整理する使い方です。",
    demoPlaceholder: "副業ライターです。カフェ代とPC周辺機器が経費になるか迷っています。",
    prompt: `あなたは確定申告の論点整理を手伝うアシスタントです。
最終判断は税理士や公的情報で確認する前提で、以下を整理してください。

相談内容:
- 副業ライターです
- カフェ代とPC周辺機器が経費になるか迷っています

出してほしいこと:
1. 確認すべきポイント
2. 判断に必要な追加情報
3. 税理士に聞く質問リスト
4. 自分で調べる時の検索キーワード`,
    steps: [
      "AIに最終判断をさせない前提を入れる。",
      "迷っている支出と状況を書く。",
      "質問リスト、追加情報、検索キーワードに分解する。"
    ]
  },
  {
    id: "agent-shopping",
    level: "advanced",
    levelLabel: "上級",
    title: "条件に合う商品比較をAIに任せる",
    category: "日用品・買い物",
    saving: "比較時間をまとめて削減",
    summary: "予算、条件、比較軸を渡して、候補の整理まで任せるエージェント手前の事例です。",
    tryText: "条件、比較軸、最後の出力形式まで指定して、調査作業を任せる感覚を体験します。",
    demoPlaceholder: "予算: 5,000円以内\n商品: ワイヤレスイヤホン\n条件: 通話品質重視",
    prompt: `あなたは買い物比較のリサーチアシスタントです。

探したい商品:
- ワイヤレスイヤホン

条件:
- 予算5,000円以内
- 通話品質を重視
- 口コミで壊れやすいものは避けたい

比較軸:
1. 価格
2. 通話品質
3. バッテリー
4. 注意点

候補を3つに絞り、最後に「どんな人におすすめか」も書いてください。`,
    steps: [
      "商品名だけでなく、予算と譲れない条件を書く。",
      "比較軸を先に指定する。",
      "最後に候補数と判断理由を出してもらう。"
    ]
  }
];

const CASES = Array.isArray(window.AI_SAVINGS_CASES) && window.AI_SAVINGS_CASES.length
  ? window.AI_SAVINGS_CASES
  : FALLBACK_CASES;

const STORAGE_KEY = "ai-practice-step-dashboard-logs";
let activeLevel = "beginner";
let selectedCase = null;

const seedLogs = {
  "ai-subscription-check": [
    { name: "macoさん", note: "ChatGPTを解約してClaudeに一本化。年間約36,000円の節約につながりました。", tweak: "検索はGemini無料版、画像生成はCanvaなど無料枠に分けました。" }
  ],
  "fridge-menu": [
    { name: "Mさん", note: "買い足し1品で夕飯が決まりました。", tweak: "子ども向けに辛くしない条件を足しました。" },
    { name: "Kさん", note: "最初の一言を真似しただけで、献立候補が3つ出ました。", tweak: "調理時間を15分以内にしました。" }
  ],
  "subscription-check": [
    { name: "Sさん", note: "似たサービスが2つあることに気づけました。", tweak: "年間換算で出してもらいました。" }
  ]
};

function renderCases() {
  const list = document.querySelector("[data-case-list]");
  if (!list) return;
  const cases = CASES.filter((item) => item.level === activeLevel);

  list.innerHTML = cases.map((item) => `
    <button class="case-card ${selectedCase && selectedCase.id === item.id ? "is-selected" : ""}" type="button" data-case-id="${item.id}">
      <span class="case-meta">${escapeHtml(item.levelLabel || "")} / ${escapeHtml(item.category || "未分類")}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(getSummary(item))}</span>
      <em>${escapeHtml(getCaseStatus(item))}${item.saving ? ` / ${escapeHtml(item.saving)}` : ""}</em>
    </button>
  `).join("");

  list.querySelectorAll("[data-case-id]").forEach((button) => {
    button.addEventListener("click", () => selectCase(button.dataset.caseId));
  });
}

function selectCase(caseId) {
  selectedCase = CASES.find((item) => item.id === caseId);
  if (!selectedCase) return;

  document.querySelector("[data-overview-panel]").hidden = true;
  const detail = document.querySelector("[data-case-detail]");
  detail.hidden = false;

  document.querySelector("[data-detail-level]").textContent = `${selectedCase.levelLabel} / ${selectedCase.category}`;
  document.querySelector("[data-detail-title]").textContent = selectedCase.title;
  document.querySelector("[data-detail-summary]").textContent = getSummary(selectedCase);
  document.querySelector("[data-detail-story]").innerHTML = buildStoryHtml(selectedCase);
  document.querySelector("[data-detail-try]").textContent = getTryText(selectedCase);
  const usablePrompt = getUsablePrompt(selectedCase);
  const promptBox = document.querySelector("[data-prompt-box]");
  if (usablePrompt) {
    document.querySelector("[data-detail-prompt]").textContent = usablePrompt;
    promptBox.hidden = false;
  } else {
    document.querySelector("[data-detail-prompt]").textContent = "";
    promptBox.hidden = true;
  }
  const linkWrap = document.querySelector("[data-detail-link-wrap]");
  const link = document.querySelector("[data-detail-link]");
  const heroLinkWrap = document.querySelector("[data-detail-link-hero-wrap]");
  const heroLink = document.querySelector("[data-detail-link-hero]");
  const primaryUrl = getPrimaryUrl(selectedCase);
  if (primaryUrl) {
    link.href = primaryUrl;
    link.textContent = getPrimaryUrlLabel(selectedCase, false);
    heroLink.href = primaryUrl;
    heroLink.textContent = getPrimaryUrlLabel(selectedCase, true);
    linkWrap.hidden = false;
    heroLinkWrap.hidden = false;
  } else {
    linkWrap.hidden = true;
    heroLinkWrap.hidden = true;
  }
  document.querySelector("[data-demo-input]").value = selectedCase.demoPlaceholder || buildDemoPlaceholder(selectedCase);
  document.querySelector("[data-demo-result]").textContent = "入力してボタンを押すと、返答イメージが表示されます。";
  document.querySelector("[data-form-case-id]").value = selectedCase.id;
  document.querySelector("[data-detail-steps]").innerHTML = getSteps(selectedCase).map((step, index) => `
    <div class="mini-step">
      <span>${index + 1}</span>
      <p>${escapeHtml(step)}</p>
    </div>
  `).join("");

  renderLogs();
  renderCases();
}

function showOverview() {
  selectedCase = null;
  document.querySelector("[data-overview-panel]").hidden = false;
  document.querySelector("[data-case-detail]").hidden = true;
  renderCases();
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
  if (!list || !selectedCase) return;
  const logs = getLogs(selectedCase.id);
  list.innerHTML = logs.length ? logs.map((log) => `
    <article class="log-item">
      <strong>${escapeHtml(log.name || "匿名さん")}</strong>
      <p>${escapeHtml(log.note || "")}</p>
      ${log.tweak ? `<p><b>変えたところ:</b> ${escapeHtml(log.tweak)}</p>` : ""}
    </article>
  `).join("") : `<p class="empty-log">まだ投稿はありません。</p>`;
}

function initTabs() {
  document.querySelectorAll("[data-level-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeLevel = tab.dataset.levelTab;
      document.querySelectorAll("[data-level-tab]").forEach((item) => item.classList.toggle("is-active", item === tab));
      showOverview();
    });
  });
}

function initDetailActions() {
  document.querySelector("[data-close-detail]").addEventListener("click", showOverview);

  document.querySelector("[data-copy-detail]").addEventListener("click", async (event) => {
    if (!selectedCase) return;
    await navigator.clipboard.writeText(selectedCase.prompt);
    const button = event.currentTarget;
    button.textContent = "コピー済み";
    setTimeout(() => { button.textContent = "コピー"; }, 1400);
  });

  document.querySelector("[data-demo-run]").addEventListener("click", () => {
    const input = document.querySelector("[data-demo-input]").value.trim();
    const result = document.querySelector("[data-demo-result]");
    if (!selectedCase) return;
    const firstLine = input.split(/\n|、|,/).map((text) => text.trim()).filter(Boolean)[0] || "入力内容";
    result.innerHTML = `
      <strong>返答イメージ</strong><br>
      ${escapeHtml(firstLine)}をもとに、条件に合う提案を3つに整理します。<br>
      まずは一番かんたんな案を出し、必要なら「もっと短く」「子ども向け」「年間換算で」などと言い直せます。
    `;
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
    status.textContent = "仮投稿しました。この事例のログに反映されています。";
    setTimeout(() => { status.textContent = ""; }, 2600);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getSummary(item) {
  const text = item.summary || item.detail || item.prompt || "";
  return text.length > 86 ? `${text.slice(0, 86)}...` : text || "詳細は未入力です。";
}

function getTryText(item) {
  const primaryUrl = getPrimaryUrl(item);
  if (primaryUrl && getUsablePrompt(item)) {
    return "まず一番上のURLで完成物を体験します。そのあと下のプロンプトをコピーして、自分の条件に変えて試します。";
  }
  if (primaryUrl) {
    return "まず一番上のURLを開いて、完成物や実例の画面を見ます。プロンプトがない事例は、下の手順書を見ながら自分用に作ります。";
  }
  if (getUsablePrompt(item)) {
    return "共有URLはありません。下のプロンプトをコピーして、自分の状況に置き換えて試します。";
  }
  return "共有URLとプロンプトは未入力です。体験談をもとに、下の手順書から自分用のプロンプトを作ります。";
}

function buildDemoPlaceholder(item) {
  const usablePrompt = getUsablePrompt(item);
  if (usablePrompt) return usablePrompt.split("\n").slice(0, 8).join("\n");
  return item.detail || item.title;
}

function getSteps(item) {
  if (Array.isArray(item.steps) && item.steps.length) return item.steps;
  return buildRecipeSteps(item);
}

function getPrimaryUrl(item) {
  return item.sourceUrl || item.media || "";
}

function getPrimaryUrlLabel(item, isHero) {
  if (item.sourceUrl) return isHero ? "URLを開いて体験する" : "共有URLを開く";
  if (item.media) return isHero ? "実例画面を見て体験する" : "実例の画像・動画を見る";
  return "URLを開く";
}

function getCaseStatus(item) {
  if (item.sourceUrl) return "体験URLあり";
  if (item.media) return "実例URLあり";
  if (getUsablePrompt(item)) return "プロンプトあり";
  return "体験談";
}

function buildStoryHtml(item) {
  const chunks = splitDetail(item.detail || item.summary || "");
  const first = chunks[0] || "この事例は、AIを使って節約や時短につなげた活用例です。";
  const second = chunks[1] || "";
  const promptStatus = getUsablePrompt(item) ? "プロンプトがあるので、そのままコピーして自分用に変えられます。" : "プロンプトは未入力です。下の手順書を見て、目的・条件・出力形式に分けて作ります。";
  const urlStatus = getPrimaryUrl(item) ? "上のボタンから、完成物または実例画面を先に確認できます。" : "完成URLは未入力です。まずは内容を読んで、再現用プロンプトを作る候補です。";

  return `
    <div class="story-grid">
      <article class="story-card">
        <span>体験</span>
        <strong>${escapeHtml(urlStatus)}</strong>
      </article>
      <article class="story-card">
        <span>節約</span>
        <strong>${escapeHtml(item.saving || "削減額は未入力")}</strong>
      </article>
      <article class="story-card">
        <span>真似する材料</span>
        <strong>${escapeHtml(promptStatus)}</strong>
      </article>
    </div>
    <div class="story-body">
      <p>${escapeHtml(first)}</p>
      ${second ? `<p>${escapeHtml(second)}</p>` : ""}
    </div>
  `;
}

function splitDetail(text) {
  return String(text || "")
    .split(/\n{2,}|\n|。/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 4)
    .map((part) => part.endsWith("。") ? part : `${part}。`);
}

function getUsablePrompt(item) {
  const raw = String(item.prompt || "").trim();
  if (!raw) return "";
  const uselessPatterns = [
    /^GemのURLを共有しました$/i,
    /^内容はページまたはZipファイル内に記載$/i,
    /^共有URL/i
  ];
  if (uselessPatterns.some((pattern) => pattern.test(raw))) return "";
  if (raw.length < 18 && !/[：:]/.test(raw)) return "";
  return raw;
}

function buildRecipeSteps(item) {
  const target = item.category || "節約したいこと";
  const tool = item.tool || "AI";
  const detail = item.detail || "";
  const title = item.title || "この事例";
  const saving = item.saving || "削減したい金額";
  const hasUrl = Boolean(getPrimaryUrl(item));
  const hasPrompt = Boolean(getUsablePrompt(item));

  const firstAsk = inferFirstAsk(item);
  const conditions = inferConditions(item);

  const steps = [];
  if (hasUrl) {
    steps.push(`最初にURLを開いて、「何を入力すると、何が返ってくるのか」だけ確認します。完成物を先に触ると、作りたい形が見えます。`);
  }
  steps.push(`まずAIに雑に頼むなら「${firstAsk}」で始めます。最初からきれいなプロンプトにしなくて大丈夫です。`);
  steps.push(`次に条件を足します。今回なら「${conditions.join("」「")}」を入れると、${target}の事例として使いやすくなります。`);
  steps.push(`最後に出力形式を決めます。「比較表」「おすすめ順」「削減額」「次にやること」のように、見て判断できる形で出してもらいます。`);
  if (hasPrompt) {
    steps.push(`下のプロンプトをコピーして、サービス名・金額・使い方など自分の情報に置き換えます。`);
  } else {
    steps.push(`プロンプト本文がない事例なので、上の考え方を使って「目的」「条件」「出力形式」の3つに分けて自分で作ります。`);
  }
  steps.push(`試した結果を「やってみた」に投稿します。投稿が増えるほど、この事例が本当に再現できるか判断しやすくなります。`);
  return steps;
}

function inferFirstAsk(item) {
  const title = item.title || "";
  const category = item.category || "";
  if (/サブスク/.test(category + title)) return "今払っているサブスクを整理して、やめられそうなものを教えて";
  if (/食費|日用品|献立|調理/.test(category + title)) return "今あるものだけで節約できる方法を考えて";
  if (/保険|通信|Wi-Fi|スマホ/.test(category + title)) return "今の契約が高すぎないか、見直しポイントを教えて";
  if (/塾|学習|英語|宿題|自己学習/.test(category + title)) return "今の学習をAIでサポートする方法を考えて";
  if (/税金|確定申告/.test(category + title)) return "確定申告前に確認すべきことを整理して";
  return `${title}を自分でも再現できるように手順を考えて`;
}

function inferConditions(item) {
  const category = item.category || "";
  const saving = item.saving || "";
  const base = [];
  if (saving) base.push(`目安の削減額は${saving}`);
  if (/サブスク/.test(category)) base.push("今契約しているサービス名と月額を書く", "使っている頻度を書く", "残したい理由も書く");
  else if (/食費|日用品/.test(category)) base.push("家にあるものを書く", "買い足しなしで考える", "無理なく続く案にする");
  else if (/保険|通信/.test(category)) base.push("現在の契約内容を書く", "解約金や家族割も確認する", "安さだけで判断しない");
  else if (/塾|自己学習/.test(category)) base.push("今のレベルを書く", "苦手なところを書く", "親や本人が続けられる量にする");
  else base.push("今の状況を書く", "困っていることを書く", "判断しやすい形で出してもらう");
  return base.slice(0, 4);
}

function initFromUrl() {
  const params = new URLSearchParams(location.search);
  const caseId = params.get("case");
  const item = CASES.find((entry) => entry.id === caseId);
  if (!item) return;
  activeLevel = item.level;
  document.querySelectorAll("[data-level-tab]").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.levelTab === activeLevel);
  });
  selectCase(item.id);
}

initTabs();
initDetailActions();
renderCases();
initFromUrl();
