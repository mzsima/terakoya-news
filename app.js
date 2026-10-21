// Fallback data (mirrors data/articles.json so local file:// preview works without CORS)
const FALLBACK_DATA = {
  updatedAt: "2026-10-21T05:00:00+09:00",
  edition: "10月21日（水）朝刊エディション",
  articles: [
    {
      id: "game-time-limit-grades",
      category: "ゲーム・勉強",
      categoryIcon: "🎮",
      readTime: "20秒",
      publishedAt: "今日 05:00配信",
      surfaceNews: {
        sourceLabel: "よくある教育ニュース",
        headline: "「スマホゲームは1日1時間まで！」制限した中学生のテスト平均点が12点アップ",
        summary: [
          "ある自治体の調査で、スマホゲームを「1日1時間以内」に制限している生徒は、制限なしの生徒よりテストの平均点が12点高いことが判明。",
          "専門家は「ゲーム時間を減らせば、そのまま勉強時間が増えて成績が上がる」と分析。",
          "来月から地域全体で「ゲーム1日1時間ルール」を推奨する動きが広がっています。"
        ]
      },
      oneLineTsukkomi: {
        badge: "ちょっと待って！",
        text: "「ゲームを減らしたから成績が上がった」って決めつけてない？『順番が逆』や『別の理由』を隠してるかも！"
      },
      hiddenPerspectives: {
        dataBlindspot: {
          title: "📊 データの死角（因果と相関のワナ）",
          points: [
            "もともと勉強が好きで塾に通っている子が、結果的にゲーム時間が短いだけかも（原因と結果が逆）。",
            "「家庭でルールを話し合える環境」や「学習塾の費用」など、ゲーム以外の『隠れた要因』が成績を上げている可能性がスルーされている。"
          ]
        },
        counterLogic: {
          title: "🔄 反対側のロジック（副作用・トレードオフ）",
          points: [
            "無理やりスマホを取り上げると、ストレスで勉強の集中力が落ちたり、親に隠れて夜中にこっそり遊ぶ『逆効果』が起きやすい。",
            "ゲームでしか繋がれない友達との会話や、英語・戦略思考を学ぶチャンスまでゼロにしてしまうリスクがある。"
          ]
        }
      },
      poll: {
        question: "この記事を書いた人に、1つだけ鋭い質問（ツッコミ）をぶつけるならどれ？",
        options: [
          {
            id: "opt1",
            label: "「ゲームを1時間に減らしたあと、本当にみんなその時間で勉強したの？」",
            angleTag: "因果の検証",
            baseVotes: 46
          },
          {
            id: "opt2",
            label: "「もともと成績がいい子の家を調べただけじゃないの？」",
            angleTag: "隠れた要因",
            baseVotes: 38
          },
          {
            id: "opt3",
            label: "「禁止された子が、代わりに何をしてストレス発散してるか調べた？」",
            angleTag: "副作用の検証",
            baseVotes: 16
          }
        ],
        doyaPhrase: "「それ、『ゲームを減らしたから頭が良くなった』んじゃなくて、『もともと勉強してる子がゲームしてない』だけじゃない？」",
        doyaTip: "「相関関係（同時に起きていること）」と「因果関係（原因と結果）」をごちゃ混ぜにするのは、大人のニュースで一番多いトリック！"
      }
    },
    {
      id: "electric-mobility-accidents",
      category: "街・テクノロジー",
      categoryIcon: "🛴",
      readTime: "15秒",
      publishedAt: "今日 05:00配信",
      surfaceNews: {
        sourceLabel: "よくある社会ニュース",
        headline: "電動キックボードの事故が去年の「3倍」に急増！危険すぎる乗り物に批判殺到",
        summary: [
          "街中で見かけるシェア型電動キックボードの接触事故や転倒が、去年の同じ時期と比べて「3倍」に増えたことが警察のまとめで分かりました。",
          "SNSでは「こんなに危険な乗り物は今すぐ全面禁止にするべきだ」という声が相次いでいます。",
          "安全対策の強化やルールの厳罰化を求める署名活動も始まりました。"
        ]
      },
      oneLineTsukkomi: {
        badge: "ちょっと待って！",
        text: "事故の数（分子）だけ見てない？『乗っている人の数（分母）』が何倍に増えたかがスッポリ抜けてる！"
      },
      hiddenPerspectives: {
        dataBlindspot: {
          title: "📊 データの死角（分母のワナ）",
          points: [
            "もし利用者が「去年の10倍」に増えていた場合、事故の数が3倍になっても『1人あたりの事故率』はむしろ下がっている計算になる。",
            "「自転車」や「原付バイク」1万台あたりの事故率と比べずに、『3倍』というインパクトのある数字だけで怖がらせている。"
          ]
        },
        counterLogic: {
          title: "🔄 反対側のロジック（副作用・トレードオフ）",
          points: [
            "全面禁止にすると、バスが減って移動に困っている人や、坂道が多い地域の便利な移動手段まで奪ってしまう。",
            "乗り物自体を禁止するより、「危ない交差点の整備」や「悪質な違反者だけをロックする仕組み」を作る方が合理的。"
          ]
        }
      },
      poll: {
        question: "この記事に1つだけ追加で質問（ツッコミ）をぶつけるならどれ？",
        options: [
          {
            id: "opt1",
            label: "「去年に比べて、乗ってる人の数（分母）は何倍に増えたの？」",
            angleTag: "分母の罠",
            baseVotes: 54
          },
          {
            id: "opt2",
            label: "「普通の自転車1万台あたりの事故と比べて、どっちが多いの？」",
            angleTag: "比較対象の欠如",
            baseVotes: 31
          },
          {
            id: "opt3",
            label: "「大きなケガにつながった重大事故と、ちょっとした転倒を混ぜてない？」",
            angleTag: "内訳の検証",
            baseVotes: 15
          }
        ],
        doyaPhrase: "「事故が3倍って言うけど、乗ってる人が10倍に増えてたら、むしろ安全になってる計算じゃない？」",
        doyaTip: "「〇倍に急増！」というニュースを見たら、必ず『元の数（分母）はどう変わった？』と聞くだけで、数字のトリックを9割見抜けるよ。"
      }
    },
    {
      id: "plastic-ban-eco-town",
      category: "環境・ルール",
      categoryIcon: "🌱",
      readTime: "25秒",
      publishedAt: "今日 05:00配信",
      surfaceNews: {
        sourceLabel: "よくあるトレンドニュース",
        headline: "レジ袋・プラ製品を「全面禁止」へ！地球にやさしい未来のエコ都市がスタート",
        summary: [
          "あるモデル都市で、コンビニのレジ袋やプラスチック製ストロー・容器をすべて禁止し、紙や布製品に切り替える条例が可決されました。",
          "推進派は「プラスチックごみをゼロにして、ウミガメや地球環境を守る歴史的な一歩だ」と高く評価。",
          "学校給食のストローやスーパーの袋も来月から一斉に廃止される予定です。"
        ]
      },
      oneLineTsukkomi: {
        badge: "ちょっと待って！",
        text: "「プラ禁止＝100%地球にいいこと」が前提になってない？代わりの紙やエコバッグを作るエネルギーは計算に入ってる？"
      },
      hiddenPerspectives: {
        dataBlindspot: {
          title: "📊 データの死角（全体を見ないワナ）",
          points: [
            "分厚いコットン製エコバッグを1個作る時の環境負荷（水やCO2）は、薄いレジ袋の『数千回分』にあたるという研究データが隠れている。",
            "日本のプラごみの多くはすでに回収・焼却（熱リサイクル）されており、海に流れる原因の多くはポイ捨てや海外からの漂着ごみ。"
          ]
        },
        counterLogic: {
          title: "🔄 反対側のロジック（副作用・トレードオフ）",
          points: [
            "食品のプラスチック包装をなくすと、食べ物がすぐに傷んでしまい『食品ロス（捨てられる食べ物）』が逆に増える副作用がある。",
            "レジ袋がなくなった結果、家庭でゴミ箱にかぶせるための『市販のポリ袋』を買う人が増え、トータルのプラ使用量が減らない現象も起きている。"
          ]
        }
      },
      poll: {
        question: "この記事に1つだけ追加で質問（ツッコミ）をぶつけるならどれ？",
        options: [
          {
            id: "opt1",
            label: "「紙袋やエコバッグを作る時のCO2と比べても、本当にエコなの？」",
            angleTag: "トータル比較",
            baseVotes: 42
          },
          {
            id: "opt2",
            label: "「プラ容器をやめたせいで、食べ物の賞味期限が短くなって捨てられてない？」",
            angleTag: "副作用（トレードオフ）",
            baseVotes: 39
          },
          {
            id: "opt3",
            label: "「レジ袋の代わりに、家でゴミ袋を買う量が増えただけじゃない？」",
            angleTag: "隠れた行動変化",
            baseVotes: 19
          }
        ],
        doyaPhrase: "「プラをなくすのはいいけど、そのせいで食べ物が傷みやすくなって『食品ロス』が増えたら本末転倒じゃない？」",
        doyaTip: "「あちらを立てればこちらが立たず（トレードオフ）」。いいことづくめに見えるルールほど、『裏で何が犠牲になるか？』を探すのがプロの視点！"
      }
    }
  ]
};

