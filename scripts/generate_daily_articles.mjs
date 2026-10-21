/**
 * 毎朝5:00に実行される「ウラヨミ！」記事自動生成バッチスクリプト
 *
 * 仕組み:
 * 1. Google News RSS 等から最新の話題・ニュース見出しを取得
 * 2. Gemini API (gemini-2.5-flash) を使い、小中高生が興味を持ちやすく、かつ
 *    「分母の罠」「因果と相関の混同」「副作用（トレードオフ）」を鍛えられる3本を厳選・構造化
 * 3. data/articles.json を更新（GitHub Pages がそのまま最新データで配信）
 *
 * 実行方法:
 *   GEMINI_API_KEY="AIza..." node scripts/generate_daily_articles.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_PATH = path.resolve(process.cwd(), "data/articles.json");

async function fetchTrendingHeadlines() {
  const rssUrl = "https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja";
  try {
    const res = await fetch(rssUrl);
    const xml = await res.text();
    const titles = [...xml.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/g)]
      .map((m) => m[1] || m[2])
      .filter((t) => t && !t.includes("Google ニュース"))
      .slice(0, 20);
    return titles;
  } catch (e) {
    console.warn("RSS取得に失敗したためトピックシードを使用します:", e.message);
    return [];
  }
}

async function generateArticlesWithGemini(headlines) {
  if (!GEMINI_API_KEY) {
    console.error("エラー: 環境変数 GEMINI_API_KEY が設定されていません。");
    process.exit(1);
  }

  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const dow = weekdays[today.getDay()];
  const editionStr = `${month}月${date}日（${dow}）朝刊エディション`;

  const prompt = `
あなたは小中学生向けのクリティカルシンキング育成ニュースアプリ「ウラヨミ！」の編集長です。
以下の最新ニュース見出し候補（または現代の小中高生が関心を持つ身近な社会トピック：スマホ・SNS・学校ルール・ゲーム・環境・街のルール・トレンドなど）から、異なる思考の罠（①因果と相関の混同、②分子だけ見て分母を見ない統計の罠、③片側の善意と副作用・トレードオフ）を学べる3本の記事データをJSON形式で作成してください。

【参考ニュース見出し候補】
${headlines.length > 0 ? headlines.join("\n") : "（直近のSNS規制、AI宿題、キャッシュレス、部活地域移行、環境ルール、新しい乗り物などから選択）"}

【出力JSONスキーマ】
以下のJSON形式のみを出力してください（Markdownコードブロックは不要）。
{
  "updatedAt": "${today.toISOString()}",
  "edition": "${editionStr}",
  "articles": [
    {
      "id": "英数字のユニークID",
      "category": "ゲーム・勉強 / 街・テクノロジー / 環境・ルール 等",
      "categoryIcon": "絵文字1つ",
      "readTime": "15秒〜25秒",
      "publishedAt": "今日 05:00配信",
      "surfaceNews": {
        "sourceLabel": "よくある〇〇ニュース",
        "headline": "一見もっともらしい見出し",
        "summary": ["要約1行目", "要約2行目", "要約3行目"]
      },
      "oneLineTsukkomi": {
        "badge": "ちょっと待って！",
        "text": "何を勝手に前提にしているか・何を隠しているかを1行で鋭く指摘"
      },
      "hiddenPerspectives": {
        "dataBlindspot": {
          "title": "📊 データの死角（〇〇のワナ）",
          "points": ["死角の指摘1", "死角の指摘2"]
        },
        "counterLogic": {
          "title": "🔄 反対側のロジック（副作用・トレードオフ）",
          "points": ["反対ロジック1", "反対ロジック2"]
        }
      },
      "poll": {
        "question": "この記事に1つだけ追加で質問（ツッコミ）をぶつけるならどれ？",
        "options": [
          { "id": "opt1", "label": "質問選択肢1", "angleTag": "視点タグ", "baseVotes": 45 },
          { "id": "opt2", "label": "質問選択肢2", "angleTag": "視点タグ", "baseVotes": 35 },
          { "id": "opt3", "label": "質問選択肢3", "angleTag": "視点タグ", "baseVotes": 20 }
        ],
        "doyaPhrase": "明日クラスで使える1行ドヤ顔フレーズ（「それって〇〇じゃない？」）",
        "doyaTip": "なぜそのツッコミが効くのかの1行解説"
      }
    }
  ]
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API Error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("Gemini APIからテキストが返りませんでした。");
  }

  const parsed = JSON.parse(rawText);
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(parsed, null, 2) + "\n", "utf-8");
  console.log(`✅ ${OUTPUT_PATH} を更新しました（${parsed.articles?.length || 0}本）`);
}

const headlines = await fetchTrendingHeadlines();
await generateArticlesWithGemini(headlines);
