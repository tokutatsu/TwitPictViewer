# TwitPictViewer

## 概要
TwitterアカウントのIDを検索して画像を見ることができるアプリケーションです。  

## 使用方法

### パッケージのインストール
```
npm install
```

### TwitterAPIトークンの配置
リポジトリ直下にtoken.jsonというファイル名で以下のようにトークンを記述してください。
```
{
  "consumer_key": "***",
  "consumer_secret": "***",
  "access_token_key" "***"
  "access_token_secret" "***"
}
```

### アプリケーションの実行
```
node app.js
```

## 使用技術
- node.js 10.15.3
- npm 6.9.0