const EDITIONS_PER_BATCH = 2; // 最初は2日分を描画し、スクロールに合わせて過去分を自動追加
let allEditions = [];
let renderedEditionCount = 0;
let hasArchive = false;
let archiveLoaded = false;
let archiveLoading = false;
let editionObserver = null;
let sentinelObserver = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path} (${res.status})`);
  return await res.json();
}

async function loadInitialData() {
  try {
    const latest = await fetchJson("./data/latest.json");
    if (Array.isArray(latest.editions) && latest.editions.length > 0) {
      hasArchive = Boolean(latest.hasArchive);
      return latest;
    }
  } catch (_) {
    // latest.json が未生成の環境では従来の articles.json にフォールバック
  }

  hasArchive = false;
  archiveLoaded = true;
  return await fetchJson("./data/articles.json");
}

async function ensureArchiveLoaded() {
  if (!hasArchive || archiveLoaded || archiveLoading) return;
  archiveLoading = true;
  try {
    const archive = await fetchJson("./data/archive.json");
    if (Array.isArray(archive.editions) && archive.editions.length > 0) {
      const existingLabels = new Set(allEditions.map((e) => e.edition));
      const newEditions = archive.editions.filter(
        (e) => !existingLabels.has(e.edition)
      );
      allEditions = allEditions.concat(newEditions);
    }
    archiveLoaded = true;
  } catch (err) {
    console.warn("Failed to load archive.json:", err);
  } finally {
    archiveLoading = false;
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

  const surface = article.surfaceNews || {};
  const tsukkomi = article.oneLineTsukkomi || {};
  const hp = article.hiddenPerspectives || {};
  const blindspot = hp.dataBlindspot || { title: "", points: [] };
  const beneficiary = hp.beneficiary || null;
  const counter = hp.counterLogic || { title: "", points: [] };
  const takeawayText =
    (article.poll && article.poll.doyaPhrase) ||
    article.dinnerQuestion ||
    "";

  const summaryItems = (surface.summary || [])
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  const blindspotItems = (blindspot.points || [])
    .map((p) => `<li>${escapeHtml(p)}</li>`)
    .join("");

  const beneficiaryBlock =
    beneficiary && Array.isArray(beneficiary.points) && beneficiary.points.length > 0
      ? `
      <div class="perspective-block">
        <div class="perspective-title">${escapeHtml(beneficiary.title || "")}</div>
        <ul class="perspective-list">
          ${beneficiary.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
      </div>`
      : "";

  const counterItems = (counter.points || [])
    .map((p) => `<li>${escapeHtml(p)}</li>`)
    .join("");

  card.innerHTML = `
    <section class="section-surface">
      <div class="card-category">${escapeHtml(article.categoryIcon || "")} ${escapeHtml(article.category || "")}</div>
      <h2 class="surface-headline">${escapeHtml(surface.headline || "")}</h2>
      <ul class="surface-summary">
        ${summaryItems}
      </ul>
    </section>

    <section class="section-tsukkomi">
      <div class="tsukkomi-label">💡 ${escapeHtml(tsukkomi.badge || "ちょっと待って！")}</div>
      <p class="tsukkomi-text">${escapeHtml(tsukkomi.text || "")}</p>
    </section>

    <section class="section-perspectives">
      <div class="perspective-block">
        <div class="perspective-title">${escapeHtml(blindspot.title || "")}</div>
        <ul class="perspective-list">
          ${blindspotItems}
        </ul>
      </div>${beneficiaryBlock}
      <div class="perspective-block">
        <div class="perspective-title">${escapeHtml(counter.title || "")}</div>
        <ul class="perspective-list">
          ${counterItems}
        </ul>
      </div>
    </section>

    <section class="section-takeaway">
      <div class="takeaway-label">💬 視点が変わる一言</div>
      <p class="takeaway-phrase">${escapeHtml(takeawayText)}</p>
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
    divider.innerHTML = `<span class="edition-divider-pill">📅 ${escapeHtml(cleanLabel)}のニュース</span>`;
    section.appendChild(divider);
  }

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "edition-cards";

  (editionObj.articles || []).forEach((article) => {
    try {
      cardsContainer.appendChild(createArticleCard(article));
    } catch (err) {
      console.error("Failed to render article card:", article && article.id, err);
    }
  });

  section.appendChild(cardsContainer);
  return section;
}

async function renderNextBatch() {
  const timelineEl = document.getElementById("timeline");
  if (!timelineEl) return;

  // 最新分（latest.json）の終端に近づいたら archive.json を自動遅延読み込み
  if (renderedEditionCount >= allEditions.length && hasArchive && !archiveLoaded) {
    await ensureArchiveLoaded();
  }

  if (renderedEditionCount >= allEditions.length) return;

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
    (async () => {
      await ensureArchiveLoaded();
      while (renderedEditionCount < allEditions.length) {
        await renderNextBatch();
      }
    })();
  }
}

async function init() {
  const timelineEl = document.getElementById("timeline");
  const editionBadge = document.getElementById("edition-badge");

  try {
    const data = await loadInitialData();
    allEditions = normalizeEditions(data);

    if (allEditions.length > 0 && editionBadge) {
      editionBadge.textContent = (allEditions[0].edition || "")
        .replace("朝刊エディション", "")
        .trim();
    }

    if (timelineEl) {
      timelineEl.innerHTML = "";
    }

    setupScrollObservers();
    await renderNextBatch();
  } catch (err) {
    console.error("Failed to initialize timeline:", err);
    if (timelineEl) {
      timelineEl.innerHTML =
        '<div class="status-message">ニュースの読み込みに失敗しました。ページを再読み込みしてください。</div>';
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
