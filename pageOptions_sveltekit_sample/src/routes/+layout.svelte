<script>
  // storeがもつpageを利用して、現在アクセス中のページのURLを取得することができます
  import { page } from '$app/stores';

  // pageオブジェクトの中身からは、現在アクセスしているページのURLとして
  // routeのid、urlのpathnameが利用できる
    // 「$:」を変数につけると、動的に変更される変数の値の変更に影響されるように
	$: pathname = $page.url.pathname;
	// $: console.log(pathname);
</script>

<nav>
	<a href="/" class:active={pathname === '/'}>home</a>
	<!-- <a href="/about" class:active={pathname === '/about'}>about</a> -->
	<a href="/user" class:active={pathname === '/user'}>user</a>
  <!-- <a href="/todo" class:active={pathname === '/todo'}>todo</a> -->
</nav>

<!-- slotタグの部分に、layoutファイルを利用するページファイルの内容が挿入 -->
<slot />

<style>
	.active {
		color: red;
		font-weight: 900;
	}
</style>