let allArticles = [];
let currentFilter = "all";

async function loadArticles() {
  try {
    const res = await fetch("./data/articles.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch articles.json");
    const data = await res.json();
    return data;
  } catch (e) {
    return FALLBACK_DATA;
  }
}

function renderTimeline(articles) {
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = "";

  const filtered =
    currentFilter === "all"
      ? articles
      : articles.filter((a) => a.category === currentFilter);

  filtered.forEach((article) => {
    const card = document.createElement("article");
    card.className = "news-card";
    card.dataset.id = article.id;

    const summaryItems = article.surfaceNews.summary
      .map((line) => `<li>${line}</li>`)
      .join("");

    const blindspotItems = article.hiddenPerspectives.dataBlindspot.points
      .map((p) => `<li>${p}</li>`)
      .join("");

    const counterItems = article.hiddenPerspectives.counterLogic.points
      .map((p) => `<li>${p}</li>`)
      .join("");

    const pollOptionsHtml = article.poll.options
      .map(
        (opt) => `
        <button class="poll-btn" data-opt-id="${opt.id}" data-base-votes="${opt.baseVotes}">
          <div class="poll-bar-fill"></div>
          <div class="poll-btn-content">
            <div class="poll-opt-left">
              <span class="poll-angle-tag">#${opt.angleTag}</span>
              <span class="poll-opt-label">${opt.label}</span>
            </div>
            <span class="poll-percent">0%</span>
          </div>
        </button>
      `
      )
      .join("");

    card.innerHTML = `
      <!-- Card Top Meta -->
      <div class="card-meta">
        <div class="meta-left">
          <span class="cat-tag">${article.categoryIcon} ${article.category}</span>
          <span class="source-label">${article.surfaceNews.sourceLabel}</span>
        </div>
        <span class="read-time">⏱ 読了 ${article.readTime}</span>
      </div>

      <!-- 1. 【表のニュース（世間のフレーム）】 -->
      <section class="section-surface">
        <h2 class="surface-headline">${article.surfaceNews.headline}</h2>
        <ul class="surface-summary">
          ${summaryItems}
        </ul>
      </section>

      <!-- 2. 【1行ツッコミ（フレームの罠）】 -->
      <section class="section-tsukkomi">
        <div class="tsukkomi-header">
          <span>🛑 ${article.oneLineTsukkomi.badge}</span>
        </div>
        <p class="tsukkomi-text">${article.oneLineTsukkomi.text}</p>
      </section>

      <!-- 3. 【裏の視点・隠れデータ（ワンタップ切替 / アコーディオン＋タブ）】 -->
      <section class="section-hidden">
        <button class="hidden-toggle-btn" type="button" aria-expanded="false">
          <div class="toggle-left">
            <span>🔍 裏の視点・隠れデータを見る</span>
            <span class="toggle-pill">ワンタップ切替</span>
          </div>
          <span class="toggle-chevron">▼</span>
        </button>
        <div class="hidden-panel">
          <div class="perspective-tabs">
            <button type="button" class="p-tab active" data-view="both">両方見る</button>
            <button type="button" class="p-tab" data-view="blindspot">📊 データの死角</button>
            <button type="button" class="p-tab" data-view="counter">🔄 反対ロジック</button>
          </div>
          <div class="perspective-box blindspot" data-box="blindspot">
            <div class="p-box-title">${article.hiddenPerspectives.dataBlindspot.title}</div>
            <ul class="p-box-list">
              ${blindspotItems}
            </ul>
          </div>
          <div class="perspective-box counter" data-box="counter">
            <div class="p-box-title">${article.hiddenPerspectives.counterLogic.title}</div>
            <ul class="p-box-list">
              ${counterItems}
            </ul>
          </div>
        </div>
      </section>

      <!-- 4. 【ワンクリック・アンケート（ニューロン強化ギミック）】 -->
      <section class="section-poll">
        <div class="poll-header">
          <span class="poll-badge">🧠 1タップ検証</span>
          <h3 class="poll-question">${article.poll.question}</h3>
        </div>
        <div class="poll-options">
          ${pollOptionsHtml}
        </div>

        <!-- 明日クラスで使える1行ドヤ顔フレーズ -->
        <div class="doya-popup">
          <div class="doya-header">
            <span class="doya-badge">😎 明日クラスで使える1行ドヤ顔フレーズ</span>
            <button type="button" class="copy-doya-btn" data-phrase="${article.poll.doyaPhrase}">コピー</button>
          </div>
          <p class="doya-phrase">${article.poll.doyaPhrase}</p>
          <p class="doya-tip">💡 ${article.poll.doyaTip}</p>
        </div>
      </section>
    `;

    // Setup 3. Accordion & Tab interaction
    const toggleBtn = card.querySelector(".hidden-toggle-btn");
    const hiddenPanel = card.querySelector(".hidden-panel");
    toggleBtn.addEventListener("click", () => {
      const isOpen = hiddenPanel.classList.toggle("open");
      toggleBtn.classList.toggle("open", isOpen);
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    const pTabs = card.querySelectorAll(".p-tab");
    const blindspotBox = card.querySelector('[data-box="blindspot"]');
    const counterBox = card.querySelector('[data-box="counter"]');
    pTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        pTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const view = tab.dataset.view;
        blindspotBox.style.display = view === "counter" ? "none" : "block";
        counterBox.style.display = view === "blindspot" ? "none" : "block";
      });
    });

    // Setup 4. One-click Poll + Animated Horizontal Bar + Doya Popup
    const pollOptionsContainer = card.querySelector(".poll-options");
    const pollBtns = card.querySelectorAll(".poll-btn");
    const doyaPopup = card.querySelector(".doya-popup");

    pollBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        pollBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        pollOptionsContainer.classList.add("voted");

        // Calculate updated percentages adding user's vote
        let total = 0;
        const votes = Array.from(pollBtns).map((b) => {
          const v = parseInt(b.dataset.baseVotes, 10) + (b === btn ? 3 : 0);
          total += v;
          return { el: b, v };
        });

        votes.forEach(({ el, v }) => {
          const pct = Math.round((v / total) * 100);
          const fill = el.querySelector(".poll-bar-fill");
          const pctLabel = el.querySelector(".poll-percent");
          fill.style.width = `${pct}%`;
          pctLabel.textContent = `${pct}%`;
        });

        // Show Doya phrase popup immediately
        doyaPopup.classList.add("show");
      });
    });

    // Copy Doya phrase button
    const copyBtn = card.querySelector(".copy-doya-btn");
    copyBtn.addEventListener("click", () => {
      const phrase = copyBtn.dataset.phrase;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phrase);
      }
      showToast();
    });

    timelineEl.appendChild(card);
  });
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function setupCategoryTabs() {
  const pills = document.querySelectorAll(".cat-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.filter;
      renderTimeline(allArticles);
    });
  });
}

async function init() {
  const data = await loadArticles();
  allArticles = data.articles || [];
  const editionBadge = document.getElementById("edition-badge");
  if (data.edition && editionBadge) {
    editionBadge.textContent = data.edition;
  }
  setupCategoryTabs();
  renderTimeline(allArticles);
}

document.addEventListener("DOMContentLoaded", init);
