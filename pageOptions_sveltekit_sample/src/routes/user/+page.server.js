// 以下、ts利用例
  // 「+page.js」の場合は、「PageServerLoad」が「PageLoad」
// import type { PageServerLoad } from './$types';

// 以下、ts利用例
// type User = {
// 	id: number;
// 	name: string;
// };

// prerenderのオプションを使って、Prerenderingの有効化
// export const prerender = true;

// ssrオプションを使って、SSRの無効化
  // SSRはデフォルトではtrueなので、ssrのオプションを設定しない場合は、SSRは有効化されている為
// export const ssr = false;

// csrオプションを使って、CSRの無効化
  // CSRはデフォルトではtrueなので、csrのオプションを設定しない場合は、CSRは有効化されている為
// export const csr = false;

// コンポーネント(「+page.svelte」と「「+layout.svelte」」)がrenderされる前に
// データを取得する為に、load 関数を定義
  // 引数は、元は、RequestEvent(event)が渡される。
    // その中から、分割代入「const { fetch } = event」で、requestを設定
export const load = (async ({ fetch }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return { users };
});

// 以下、ts利用例
  // 「+page.js」の場合は、「PageServerLoad」が「PageLoad」
// export const load = (async ({ fetch }) => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const users = await response.json();
//   return {
//     users
//   };
// }) satisfies PageServerLoad;
