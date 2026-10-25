const FALLBACK_DATA = {
  updatedAt: "2026-10-25T10:03:00+09:00",
  edition: "10月25日（日）",
  editions: [
    {
      updatedAt: "2026-10-25T10:03:00+09:00",
      edition: "10月25日（日）",
      articles: [
        {
          id: "classical-music-bgm-grades",
          category: "学習・データ",
          categoryIcon: "🎧",
          surfaceNews: {
            headline: "「勉強中に『集中力アップBGM・自然音』を流す子は成績が良い！」調査結果から作業用プレイリストが小中高生に大流行",
            summary: [
              "学習アプリの調査で、普段の勉強中に「雨の音（環境音）やクラシック音楽」を流している生徒は、無音で勉強する生徒よりも学習時間が長く、テストの平均点も高いという結果が発表されました。",
              "これを受け、「聴くだけで脳が集中モードになる勉強用BGM」の配信や専用イヤホンが人気を集めています。",
              "「まずは形から勉強部屋の音楽環境を整えよう」という特集も広がっています。"
            ]
          },
          oneLineTsukkomi: {
            badge: "ちょっと待って！",
            text: "「BGMを流したから頭が良くなった」の？それとも『自分の集中できる環境を工夫している意欲の高い子』がBGMを使っているだけ？"
          },
          hiddenPerspectives: {
            dataBlindspot: {
              title: "📊 データの死角（因果と相関の混同）",
              points: [
                "環境音やクラシックを選んでいる層は、そもそも「スマホの通知や歌詞のある曲だと集中が切れる」と自分で気づき、学習環境をコントロールしている自律性の高い生徒が多い（隠れた前提条件）。",
                "また、暗記や長文読解のときは「どんな音楽でも脳の言語処理メモリ（ワーキングメモリ）を奪うため、無音の方が定着率が高い」という認知心理学の実験結果が平均値の裏で消えている。"
              ]
            },
            counterLogic: {
              title: "🔍 構造の裏側・副作用",
              points: [
                "「BGMさえ流せば集中できる」と誤解して、お気に入りのJ-POPや動画の音声を流しながら勉強すると、脳は音楽と文字の間で高速の切り替え（マルチタスク）を強いられ、かえって疲れやすくなる。",
                "音楽配信サービスやイヤホンメーカーにとっては「勉強中もずっと再生し続けてもらう」方が再生回数や売上が伸びるため、都合の良いデータだけが強調されやすい。"
              ]
            }
          },
          poll: {
            doyaPhrase: "「『勉強用BGMを流すと成績が上がる』って言うけど、音楽のおかげで頭が良くなったんじゃなくて、そもそも『スマホの誘惑を断って集中環境を作れる子』が環境音を選んでるだけじゃない？」"
          }
        }
      ]
    }
  ]
};

const EDITIONS_PER_BATCH = 2; // 最初は2日分（6記事）を描画し、スクロールに合わせて過去分を自動追加
let allEditions = [];
let renderedEditionCount = 0;
let editionObserver = null;
let sentinelObserver = null;

async function loadArticles() {
  try {
    const res = await fetch("./data/articles.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch articles.json");
    return await res.json();
  } catch (e) {
    return FALLBACK_DATA;
  }
}

function normalizeEditions(data) {
  if (Array.isArray(data.editions) && data.editions.length > 0) {
    return data.editions;
  }
  if (Array.isArray(data.articles) && data.articles.length > 0) {
    return [
      {
        updatedAt: data.updatedAt || "",
        edition: data.edition || "",
        articles: data.articles
      }
    ];
  }
  return [];
}

