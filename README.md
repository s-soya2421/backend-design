# backend-design

バックエンド設計の学習用リポジトリです。現在はデザインパターンのサンプルを含みます。
パッケージ管理は `pnpm` を前提にしています。

## Structure

```
design-pattern/
  hexagonal-architecture/
```

## Projects

### Hexagonal Architecture (TypeScript)

Hexagonal Architecture（Ports and Adapters）の最小バックエンド例です。

- Path: `design-pattern/hexagonal-architecture`
- 詳細: `design-pattern/hexagonal-architecture/README.md`

## Quick Start

```bash
pnpm install
pnpm dev:hex
```

## Scripts

- `pnpm dev:hex`: Hexagonal Architecture サンプルを起動
- `pnpm build:hex`: ビルド
- `pnpm start:hex`: ビルド済みの起動

## Notes

- 追加のサンプルを増やす場合は `design-pattern/` 配下にプロジェクトを追加してください。
