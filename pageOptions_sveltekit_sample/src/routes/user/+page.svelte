<!-- tsの場合には、下記は、以下のように記載する
<script lang="ts"></script> -->
<script>
  // 以下、ts利用例
  // import type { PageData } from './$types';

  // import { onMount } from 'svelte';

  // 以下は、tsの際に必要
  // type User = {
  //   name: string;
  // };

  // 以下は、tsの際に必要
  // let users: User[] = [];

  // let users = [];

  // onMount(async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //   const data = await response.json();
  //   users = data;
  // });

  // 以下、CSRの無効化確認用
  // let count = 0;
  // function increment() {
  //   count += 1;
  // }

  // 「+page.js」ファイルのload関数の中で実行され戻されたデータ(users)は
  // 「+page.svelte」ファイルで、data propsとして受け取ることができます。
  export let data;

  // 以下、ts利用例
    // 「+page.server.js」の場合は、「PageLoad」が「PageServerLoad」
  // export let data: PageLoad;
</script>

<h1>ユーザ一覧</h1>

<!-- 以下、CSRの無効化確認用 -->
<!-- <button on:click={increment}>
  Clicks: {count}
</button> -->

<!-- 以下、SSR無効化確認用
サーバ側でwindowオブジェクトにアクセスしようとするとエラーになる
ssrがfalseの場合は、サーバ上で処理が行われないため、ページ上にブラウザの横幅と高さが表示 -->
<!-- <h1>{window.innerWidth}x{window.innerHeight}</h1> -->

<ul>
  <!-- {#each users as user}
    <li>{user.name}</li>
  {/each} -->

  <!-- 「+page.js」か「+page.server.js」を利用した場合 -->
	<!-- {#each data.users as user}
		<li>{user.name}</li>
	{/each} -->

  <!-- ユーザ一覧のユーザ名をクリックすると、ユーザの詳細ページ(Dynamic Route)を表示させる -->
  {#each data.users as user}
    <li><a href={`/user/${user.id}`}>{user.name}</a></li>
  {/each}
</ul>