function createArticleCard(article) {
  const card = document.createElement("article");
  card.className = "news-card";

  const summaryItems = (article.surfaceNews.summary || [])
    .map((line) => `<li>${line}</li>`)
    .join("");

  const blindspotItems = (article.hiddenPerspectives.dataBlindspot.points || [])
    .map((p) => `<li>${p}</li>`)
    .join("");

  const counterItems = (article.hiddenPerspectives.counterLogic.points || [])
    .map((p) => `<li>${p}</li>`)
    .join("");

  card.innerHTML = `
    <section class="section-surface">
      <div class="card-category">${article.categoryIcon || ""} ${article.category}</div>
      <h2 class="surface-headline">${article.surfaceNews.headline}</h2>
      <ul class="surface-summary">
        ${summaryItems}
      </ul>
    </section>

    <section class="section-tsukkomi">
      <div class="tsukkomi-label">💡 ${article.oneLineTsukkomi.badge}</div>
      <p class="tsukkomi-text">${article.oneLineTsukkomi.text}</p>
    </section>

    <section class="section-perspectives">
      <div class="perspective-block">
        <div class="perspective-title">${article.hiddenPerspectives.dataBlindspot.title}</div>
        <ul class="perspective-list">
          ${blindspotItems}
        </ul>
      </div>
      <div class="perspective-block">
        <div class="perspective-title">${article.hiddenPerspectives.counterLogic.title}</div>
        <ul class="perspective-list">
          ${counterItems}
        </ul>
      </div>
    </section>

    <section class="section-takeaway">
      <div class="takeaway-label">💬 視点が変わる一言</div>
      <p class="takeaway-phrase">${article.poll.doyaPhrase}</p>
    </section>
  `;

  return card;
}

function createEditionSection(editionObj, index) {
  const section = document.createElement("section");
  section.className = "edition-group";
  const cleanLabel = (editionObj.edition || "").replace("朝刊エディション", "").trim();
  section.dataset.edition = cleanLabel;

  // 2日目（昨日）以降の先頭には、スクロール中にひと目でわかる日付区切りを表示
  if (index > 0) {
    const divider = document.createElement("div");
    divider.className = "edition-divider";
    divider.innerHTML = `<span class="edition-divider-pill">📅 ${cleanLabel}のニュース</span>`;
    section.appendChild(divider);
  }

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "edition-cards";

  (editionObj.articles || []).forEach((article) => {
    cardsContainer.appendChild(createArticleCard(article));
  });

  section.appendChild(cardsContainer);
  return section;
}

function renderNextBatch() {
  const timelineEl = document.getElementById("timeline");
  if (!timelineEl || renderedEditionCount >= allEditions.length) return;

  const nextSlice = allEditions.slice(
    renderedEditionCount,
    renderedEditionCount + EDITIONS_PER_BATCH
  );

  nextSlice.forEach((editionObj, i) => {
    const globalIndex = renderedEditionCount + i;
    const section = createEditionSection(editionObj, globalIndex);
    timelineEl.appendChild(section);
    if (editionObserver) {
      editionObserver.observe(section);
    }
  });

  renderedEditionCount += nextSlice.length;
}

function setupScrollObservers() {
  const editionBadge = document.getElementById("edition-badge");
  const sentinel = document.getElementById("scroll-sentinel");

  // スクロール位置に合わせて上部の日付バッジを現在読んでいる日の日付に連動
  if ("IntersectionObserver" in window && editionBadge) {
    editionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.edition) {
            editionBadge.textContent = entry.target.dataset.edition;
          }
        });
      },
      {
        rootMargin: "-15% 0px -75% 0px",
        threshold: 0
      }
    );
  }

  // 下端が近づいたら過去のアーカイブを自動で継ぎ足す（無限スクロール）
  if ("IntersectionObserver" in window && sentinel) {
    sentinelObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          renderNextBatch();
        }
      },
      {
        rootMargin: "0px 0px 600px 0px"
      }
    );
    sentinelObserver.observe(sentinel);
  } else {
    // IntersectionObserver非対応環境では全件一括描画
    while (renderedEditionCount < allEditions.length) {
      renderNextBatch();
    }
  }
}

async function init() {
  const data = await loadArticles();
  allEditions = normalizeEditions(data);

  const editionBadge = document.getElementById("edition-badge");
  if (allEditions.length > 0 && editionBadge) {
    editionBadge.textContent = (allEditions[0].edition || "")
      .replace("朝刊エディション", "")
      .trim();
  }

  const timelineEl = document.getElementById("timeline");
  if (timelineEl) {
    timelineEl.innerHTML = "";
  }

  setupScrollObservers();
  renderNextBatch();
}

document.addEventListener("DOMContentLoaded", init);
