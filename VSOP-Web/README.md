# VSOP-Web

VSOP ファンクバンドの公開サイト。React + Vite 構成。
デプロイ先：[vsop-web.vercel.app](https://vsop-web.vercel.app)

---

## セットアップ

```bash
npm install
npm run dev
```

---

## Google Sheets GID の設定方法

データは Google Sheets から CSV で取得しています。
各シートの **GID** を `src/config.js` に設定してください。

### GID の確認手順

1. [Google Sheets](https://docs.google.com/spreadsheets/d/1tiks8xZQukiy-xdzaSUzk-90BoKOv397S47i2HFkggU) を開く
2. 設定したいシートタブをクリック
3. ブラウザのURLを確認する
   例: `...#gid=1234567890`
   → `1234567890` が GID

### config.js の編集

```js
// src/config.js
export const GIDS = {
  announce:   '123456789',   // LIVE INFO シートの GID
  highlights: '987654321',   // MOVIE シートの GID
  members:    '111222333',   // MEMBERS シートの GID
};
```

---

## シートの列構成

### announce（LIVE INFO）

| 列名 | 内容 |
|------|------|
| タイトル | ライブのタイトル |
| 日付 | 開催日（例：2025.08.10） |
| 会場 | 会場名 |
| 詳細 | 詳細テキスト |

### highlights（MOVIE）

| 列名 | 内容 |
|------|------|
| タイトル | 動画タイトル |
| YouTubeURL | YouTube の URL |
| 説明文 | 動画の説明（任意） |

### members（MEMBERS）

| 列名 | 内容 |
|------|------|
| 名前 | メンバー名 |
| パート | 担当パート |
| コメント | ひとことコメント |

---

## デプロイ (Vercel)

```bash
npm run build
```

Vercel に接続済みのリポジトリであれば `main` ブランチへのプッシュで自動デプロイ。

---

## 技術スタック

- React 19
- Vite 8
- CSS Modules
- Google Sheets CSV API（認証不要）
