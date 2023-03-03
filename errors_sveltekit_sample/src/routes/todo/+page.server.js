// 以下、ts利用例
// import type { PageServerLoad } from './$types';
// import type { PageServerLoad, Actions } from './$types';

import { prisma } from '../../lib/db';
import { fail } from '@sveltejs/kit';
import { z, ZodError } from 'zod'; // ここは、{ z }でないといけない

// 以下では、複数のActionがある場合に、
// どちらのPOSTリクエストも、defalultの処理が実行されてしまう。
// export const actions = {
//   // defaultプロパティに関数を設定して、引数にrequestを設定
//     // 引数は、元は、RequestEvent(event)が渡される。
//       // その中から、分割代入「const { request } = event」で、requestを設定
// 	default: async ({ request }) => {
//     // POSTリクエストで送信されてきたデータを取得することが
// 		const data = await request.formData();
//     // FormData { [Symbol(state)]: [ { name: 'name', value: 'oyamada' } ] }
// 		console.log(data);

//     // 取得したnameの値を利用してデータベースに追加を
//       // データベースへの追加は、prisma.todo.createメソッドで行うことが
// 		const name = data.get('name');
// 		await prisma.todo.create({
//       // 以下は、オブジェクトリテラルの強化({ name: name })
// 			data: { name }
// 		});
// 	},
// };

// 1つのページに複数のActionがある場合にも対応できるように
// Actionに名前をつけることができる。
export const actions = {
  // 以下、独自のバリデーションを利用した場合
  // create: async ({ request }) => {
  //   console.log('create');
  //   const data = await request.formData();
  //   const name = data.get('name');

  //   // fail関数により、HTTPステータスコードと共にエラーのメッセージと入力したデータを戻すことができる
  //   if (!name) {
  //     return fail(400, { message: 'name is required.' });
  //   } else if (name.length < 3) {
  //     return fail(400, { name, message: 'name must contain 3 charactors' });
  //   }

  //   await prisma.todo.create({
  //     // 以下は、オブジェクトリテラルの強化({ name: name })
  //     data: { name }
  //   });
  // },

  // 以下、zodのバリデーションを利用した場合
  create: async ({ request }) => {
    console.log('create');

    // zodではスキーマを定義してバリデーションを設定します。
    // TodSchemaでは、nameプロパティは文字列で文字列の長さが最低3必要であることを設定
    const TodoSchema = z.object({
      // 以下は、デフォルトmessageを送る場合
      // name: zod.string().min(3),

      // 以下は、日本語に設定した場合
      name: z.string().min(3, { message: '3文字以上入力してください。' }),
    });
    // POSTリクエストから送信されてきたデータは、
    // Object.fromEntriesを利用してオブジェクトとして取り出すことが
      // 例) { name: 'learn SolidJS' }
    const formData = Object.fromEntries(await request.formData());
    try {
      // TodoSchemaのparseメソッドの引数には、オブジェクトを指定します。
        // zodによるバリデーションは、parseメソッドまたはsofrparseメソッドを利用して行うことができます。
      // バリデーションを通過した場合は、引数に指定した値がそのまま戻されます。
      const result = await TodoSchema.parse(formData);
      const { name } = result;
      await prisma.todo.create({
        data: { name }
      });
    // バリデーションに失敗した場合にはエラーthrowされる
    } catch (error) {
      // Zodでthrowされるエラーは、ZodErrorオブジェクトのインスタンスかチェックを行い
      // ZodErrorオブジェクトのインスタンスの場合のみ、エラー設定を
      if (error instanceof ZodError) {
        // errorオブジェクトが持つflattenメソッドで、エラーを取り出します。
          // fieldErrorsを、errorsという変数に格納
        const { fieldErrors: errors } = error.flatten();
        const { name } = formData;
        // エラーは、fail関数でクライアントに戻します。
        return fail(400, { name, errors });
      }
    }
  },
  delete: async ({ request }) => {
    console.log('delete');
    const data = await request.formData();
    const id = Number(data.get('id'));
    await prisma.todo.delete({
      // 以下は、オブジェクトリテラルの強化({ id: id })
      where: { id }
    });
  },
};

export const load = (async () => {
  // findManyメソッド: 複数件取得、条件に一致する全てのレコードを取得(条件は指定しなくても良い??)
	const todos = await prisma.todo.findMany();
	return { todos };
});

// 以下、ts利用例
// 単一のActionがある場合
// export const actions = {
//   default: async ({ request }) => {
//     const data = await request.formData();
//     console.log(data);

//     const name = data.get('name') as string;
//     await prisma.todo.create({
//       data: {
//         name
//       }
//     });
//   }
// } satisfies Actions;

// 複数のActionがある場合
// export const actions = {
//   create: async ({ request }) => {
//     const data = await request.formData();
//     const name = data.get('name') as string;
//     await prisma.todo.create({
//       data: { name }
//     });
//   },
//   delete: async ({ request }) => {
//     console.log('delete');
//     const data = await request.formData();
//     const id = Number(data.get('id'));
//     await prisma.todo.delete({
//       where: { id }
//     });
//   },
// } satisfies Actions;

// export const load = (async () => {
// 	const todos = await prisma.todo.findMany();
// 	return {
// 		todos
// 	};
// }) satisfies PageServerLoad;
