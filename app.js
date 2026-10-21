const FALLBACK_DATA = {
  updatedAt: "2026-10-21T05:00:00+09:00",
  edition: "10月21日（水）",
  articles: [
    {
      id: "game-time-limit-grades",
      category: "ゲーム・勉強",
      categoryIcon: "🎮",
      surfaceNews: {
        headline: "「スマホゲームは1日1時間まで！」制限した中学生のテスト平均点が12点アップ",
        summary: [
          "ある自治体の調査で、スマホゲームを「1日1時間以内」に制限している生徒は、制限なしの生徒よりテストの平均点が12点高いことが判明。",
          "専門家は「ゲーム時間を減らせば、そのまま勉強時間が増えて成績が上がる」と分析。",
          "地域全体で「ゲーム1日1時間ルール」を推奨する動きが広がっています。"
        ]
      },
      oneLineTsukkomi: {
        badge: "ちょっと待って！",
        text: "「ゲームを減らしたから成績が上がった」って決めつけてない？『順番が逆』や『別の理由』が隠れてるかも。"
      },
      hiddenPerspectives: {
        dataBlindspot: {
          title: "📊 データの死角",
          points: [
            "もともと勉強が好きで塾に通っている子が、結果的にゲーム時間が短いだけかもしれない（原因と結果が逆）。",
            "「家庭のサポート環境」や「塾に通える環境」など、ゲーム以外の『隠れた要因』が成績を上げている可能性が抜けていいる。"
          ]
        },
        counterLogic: {
          title: "🔄 反対側のロジック",
          points: [
            "無理やりスマホを取り上げると、ストレスで集中力が落ちたり、夜中にこっそり遊ぶ『逆効果』が起きやすい。",
            "友達との会話や、ゲームを通じて英語・戦略思考を学ぶチャンスまで減ってしまう副作用がある。"
          ]
        }
      },
      poll: {
        doyaPhrase: "「それ、『ゲームを減らしたから頭が良くなった』んじゃなくて、『もともと勉強してる子がゲームしてない』だけじゃない？」"
      }
    },
    {
      id: "electric-mobility-accidents",
      category: "街・テクノロジー",
      categoryIcon: "🛴",
      surfaceNews: {
        headline: "電動キックボードの事故が去年の「3倍」に急増！危険すぎる乗り物に批判殺到",
        summary: [
          "街中で見かけるシェア型電動キックボードの事故が、去年の同じ時期と比べて「3倍」に増えたことが警察のまとめで分かりました。",
          "SNSでは「こんなに危険な乗り物は今すぐ全面禁止にするべきだ」という声が相次いでいます。",
          "安全対策の強化やルールの厳罰化を求める動きも始まりました。"
        ]
      },
      oneLineTsukkomi: {
        badge: "ちょっと待って！",
        text: "事故の数（分子）だけ見てない？『乗っている人の数（分母）』が何倍に増えたかがスッポリ抜けてる。"
      },
      hiddenPerspectives: {
        dataBlindspot: {
          title: "📊 データの死角",
          points: [
            "もし利用者が「去年の10倍」に増えていた場合、事故の数が3倍になっても『1人あたりの事故率』はむしろ下がっている計算になる。",
            "自転車や原付バイク1万台あたりの事故率と比べずに、『3倍』という数字だけで怖がらせている。"
          ]
        },
        counterLogic: {
          title: "🔄 反対側のロジック",
          points: [
            "全面禁止にすると、バスが減って移動に困っている人や、坂道が多い地域の便利な移動手段まで奪ってしまう。",
            "乗り物自体を禁止するより、「危ない交差点の整備」や「悪質な違反者だけをロックする仕組み」を作る方が合理的。"
          ]
        }
      },
      poll: {
        doyaPhrase: "「事故が3倍って言うけど、乗ってる人が10倍に増えてたら、むしろ安全になってる計算じゃない？」"
      }
    },
    {
      id: "plastic-ban-eco-town",
      category: "環境・ルール",
      categoryIcon: "🌱",
      surfaceNews: {
        headline: "レジ袋・プラ製品を「全面禁止」へ！地球にやさしい未来のエコ都市がスタート",
        summary: [
          "あるモデル都市で、コンビニのレジ袋やプラスチック製ストロー・容器をすべて禁止し、紙や布製品に切り替える条例が可決されました。",
          "推進派は「プラスチックごみをゼロにして地球環境を守る歴史的な一歩だ」と高く評価。",
          "学校給食のストローやスーパーの袋も来月から一斉に廃止される予定です。"
        ]
      },
      oneLineTsukkomi: {
        badge: "ちょっと待って！",
        text: "「プラ禁止＝100%地球にいいこと」が前提になってない？代わりの紙やエコバッグを作るエネルギーは計算に入ってる？"
      },
      hiddenPerspectives: {
        dataBlindspot: {
          title: "📊 データの死角",
          points: [
            "分厚いコットン製エコバッグを1個作る時の環境負荷（水やCO2）は、薄いレジ袋の『数千回分』にあたるという研究データがある。",
            "日本のプラごみの多くはすでに回収・焼却されており、海に流れる原因の多くはポイ捨てや海外からの漂着ごみ。"
          ]
        },
        counterLogic: {
          title: "🔄 反対側のロジック",
          points: [
            "食品のプラスチック包装をなくすと、食べ物がすぐに傷んでしまい『食品ロス（捨てられる食べ物）』が逆に増える副作用がある。",
            "レジ袋がなくなった結果、家庭でゴミ箱にかぶせるための『市販のポリ袋』を買う人が増え、トータルのプラ使用量が減らない現象も起きている。"
          ]
        }
      },
      poll: {
        doyaPhrase: "「プラをなくすのはいいけど、そのせいで食べ物が傷みやすくなって『食品ロス』が増えたら本末転倒じゃない？」"
      }
    }
  ]
};

async function loadArticles() {
  try {
    const res = await fetch("./data/articles.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch articles.json");
    return await res.json();
  } catch (e) {
    return FALLBACK_DATA;
  }
}

function renderTimeline(articles) {
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = "";

  articles.forEach((article) => {
    const card = document.createElement("article");
    card.className = "news-card";

    const summaryItems = article.surfaceNews.summary
      .map((line) => `<li>${line}</li>`)
      .join("");

    const blindspotItems = article.hiddenPerspectives.dataBlindspot.points
      .map((p) => `<li>${p}</li>`)
      .join("");

    const counterItems = article.hiddenPerspectives.counterLogic.points
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

    timelineEl.appendChild(card);
  });
}

async function init() {
  const data = await loadArticles();
  const editionBadge = document.getElementById("edition-badge");
  if (data.edition && editionBadge) {
    editionBadge.textContent = data.edition.replace("朝刊エディション", "").trim();
  }
  renderTimeline(data.articles || []);
}

document.addEventListener("DOMContentLoaded", init);
