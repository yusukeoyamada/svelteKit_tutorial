- 「初めてSvelteKitを使い始めた人のための基礎講座」学習用
  - https://reffect.co.jp/svelte/sveltekit
    - 各々のプロジェクトは、基本的に、以下コマンドで作成し、サーバーを立ち上げしている(「myapp」部分がプロジェクト名)。
      - ```npm create svelte@latest myapp```

        ```
        create-svelte version 3.1.0

        ┌  Welcome to SvelteKit!
        │
        ◇  Which Svelte app template?
        │  Skeleton project
        │
        ◇  Add type checking with TypeScript?
        │  No
        │
        ◇  Select additional options
        │  Add ESLint for code linting, Add Prettier for code formatting
        │
        └  Your project is ready!
        ```
      - ```npm install``` (「```cd myapp```」 後に)
      - ```npm run dev```

    - 以下、各セッションごとに対応関係にあるプロジェクトについての仔細
      - (2) SvelteKitのプロジェクトの作成: 「sveltekit_sample」
      - (3) ルーティング: 「routing_sveltekit_sample」
      - (4) 外部リソースからのデータの取得方法(Loading data): 「loadingData_sveltekit_sample」
      - (5) Form Actions: 「formActions_sveltekit_sample」
      - (6) Errorについて: 「errors_sveltekit_sample」
      - (7) Page Optionsの設定: 「pageOptions_sveltekit_sample」
