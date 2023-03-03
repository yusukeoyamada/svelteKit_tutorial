// 以下、ts利用例
  // 「+page.js」の場合は、「PageServerLoad」が「PageLoad」
// import type { PageServerLoad } from './$types';

// 引数は、元は、RequestEvent(event)が渡される。
  // その中から、分割代入「const { params, fetch } = event」で、requestを設定
export const load = (async ({ params, fetch }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await response.json();
  return { user };
});

// 以下、ts利用例
  // 「+page.js」の場合は、「PageServerLoad」が「PageLoad」
// export const load = (async ({ params, fetch }) => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
//   const user = await response.json();
//   return {
//     user
//   };
// }) satisfies PageServerLoad;
