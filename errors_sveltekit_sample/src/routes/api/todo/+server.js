import { json } from '@sveltejs/kit';
import { prisma } from '../../../lib/db';
// 以下、ts利用例
// import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
  // 「await request.json()」の出力: { name: 'oyamada2' }
  const { name } = await request.json();

  const todo = await prisma.todo.create({
    // 以下は、オブジェクトリテラルの強化({ name: name })
    data: { name }
  });

  // ヘルパー関数jsonを利用して、JSONとして作成したtodoを戻す
    // ヘルパー関数jsonにより、ResponseのContent-typeのheadersは自動で設定
  return json(todo);

  // 以下が、ヘルパー関数jsonを利用しない場合
  // return new Response(JSON.stringify(todo), {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
});

export function GET() {
  // 以下、意図的にエラーを発生させている
  throw new Error('エラー発生！');

  // 以下は、元々記載されていたもの
  // const number = Math.floor(Math.random() * 6) + 1;
  // return json(number);
}

// 以下、ts利用例
// export const POST = (async ({ request }) => {
//   const { name } = await request.json();
//   const todo = await prisma.todo.create({
//     data: {
//       name
//     }
//   });

//   return json(todo);
// }) satisfies RequestHandler;
